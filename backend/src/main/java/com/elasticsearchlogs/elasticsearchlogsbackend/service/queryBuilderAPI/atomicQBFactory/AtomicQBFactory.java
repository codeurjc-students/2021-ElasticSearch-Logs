package com.elasticsearchlogs.elasticsearchlogsbackend.service.queryBuilderAPI.atomicQBFactory;

import com.elasticsearchlogs.elasticsearchlogsbackend.service.queryBuilderAPI.atomicQBFactory.atomicQB.MatchQB;
import org.elasticsearch.index.query.QueryBuilder;

import java.util.Objects;

public class AtomicQBFactory {

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
