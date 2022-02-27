package com.elasticsearchlogs.elasticsearchlogsbackend.search.queryBuilderAPI.compoundQBFactory;

import com.elasticsearchlogs.elasticsearchlogsbackend.search.queryBuilderAPI.compoundQBFactory.compoundQB.BoolMatchQB;
import com.elasticsearchlogs.elasticsearchlogsbackend.search.queryBuilderAPI.compoundQBFactory.compoundQB.BoolWildcardQB;
import org.elasticsearch.index.query.BoolQueryBuilder;

import java.util.List;
import java.util.Objects;

public class CompoundQBFactory {

    private CompoundQBFactory() throws InstantiationException {
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
    public static BoolQueryBuilder getCompoundQB(final String type, List<String> fields, List<String> searchTerms, boolean strictQuery) {
        if (Objects.equals(type, "match"))
            return new BoolMatchQB().getBoolQB(type, fields, searchTerms, strictQuery);


        if (Objects.equals(type, "wildcard"))
            return new BoolWildcardQB().getBoolQB(type, fields, searchTerms, strictQuery);

        return null;
    }
}
