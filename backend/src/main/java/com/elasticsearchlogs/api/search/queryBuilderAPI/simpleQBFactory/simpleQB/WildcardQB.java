package com.elasticsearchlogs.api.search.queryBuilderAPI.simpleQBFactory.simpleQB;

import org.elasticsearch.index.query.QueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;

public class  WildcardQB implements SimpleQB {

    /**
     * Wrap a wildcard query in a QueryBuilder
     *
     * @param field      The field to look for the value
     * @param searchTerm The field value to look for
     * @return A queryBuilder to create the search request
     * @author cristian
     */
    public QueryBuilder getQueryBuilder(final String field, final String searchTerm) {

        if (field == null || searchTerm.isEmpty() || searchTerm.isBlank()) return null;

        return QueryBuilders
                .wildcardQuery(field, "*" + searchTerm + "*");
    }
}
