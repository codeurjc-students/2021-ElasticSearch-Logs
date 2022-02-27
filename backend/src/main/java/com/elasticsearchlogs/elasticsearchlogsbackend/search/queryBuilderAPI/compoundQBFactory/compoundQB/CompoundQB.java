package com.elasticsearchlogs.elasticsearchlogsbackend.search.queryBuilderAPI.compoundQBFactory.compoundQB;

import org.elasticsearch.index.query.BoolQueryBuilder;

import java.util.List;

public interface CompoundQB {

    /**
     * It returns a bool query based on the type
     *
     * @param type        The type of the sub queries
     * @param fields      The fields of the dto
     * @param searchTerms The search terms of the dto
     * @param strictQuery Unused at the moment, but it aims to implement queries with OR or AND operators
     * @return A BoolQueryBuilder
     * @author cristian
     */
    BoolQueryBuilder getBoolQB(String type, List<String> fields, List<String> searchTerms, boolean strictQuery);
}
