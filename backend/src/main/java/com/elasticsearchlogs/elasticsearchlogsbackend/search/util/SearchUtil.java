package com.elasticsearchlogs.elasticsearchlogsbackend.search.util;

import com.elasticsearchlogs.elasticsearchlogsbackend.search.SearchRequestDTO;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.index.query.*;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.elasticsearch.search.sort.SortOrder;
import org.springframework.util.CollectionUtils;

import java.util.List;

public final class SearchUtil {

    private SearchUtil() {
    }

    public static SearchRequest buildSearchRequest(final String indexName, final SearchRequestDTO searchRequestDTO) {
        try {
            SearchSourceBuilder builder = new SearchSourceBuilder()
                    .postFilter(getQueryBuilder(searchRequestDTO));

            if ( searchRequestDTO.getSortBy() != null){
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
