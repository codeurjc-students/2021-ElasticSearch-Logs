package com.elasticsearchlogs.elasticsearchlogsbackend.search.queryBuilderAPI.complexQBFactory.complexQB;

import org.elasticsearch.index.query.QueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;

import java.util.List;

public class RangeQB implements ComplexQB {
    /**
     * It returns a QueryBuilder that wraps a RangeQuery
     *
     * @param type        The type of the sub queries
     * @param fields      The fields of the dto
     * @param searchTerms The search terms of the dto
     * @param strictQuery Unused at the moment, but it aims to implement queries with OR or AND operators
     * @return A QueryBuilder that wraps a RangeQuery
     * @author cristian
     */
    public QueryBuilder getQueryBuilder(String type, List<String> fields, List<String> searchTerms, boolean strictQuery) {


        return QueryBuilders
                .rangeQuery(fields.get(0))
                .gte(searchTerms.get(0))
                .lte(searchTerms.get(1));
    }


}

