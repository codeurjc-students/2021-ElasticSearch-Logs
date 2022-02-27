package com.elasticsearchlogs.elasticsearchlogsbackend.search.util;

import com.elasticsearchlogs.elasticsearchlogsbackend.dao.SearchRequestDTO;
import com.elasticsearchlogs.elasticsearchlogsbackend.service.queryBuilderAPI.queryBuilderAPI;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.common.unit.TimeValue;
import org.elasticsearch.index.query.*;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.elasticsearch.search.sort.SortOrder;

public final class SearchUtil {

    private SearchUtil() {
    }

    /**
     * It creates de SearchRequest and set up the configuration
     *
     * @param indexName        The name of the index
     * @param searchRequestDTO The DTO to filter the data
     * @return A SearchRequest with the data
     * @author cristian
     */
    public static SearchRequest buildSearchRequest(
            final String indexName,
            final SearchRequestDTO searchRequestDTO,
            String type,
            boolean strictQuery) {
        try {

            final BoolQueryBuilder boolQuery = queryBuilderAPI
                    .createCompoundQB(type, searchRequestDTO.getFields(), searchRequestDTO.getSearchTerms(), strictQuery);

            return applyOptions(indexName, searchRequestDTO, getSearchSourceBuilder(searchRequestDTO, boolQuery));

        } catch (final Exception e) {
            e.printStackTrace();
            return null;
        }
    }


    /**
     * Set sorting and other options
     *
     * @param indexName           The name of the index where to search
     * @param searchRequestDTO    The DTO to extract the options
     * @param searchSourceBuilder The SearchSourceBuilder to apply the options
     * @return The SearchRequest ready to being used
     * @author cristian
     */
    private static SearchRequest applyOptions(String indexName,
                                              SearchRequestDTO searchRequestDTO,
                                              SearchSourceBuilder searchSourceBuilder) {
        SearchSourceBuilder builder = searchSourceBuilder;

        if (searchRequestDTO.getSortBy() != null) {
            builder = builder.sort(
                    searchRequestDTO.getSortBy(),
                    searchRequestDTO.getOrder() != null ? searchRequestDTO.getOrder() : SortOrder.ASC
            );
        }

        final SearchRequest request = new SearchRequest(indexName);
        request.source(builder);
        request.scroll(TimeValue.timeValueMinutes(1L));

        return request;
    }

    /**
     * It builds the SearchSourceBuilder and add pagination options
     *
     * @param searchRequestDTO The DTO to filter the data
     * @param queryBuilder     The query that contains the sub-queries
     * @return A SearchSourceBuilder to perform the search
     * @author cristian
     */
    private static SearchSourceBuilder getSearchSourceBuilder(SearchRequestDTO searchRequestDTO,
                                                              QueryBuilder queryBuilder) {
        final int size = searchRequestDTO.getSize();

        return new SearchSourceBuilder()
                .size(size)
                .postFilter(queryBuilder);
    }
}