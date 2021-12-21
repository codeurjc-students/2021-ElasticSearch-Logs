package com.elasticsearchlogs.elasticsearchlogsbackend.service;

import com.elasticsearchlogs.elasticsearchlogsbackend.document.Log;
import com.elasticsearchlogs.elasticsearchlogsbackend.search.SearchRequestDTO;
import com.elasticsearchlogs.elasticsearchlogsbackend.search.util.SearchUtil;
import com.elasticsearchlogs.elasticsearchlogsbackend.utils.Indices;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.elasticsearch.action.get.GetRequest;
import org.elasticsearch.action.get.GetResponse;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.action.search.*;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.common.unit.TimeValue;
import org.elasticsearch.common.xcontent.XContentType;
import org.elasticsearch.rest.RestStatus;
import org.elasticsearch.search.Scroll;
import org.elasticsearch.search.SearchHit;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service
public class LogService {
    private static final ObjectMapper MAPPER = new ObjectMapper();
    private static final Logger LOG = LoggerFactory.getLogger(Log.class);

    private final RestHighLevelClient client;

    @Autowired
    public LogService(RestHighLevelClient client) {
        this.client = client;
    }

    /**
     * It queries in the database based on the data provided in the DTO
     *
     * @param searchRequestDTO The DTO to filter the data
     * @return List with the logs
     */
    public List<Log> search(final SearchRequestDTO searchRequestDTO) {
        final SearchRequest request = SearchUtil.buildSearchRequest(
                Indices.LOG_INDEX,
                searchRequestDTO
        );

        if (request == null) {
            LOG.error("Failed to build search request");
            return Collections.emptyList();
        }

        try {
            SearchResponse response = client.search(request, RequestOptions.DEFAULT);
            int page = searchRequestDTO.getPage();
            int currentPage = 1;

            //First fetch
            String scrollId = response.getScrollId();
            SearchHit[] searchHits = response.getHits().getHits();

            if(page == 0){
                return getLogs(searchHits);
            }

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

    private List<Log> getLogs(SearchHit[] searchHits) throws JsonProcessingException {
        int hitsNumber = searchHits != null ? searchHits.length : 0;
        if (hitsNumber == 0) {
            LOG.error("Empty set of hits");
            return Collections.emptyList();
        }

        final List<Log> logs = new ArrayList<>(hitsNumber);

        for (SearchHit hit : searchHits) {
            logs.add(MAPPER.readValue(hit.getSourceAsString(), Log.class));
        }
        return logs;
    }


    /**
     * Clear the context
     *
     * @param scrollId ID of the scroll context
     * @return Boolean with the status of the operation
     * @throws IOException In case of empty parameters
     */
    private boolean clearScrollContext(String scrollId) throws IOException {
        ClearScrollRequest clearScrollRequest = new ClearScrollRequest();
        clearScrollRequest.addScrollId(scrollId);
        ClearScrollResponse clearScrollResponse = client.clearScroll(clearScrollRequest, RequestOptions.DEFAULT);
        return clearScrollResponse.isSucceeded();
    }
}
