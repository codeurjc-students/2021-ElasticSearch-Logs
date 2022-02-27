package com.elasticsearchlogs.elasticsearchlogsbackend.service.queryBuilderAPI.compoundQBFactory;

import com.elasticsearchlogs.elasticsearchlogsbackend.service.queryBuilderAPI.compoundQBFactory.compoundQB.BoolMatchQB;
import com.elasticsearchlogs.elasticsearchlogsbackend.service.queryBuilderAPI.compoundQBFactory.compoundQB.BoolWildcardQB;
import org.elasticsearch.index.query.BoolQueryBuilder;

import java.util.List;
import java.util.Objects;

public class CompoundQBFactory {

    public static BoolQueryBuilder getCompoundQB(final String type, List<String> fields, List<String> searchTerms, boolean strictQuery) {
        if (Objects.equals(type, "match"))
            return new BoolMatchQB().getBoolQB(type, fields, searchTerms, strictQuery);


        if (Objects.equals(type, "wildcard"))
            return new BoolWildcardQB().getBoolQB(type, fields, searchTerms, strictQuery);

        return null;
    }
}
