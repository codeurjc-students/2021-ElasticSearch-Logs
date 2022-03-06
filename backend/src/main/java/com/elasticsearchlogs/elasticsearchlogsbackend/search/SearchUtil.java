package com.elasticsearchlogs.elasticsearchlogsbackend.search;

import com.elasticsearchlogs.elasticsearchlogsbackend.search.dto.SearchRequestDTO;
import com.elasticsearchlogs.elasticsearchlogsbackend.search.queryBuilderAPI.QueryBuilderAPI;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.common.unit.TimeValue;
import org.elasticsearch.index.query.*;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.elasticsearch.search.sort.SortOrder;

public final class SearchUtil {

    private SearchUtil() throws InstantiationException {
        throw new InstantiationException("This class is not supposed to be instantiated");
    }

    /**
     * It creates de SearchRequest and set up the configuration
     *
     * @param indices          The name of the indices
     * @param searchRequestDTO The DTO to filter the data
     * @return A SearchRequest with the data
     * @author cristian
     */
    public static SearchRequest buildSearchRequest(
            final SearchRequestDTO searchRequestDTO,
            String type,
            boolean strictQuery,
            final String... indices) {
        try {

            final QueryBuilder boolQuery = QueryBuilderAPI
                    .createComplexQB(type, searchRequestDTO.getFields(), searchRequestDTO.getSearchTerms(), strictQuery);

            return applyOptions(searchRequestDTO, getSearchSourceBuilder(searchRequestDTO, boolQuery), indices);

        } catch (final Exception e) {
            e.printStackTrace();
            return null;
        }
    }


    /**
     * Set sorting and other options
     *
     * @param indices             The name of the indices where to search
     * @param searchRequestDTO    The DTO to extract the options
     * @param searchSourceBuilder The SearchSourceBuilder to apply the options
     * @return The SearchRequest ready to being used
     * @author cristian
     */
    private static SearchRequest applyOptions(
            SearchRequestDTO searchRequestDTO,
            SearchSourceBuilder searchSourceBuilder,
            String... indices) {
        SearchSourceBuilder builder = searchSourceBuilder;

        if (searchRequestDTO.getSortBy() != null) {
            builder = builder.sort(
                    searchRequestDTO.getSortBy(),
                    searchRequestDTO.getOrder() != null ? searchRequestDTO.getOrder() : SortOrder.ASC
            );
        }

        final SearchRequest request = new SearchRequest(indices);
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