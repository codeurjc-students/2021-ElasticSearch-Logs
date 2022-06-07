package com.elasticsearchlogs.api.search.queryBuilderAPI.simpleQBFactory;

import com.elasticsearchlogs.api.search.queryBuilderAPI.simpleQBFactory.simpleQB.MatchQB;
import com.elasticsearchlogs.api.search.queryBuilderAPI.simpleQBFactory.simpleQB.WildcardQB;
import org.elasticsearch.index.query.QueryBuilder;

import java.util.Objects;

public class SimpleQBFactory {

    private SimpleQBFactory() throws InstantiationException {
        throw new InstantiationException("This class is not supposed to be instantiated");
    }

    /**
     * It returns a simple query depending on the given type
     *
     * @param type       The type of the query
     * @param field      The field of the dto
     * @param searchTerm The search term of the dto
     * @return A QueryBuilder
     * @author cristian
     */
    public static QueryBuilder getAtomicQB(final String type, final String field, final String searchTerm) {

        return switch (type) {
            case "match" -> new MatchQB().getQueryBuilder(field, searchTerm);
            case "wildcard" -> new WildcardQB().getQueryBuilder(field, searchTerm);
            case default -> null;
        };
    }
}
