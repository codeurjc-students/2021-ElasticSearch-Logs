package com.elasticsearchlogs.elasticsearchlogsbackend.search.queryBuilderAPI;

import com.elasticsearchlogs.elasticsearchlogsbackend.search.queryBuilderAPI.atomicQBFactory.AtomicQBFactory;
import com.elasticsearchlogs.elasticsearchlogsbackend.search.queryBuilderAPI.compoundQBFactory.CompoundQBFactory;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilder;

import java.util.List;

public class QueryBuilderAPI {

    private QueryBuilderAPI() throws InstantiationException {
        throw new InstantiationException("This class is not supposed to be instantiated");
    }

    /**
     * It returns a simple query, at the moment it isn't make sense to use it in the app, but in the future it can be set public
     * to perform atomic queries
     *
     * @param type       The type of the query
     * @param field      The field to look at
     * @param searchTerm The search term to look for
     * @return A QueryBuilder to perform the search
     * @author cristian
     */
    private static QueryBuilder createAtomicQB(final String type, final String field, String searchTerm) {
        return AtomicQBFactory.getAtomicQB(type, field, searchTerm);
    }

    /**
     * It returns a query of homogeneous queries, usually a bool query
     *
     * @param type        The type of the sub-queries
     * @param fields      The fields of the dto
     * @param searchTerms The searchTerms of the dto
     * @param strictQuery Unused at the moment, but it aims to implement queries with OR or AND operators
     * @return A BoolQueryBuilder
     * @author cristian
     */
    public static BoolQueryBuilder createCompoundQB(final String type, final List<String> fields, final List<String> searchTerms, boolean strictQuery) {
        return CompoundQBFactory.getCompoundQB(type, fields, searchTerms, strictQuery);
    }

}
