package com.elasticsearchlogs.elasticsearchlogsbackend.search.queryBuilderAPI.simpleQBFactory.simpleQB;

import org.elasticsearch.index.query.QueryBuilder;

public interface SimpleQB {

    /**
     * It returns a QueryBuilder
     *
     * @param field      The field of the dto
     * @param searchTerms The search terms of the dto
     * @return A QueryBuilder
     * @author cristian
     */
    QueryBuilder getQueryBuilder(final String field, final String searchTerms);

}
