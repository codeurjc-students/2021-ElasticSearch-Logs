package com.elasticsearchlogs.elasticsearchlogsbackend.service.queryBuilderAPI;

import com.elasticsearchlogs.elasticsearchlogsbackend.service.queryBuilderAPI.atomicQBFactory.AtomicQBFactory;
import com.elasticsearchlogs.elasticsearchlogsbackend.service.queryBuilderAPI.compoundQBFactory.CompoundQBFactory;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilder;

import java.util.List;

public class queryBuilderAPI {

    public static QueryBuilder createAtomicQB(final String type, final String field, String searchTerm) {
        return AtomicQBFactory.getAtomicQB(type, field, searchTerm);
    }

    public static BoolQueryBuilder createCompoundQB(final String type, final List<String> fields, final List<String> searchTerms, boolean strictQuery) {
        return CompoundQBFactory.getCompoundQB(type, fields, searchTerms,strictQuery);
    }
    
}
