package com.elasticsearchlogs.elasticsearchlogsbackend.service;

import com.elasticsearchlogs.elasticsearchlogsbackend.document.Log;
import com.elasticsearchlogs.elasticsearchlogsbackend.search.SearchRequestDTO;
import com.elasticsearchlogs.elasticsearchlogsbackend.search.util.SearchUtil;
import com.elasticsearchlogs.elasticsearchlogsbackend.utils.Indices;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.elasticsearch.action.get.GetRequest;
import org.elasticsearch.action.get.GetResponse;
import org.elasticsearch.action.index.IndexRequest;
import org.elasticsearch.action.index.IndexResponse;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.action.search.SearchResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.common.xcontent.XContentType;
import org.elasticsearch.rest.RestStatus;
import org.elasticsearch.search.SearchHit;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
     * @param searchRequestDTO The DTO to filter the data
     * @return
     */
    public List<Log> search(final SearchRequestDTO searchRequestDTO) {
        //
        final SearchRequest request = SearchUtil.buildSearchRequest(
                Indices.LOG_INDEX,
                searchRequestDTO
        );

        if (request == null) {
            LOG.error("Failed to build search request");
            return Collections.emptyList();
        }

        try {
            final SearchResponse response = client.search(request, RequestOptions.DEFAULT);
            final SearchHit[] searchHits = response.getHits().getHits();
            final List<Log> logs = new ArrayList<>(searchHits.length);


            for (SearchHit hit : searchHits) {
                logs.add(MAPPER.readValue(hit.getSourceAsString(), Log.class));
            }
            return logs;
        } catch (Exception e) {
            LOG.error(e.getMessage(), e);
            return Collections.emptyList();
        }
    }
}
