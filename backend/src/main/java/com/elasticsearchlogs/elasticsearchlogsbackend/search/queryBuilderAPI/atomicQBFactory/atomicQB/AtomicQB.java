package com.elasticsearchlogs.elasticsearchlogsbackend.search.queryBuilderAPI.atomicQBFactory.atomicQB;

import org.elasticsearch.index.query.QueryBuilder;

public interface AtomicQB {

    /**
     * It returns a QueryBuilder
     *
     * @param field      The field of the dto
     * @param searchTerm The search term of the dto
     * @return A QueryBuilder
     * @author cristian
     */
    QueryBuilder getQueryBuilder(final String field, final String searchTerm);

}
