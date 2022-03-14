package com.elasticsearchlogs.elasticsearchlogsbackend.search;

import com.elasticsearchlogs.elasticsearchlogsbackend.search.dto.SearchRequestDTO;
import com.elasticsearchlogs.elasticsearchlogsbackend.search.queryBuilderAPI.QueryBuilderAPI;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.client.core.CountRequest;
import org.elasticsearch.common.collect.List;
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
            final String type,
            final boolean strictQuery,
            final String... indices) {
        try {

            final QueryBuilder boolQuery = QueryBuilderAPI
                    .createComplexQB(type, searchRequestDTO.getFields(), searchRequestDTO.getSearchTerms(), strictQuery);

            return applySearchOptions(searchRequestDTO, getSearchSourceBuilder(searchRequestDTO.getSize(), boolQuery), indices);

        } catch (final Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * It creates a count request and set up the configuration
     *
     * @param from        Date to look from
     * @param to          Date to look form
     * @param field       Field to look for
     * @param type        The type of the query
     * @param strictQuery Indicates the query operator
     * @param index       The index to look for
     * @return The CountRequest to be executed
     * @author cristian
     */
    public static CountRequest buildCountRequest(
            final String from,
            final String to,
            final String field,
            final String type,
            final boolean strictQuery,
            final String index) {

        final QueryBuilder rangeQuery = QueryBuilderAPI
                .createComplexQB(type, List.of(field), List.of(from, to), strictQuery);

        return applyCountOptions(getSearchSourceBuilder(0, rangeQuery), rangeQuery, index);
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
    private static SearchRequest applySearchOptions(
            SearchRequestDTO searchRequestDTO,
            SearchSourceBuilder searchSourceBuilder,
            String... indices) {


        if (searchRequestDTO.getSortBy() != null) {
            searchSourceBuilder = searchSourceBuilder.sort(
                    searchRequestDTO.getSortBy(),
                    searchRequestDTO.getOrder() != null ? searchRequestDTO.getOrder() : SortOrder.ASC
            );
        }

        final SearchRequest request = new SearchRequest(indices);
        request.source(searchSourceBuilder);
        request.scroll(TimeValue.timeValueMinutes(1L));

        return request;
    }

    /**
     * It applies the source to the query
     *
     * @param searchSourceBuilder The builder to apply the query
     * @param query               The query to be applied to the builder
     * @param index               The index to look for
     * @return The CountRequest to be executed
     * @author cristian
     */
    private static CountRequest applyCountOptions(SearchSourceBuilder searchSourceBuilder,
                                                  QueryBuilder query,
                                                  String index) {

        final CountRequest request = new CountRequest(index);
        searchSourceBuilder.query(query);
        request.source(searchSourceBuilder);

        return request;
    }

    /**
     * It builds the SearchSourceBuilder and add pagination options
     *
     * @param size         The size to apply to the query result
     * @param queryBuilder The query that contains the sub-queries
     * @return A SearchSourceBuilder to perform the search
     * @author cristian
     */
    private static SearchSourceBuilder getSearchSourceBuilder(int size,
                                                              QueryBuilder queryBuilder) {

        return new SearchSourceBuilder()
                .size(size)
                .postFilter(queryBuilder);
    }
}