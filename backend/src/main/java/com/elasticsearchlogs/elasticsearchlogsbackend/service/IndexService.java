package com.elasticsearchlogs.elasticsearchlogsbackend.service;

import com.elasticsearchlogs.elasticsearchlogsbackend.utils.Indices;
import com.elasticsearchlogs.elasticsearchlogsbackend.utils.Util;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.elasticsearch.client.indices.CreateIndexRequest;
import org.elasticsearch.client.indices.GetIndexRequest;
import org.elasticsearch.common.xcontent.XContentType;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;

@Service
public class IndexService {
    private static final Logger LOG = LoggerFactory.getLogger(Util.class);

    private final String INDEX = Indices.LOG_INDEX;
    private final RestHighLevelClient client;

    @Autowired
    public IndexService(RestHighLevelClient client) {
        this.client = client;
    }

    @PostConstruct
    public void tryToCreateIndex() {
        final String settings = Util.loadAsString("static/es-settings.json");
        try {
            boolean indexExist = client
                    .indices()
                    .exists(new GetIndexRequest(Indices.LOG_INDEX), RequestOptions.DEFAULT);
            if (!indexExist) {
                final String mapping = Util.loadAsString("static/mappings/" + Indices.LOG_INDEX + ".json");
                if (settings == null || mapping == null) {
                    LOG.error("Filed to create index with name '{}'", Indices.LOG_INDEX);
                } else {
                    final CreateIndexRequest createIndexRequest = new CreateIndexRequest(Indices.LOG_INDEX);
                    createIndexRequest.settings(settings, XContentType.JSON);
                    createIndexRequest.mapping(mapping, XContentType.JSON);

                    client.indices().create(createIndexRequest, RequestOptions.DEFAULT);
                }
            }

        } catch (Exception e) {
            LOG.error(e.getMessage(), e);
        }
    }
}
