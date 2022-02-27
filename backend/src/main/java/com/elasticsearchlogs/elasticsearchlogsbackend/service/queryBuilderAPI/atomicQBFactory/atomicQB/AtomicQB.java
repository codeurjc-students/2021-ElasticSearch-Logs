package com.elasticsearchlogs.elasticsearchlogsbackend.service.queryBuilderAPI.atomicQBFactory.atomicQB;

import org.elasticsearch.index.query.QueryBuilder;

public interface AtomicQB {

    QueryBuilder getQueryBuilder(final String field, final String searchTerm);

}
