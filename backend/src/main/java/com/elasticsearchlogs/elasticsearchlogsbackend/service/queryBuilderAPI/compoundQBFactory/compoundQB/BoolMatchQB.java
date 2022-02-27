package com.elasticsearchlogs.elasticsearchlogsbackend.service.queryBuilderAPI.compoundQBFactory.compoundQB;

import com.elasticsearchlogs.elasticsearchlogsbackend.service.queryBuilderAPI.atomicQBFactory.AtomicQBFactory;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;

import java.util.Iterator;
import java.util.List;

public class BoolMatchQB implements CompoundQB {

    public BoolQueryBuilder getBoolQB(final String type,
                                      final List<String> fields,
                                      final List<String> searchTerms,
                                      final boolean strictQuery) {
        final BoolQueryBuilder boolQuery = QueryBuilders.boolQuery();

        Iterator<String> fieldsIterator = fields.iterator();
        Iterator<String> searchTermsIterator = searchTerms.iterator();

        while (fieldsIterator.hasNext() && searchTermsIterator.hasNext()) {
            String field = fieldsIterator.next();
            String searchTerm = searchTermsIterator.next();

            QueryBuilder query = AtomicQBFactory.getAtomicQB(type, field, searchTerm);

            if (strictQuery) boolQuery.must(query);
            else boolQuery.should(query);

        }
        return boolQuery;
    }
}
