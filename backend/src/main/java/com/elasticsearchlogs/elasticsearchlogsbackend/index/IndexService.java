package com.elasticsearchlogs.elasticsearchlogsbackend.index;

import com.elasticsearchlogs.elasticsearchlogsbackend.search.document.OpenViduLog;
import org.elasticsearch.action.admin.indices.get.GetIndexRequest;
import org.elasticsearch.action.admin.indices.get.GetIndexResponse;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestHighLevelClient;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public final class IndexService {
    private static final Logger LOG = LoggerFactory.getLogger(OpenViduLog.class);

    private final TreeMap<String, String> indices;

    private final RestHighLevelClient client;

    @Autowired
    public IndexService(RestHighLevelClient client) {
        this.client = client;
        this.indices = getAvailableIndices();
    }

    public String[] getMostRecentIndicesValues() {
        return indices.values().toArray(new String[0]);
    }

    public String[] getMostRecentIndicesKeys() {
        return indices.keySet().toArray(new String[0]);
    }

    public String getIndex(String key){
        return indices.get(key);
    }

    public String[] getIndicesFromTo(List<String> dates) {

        return indices
                .subMap(dates.get(0).substring(0, 10), true,
                        dates.get(1).substring(0, 10), true)
                .values()
                .toArray(new String[0]);

    }

    private TreeMap<String, String> getAvailableIndices() {
        try {
            GetIndexRequest request = new GetIndexRequest().indices("openvidu-logs-20*.*.*");
            GetIndexResponse response = client.indices().get(request, RequestOptions.DEFAULT);
            List<String> availableIndices = Arrays.asList(response.getIndices());
            LOG.info("Available indices =>" + availableIndices);
            return buildMapDatesToIndex(availableIndices);
        } catch (Exception e) {
            LOG.error(e.getMessage(), e);
            return new TreeMap<>();
        }
    }

    private TreeMap<String, String> buildMapDatesToIndex(List<String> indices) {
        int dateStart = indices.get(0).length() - 10;
        TreeMap<String, String> datesToIndex = new TreeMap<>();

        for (String index : indices) {
            String date = index.substring(dateStart);
            String formattedDate = date.replace(".", "-");
            datesToIndex.put(formattedDate, index);
        }
        return datesToIndex;
    }


}