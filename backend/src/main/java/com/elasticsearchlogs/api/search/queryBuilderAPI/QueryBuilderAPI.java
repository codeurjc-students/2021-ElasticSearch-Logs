package com.elasticsearchlogs.api.search.queryBuilderAPI;

import com.elasticsearchlogs.api.search.queryBuilderAPI.complexQBFactory.ComplexQBFactory;
import com.elasticsearchlogs.api.search.queryBuilderAPI.simpleQBFactory.SimpleQBFactory;
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
    private static QueryBuilder createSimpleQB(final String type, final String field, String searchTerm) {
        return SimpleQBFactory.getAtomicQB(type, field, searchTerm);
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
    public static QueryBuilder createComplexQB(
            final String type,
            final List<String> fields,
            final List<String> searchTerms,
            boolean strictQuery) {
        return ComplexQBFactory.getCompoundQB(type, fields, searchTerms, strictQuery);
    }

}
