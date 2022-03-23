package com.elasticsearchlogs.elasticsearchlogsbackend.search;

import com.elasticsearchlogs.elasticsearchlogsbackend.search.document.Log;
import com.elasticsearchlogs.elasticsearchlogsbackend.search.document.OpenViduLog;
import com.elasticsearchlogs.elasticsearchlogsbackend.search.dto.CountDTO;
import com.elasticsearchlogs.elasticsearchlogsbackend.search.dto.SearchRequestDTO;
import com.elasticsearchlogs.elasticsearchlogsbackend.index.IndexService;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.elasticsearch.action.search.*;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.client.core.CountRequest;
import org.elasticsearch.client.core.CountResponse;
import org.elasticsearch.common.unit.TimeValue;
import org.elasticsearch.rest.RestStatus;
import org.elasticsearch.search.SearchHit;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class SearchService {
    private static final ObjectMapper MAPPER = new ObjectMapper();
    private static final Logger LOG = LoggerFactory.getLogger(OpenViduLog.class);

    private final RestHighLevelClient client;
    private final IndexService indicesService;

    @Autowired
    public SearchService(RestHighLevelClient client, IndexService indicesService) {
        this.client = client;
        this.indicesService = indicesService;

    }

    /**
     * It queries in the database based on the data provided in the DTO
     *
     * @param searchRequestDTO The DTO to filter the data
     * @param type             The search operation type
     * @return List with the logs
     * @author cristian
     */
    public List<Log> search(final SearchRequestDTO searchRequestDTO, String type) {
        SearchRequest request = this.getSearchRequest(searchRequestDTO, type);

        if (request == null) {
            LOG.error("Failed to build search request");
            return Collections.emptyList();
        }

        return execSearchRequest(searchRequestDTO.getPage(), request);
    }


    /**
     * Get the SearchRequest based on the type
     *
     * @param searchRequestDTO The DTO with the data to build the SearchRequest
     * @param type             The type of SearchRequest that is intended to perform
     * @return The SearchRequest or null if the type is not defined
     * @author cristian
     */
    private SearchRequest getSearchRequest(SearchRequestDTO searchRequestDTO, String type) {
        return switch (type) {
            case "match" -> SearchUtil.buildSearchRequest(
                    searchRequestDTO,
                    type,
                    true,
                    indicesService.getMostRecentIndicesValues());
            case "wildcard" -> SearchUtil.buildSearchRequest(
                    searchRequestDTO,
                    type,
                    false,
                    indicesService.getMostRecentIndicesValues());
            case "range" -> SearchUtil.buildSearchRequest(
                    searchRequestDTO,
                    type,
                    false,
                    indicesService.getIndicesFromTo(searchRequestDTO.getSearchTerms()));

            case default -> null;
        };
    }

    /**
     * It counts the logs in a date
     *
     * @param date The date of the day to count the logs
     * @return A list with key-value pairs with the hours and logs per hour
     * @author cristian
     */
    public List<CountDTO> count(String date) {

        List<CountDTO> countDTOList = new ArrayList<>();

        for (int i = 0; i < 24; i++) {
            String hour = String.format("%02d", i);
            String from = date + "T" + hour + ":00:00.000+00:00";
            String to = date + "T" + hour + ":59:59.999+00:00";

            CountRequest request = SearchUtil.buildCountRequest(
                    from,
                    to,
                    "@timestamp",
                    "range",
                    false,
                    indicesService.getIndex(date)
            );

            countDTOList.add(execCountRequest(request, hour + ":00"));
        }

        return countDTOList;
    }

    /**
     * Execute a given search request and get the logs of this search
     *
     * @param page    The reference number of the page that we want
     * @param request The request that is going to be executed
     * @return A list with the logs of the request
     * @author cristian
     */
    private List<Log> execSearchRequest(int page, SearchRequest request) {
        try {
            SearchResponse response = client.search(request, RequestOptions.DEFAULT);
            int currentPage = 1;

            //First fetch
            String scrollId = response.getScrollId();
            SearchHit[] searchHits = response.getHits().getHits();
            if (page == 0) return getLogs(searchHits);

            //Fetch until the page have been gotten
            while (searchHits != null && searchHits.length > 0) {
                SearchScrollRequest scrollRequest = new SearchScrollRequest(scrollId);
                scrollRequest.scroll(TimeValue.timeValueMinutes(1L));
                response = client.scroll(scrollRequest, RequestOptions.DEFAULT);

                scrollId = response.getScrollId();
                searchHits = response.getHits().getHits();
                if (searchHits.length > 0 && currentPage == page) {
                    return getLogs(searchHits);
                }
                currentPage++;
            }

            final boolean closed = clearScrollContext(scrollId);
            if (!closed) {
                LOG.warn("Scroll context is still up");
            }

            return getLogs(searchHits);

        } catch (Exception e) {
            LOG.error(e.getMessage(), e);
            return Collections.emptyList();
        }
    }

    /**
     * Map the hits to Log model
     *
     * @param searchHits Array with the hits founded
     * @return A list with the Logs
     * @throws JsonProcessingException If some values cannot be parsed
     * @author cristian
     */
    private List<Log> getLogs(SearchHit[] searchHits) throws JsonProcessingException {
        int hitsNumber = searchHits != null ? searchHits.length : 0;
        if (hitsNumber == 0) {
            LOG.error("Empty set of hits");
            return Collections.emptyList();
        }

        final List<Log> logs = new ArrayList<>(hitsNumber);

        for (SearchHit hit : searchHits) {
            logs.add(MAPPER.readValue(hit.getSourceAsString(), OpenViduLog.class));
        }
        
        return logs;
    }


    /**
     * Clear the context
     *
     * @param scrollId ID of the scroll context
     * @return Boolean with the status of the operation
     * @throws IOException In case of empty parameters
     * @author cristian
     */
    private boolean clearScrollContext(String scrollId) throws IOException {
        ClearScrollRequest clearScrollRequest = new ClearScrollRequest();
        clearScrollRequest.addScrollId(scrollId);
        ClearScrollResponse clearScrollResponse = client.clearScroll(clearScrollRequest, RequestOptions.DEFAULT);
        return clearScrollResponse.isSucceeded();
    }

    /**
     * It executes the given CountRequest
     *
     * @param request The Request to be executed
     * @param hour    The hour to look for logs count
     * @return The key-value pair with the hour and logs count
     *
     * @author cristian
     */
    private CountDTO execCountRequest(CountRequest request, String hour) {
        try {
            CountResponse countResponse = client.count(request, RequestOptions.DEFAULT);

            long count = countResponse.getCount();
            RestStatus status = countResponse.status();
            Boolean terminatedEarly = countResponse.isTerminatedEarly();

            if (status.equals(RestStatus.OK) && terminatedEarly == null) {
                return new CountDTO(hour, count);
            }
        } catch (IOException e) {
            LOG.error(e.getMessage(), e);
        }
        return new CountDTO(hour, 0);
    }
}
