package com.elasticsearchlogs.api.search.queryBuilderAPI.complexQBFactory.complexQB;

import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilder;

import java.util.List;

public interface ComplexQB {

    /**
     * It returns a complex query based on the type
     *
     * @param type        The type of the sub queries
     * @param fields      The fields of the dto
     * @param searchTerms The search terms of the dto
     * @param strictQuery Unused at the moment, but it aims to implement queries with OR or AND operators
     * @return A BoolQueryBuilder
     * @author cristian
     */
    QueryBuilder getQueryBuilder(String type, List<String> fields, List<String> searchTerms, boolean strictQuery);
}
