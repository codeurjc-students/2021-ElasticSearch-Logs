package com.elasticsearchlogs.elasticsearchlogsbackend.search.queryBuilderAPI.atomicQBFactory;

import com.elasticsearchlogs.elasticsearchlogsbackend.search.queryBuilderAPI.atomicQBFactory.atomicQB.MatchQB;
import org.elasticsearch.index.query.QueryBuilder;

import java.util.Objects;

public class AtomicQBFactory {

    private AtomicQBFactory() throws InstantiationException {
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
        if (Objects.equals(type, "match")) {
            return new MatchQB().getQueryBuilder(field, searchTerm);
        }

        if (Objects.equals(type, "wildcard")) {
            return new MatchQB().getQueryBuilder(field, searchTerm);
        }

        return null;
    }
}
