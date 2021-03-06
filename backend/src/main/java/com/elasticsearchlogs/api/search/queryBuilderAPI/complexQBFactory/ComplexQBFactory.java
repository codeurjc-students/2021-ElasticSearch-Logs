package com.elasticsearchlogs.api.search.queryBuilderAPI.complexQBFactory;

import com.elasticsearchlogs.api.search.queryBuilderAPI.complexQBFactory.complexQB.BoolMatchQB;
import com.elasticsearchlogs.api.search.queryBuilderAPI.complexQBFactory.complexQB.BoolWildcardQB;
import com.elasticsearchlogs.api.search.queryBuilderAPI.complexQBFactory.complexQB.RangeQB;
import org.elasticsearch.index.query.QueryBuilder;

import java.util.List;

public class ComplexQBFactory {

    private ComplexQBFactory() throws InstantiationException {
        throw new InstantiationException("This class is not supposed to be instantiated");
    }

    /**
     * It returns a query made of small queries depending on the given type
     *
     * @param type        The type of the query
     * @param fields      The fields of the dto
     * @param searchTerms The search terms of the dto
     * @param strictQuery Unused at the moment, but it aims to implement queries with OR or AND operators
     * @return A BoolQueryBuilder
     * @author cristian
     */
    public static QueryBuilder getCompoundQB(final String type, List<String> fields, List<String> searchTerms, boolean strictQuery) {
        return switch (type) {
            case "match" -> new BoolMatchQB()
                    .getQueryBuilder(type, fields, searchTerms, strictQuery);

            case "wildcard" -> new BoolWildcardQB()
                    .getQueryBuilder(type, fields, searchTerms, strictQuery);

            case "range" -> new RangeQB()
                    .getQueryBuilder(type, fields, searchTerms, strictQuery);

            case default -> null;
        };
    }
}
