package com.elasticsearchlogs.elasticsearchlogsbackend.search.queryBuilderAPI.complexQBFactory.complexQB;

import org.elasticsearch.index.query.QueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;

import java.util.List;

public class RangeQB implements ComplexQB {
    @Override
    public QueryBuilder getQueryBuilder(String type, List<String> fields, List<String> searchTerms, boolean strictQuery) {


        return QueryBuilders
                .rangeQuery(fields.get(0))
                .gte(searchTerms.get(0))
                .lte(searchTerms.get(1));
    }


}

