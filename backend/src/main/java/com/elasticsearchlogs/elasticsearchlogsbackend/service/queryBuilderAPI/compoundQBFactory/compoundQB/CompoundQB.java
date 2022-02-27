package com.elasticsearchlogs.elasticsearchlogsbackend.service.queryBuilderAPI.compoundQBFactory.compoundQB;

import org.elasticsearch.index.query.BoolQueryBuilder;

import java.util.List;

public interface CompoundQB {

    BoolQueryBuilder getBoolQB(String type,List<String> fields, List<String> searchTerms, boolean strictQuery);
}
