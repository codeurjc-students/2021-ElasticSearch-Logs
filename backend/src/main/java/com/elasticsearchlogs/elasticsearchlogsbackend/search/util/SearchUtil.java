package com.elasticsearchlogs.elasticsearchlogsbackend.search.util;

import com.elasticsearchlogs.elasticsearchlogsbackend.search.SearchRequestDTO;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.index.query.MultiMatchQueryBuilder;
import org.elasticsearch.index.query.Operator;
import org.elasticsearch.index.query.QueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.elasticsearch.search.sort.SortOrder;
import org.springframework.util.CollectionUtils;

import java.util.List;

public final class SearchUtil {

    private SearchUtil() {
    }

    /**
     * It queries in the database based on the data provided in the DTO
     *
     * @param indexName        The name of the index
     * @param searchRequestDTO The DTO to filter the data
     * @return A SearchRequest with the data
     */
    public static SearchRequest buildSearchRequest(final String indexName, final SearchRequestDTO searchRequestDTO) {
        try {
            final int page = searchRequestDTO.getPage();
            final int size = searchRequestDTO.getSize();
            final int from = page <= 0 ? 0 : page * size;

            SearchSourceBuilder builder = new SearchSourceBuilder()
                    .from(from)
                    .size(size)
                    .postFilter(getQueryBuilder(searchRequestDTO));

            if (searchRequestDTO.getSortBy() != null) {
                builder = builder.sort(
                        searchRequestDTO.getSortBy(),
                        searchRequestDTO.getOrder() != null ? searchRequestDTO.getOrder() : SortOrder.ASC
                );
            }

            final SearchRequest request = new SearchRequest(indexName);
            request.source(builder);

            return request;
        } catch (final Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * Get an specific instance of QueryBuilder depending on the parameters
     *
     * @param searchRequestDTO The DTO to filter the data
     * @return An specific QueryBuilder
     */
    public static QueryBuilder getQueryBuilder(final SearchRequestDTO searchRequestDTO) {
        if (searchRequestDTO == null) {
            return null;
        }

        final List<String> fields = searchRequestDTO.getFields();
        if (CollectionUtils.isEmpty(fields)) {
            return null;
        }

        if (fields.size() > 1) {
            final MultiMatchQueryBuilder queryBuilder = QueryBuilders.multiMatchQuery(searchRequestDTO.getSearchTerm())
                    .type(MultiMatchQueryBuilder.Type.CROSS_FIELDS)
                    .operator(Operator.AND);

            fields.forEach(queryBuilder::field);

            return queryBuilder;
        }

        return fields.stream()
                .findFirst()
                .map(field ->
                        QueryBuilders.matchQuery(field, searchRequestDTO.getSearchTerm())
                                .operator(Operator.AND))
                .orElse(null);
    }
}
