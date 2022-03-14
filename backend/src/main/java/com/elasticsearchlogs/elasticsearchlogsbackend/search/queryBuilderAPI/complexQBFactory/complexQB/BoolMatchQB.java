package com.elasticsearchlogs.elasticsearchlogsbackend.search.queryBuilderAPI.complexQBFactory.complexQB;

import com.elasticsearchlogs.elasticsearchlogsbackend.search.queryBuilderAPI.simpleQBFactory.SimpleQBFactory;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;

import java.util.Iterator;
import java.util.List;

public class BoolMatchQB implements ComplexQB {

    /**
     * It returns a BoolQueryBuilder based on match queries
     *
     * @param type        The type of the sub queries
     * @param fields      The fields of the dto
     * @param searchTerms The search terms of the dto
     * @param strictQuery Unused at the moment, but it aims to implement queries with OR or AND operators
     * @return A BoolQueryBuilder made of match queries
     * @author cristian
     */
    public BoolQueryBuilder getQueryBuilder(final String type,
                                            final List<String> fields,
                                            final List<String> searchTerms,
                                            final boolean strictQuery) {
        final BoolQueryBuilder boolQuery = QueryBuilders.boolQuery();

        Iterator<String> fieldsIterator = fields.iterator();
        Iterator<String> searchTermsIterator = searchTerms.iterator();

        while (fieldsIterator.hasNext() && searchTermsIterator.hasNext()) {
            String field = fieldsIterator.next();
            String searchTerm = searchTermsIterator.next();

            QueryBuilder query = SimpleQBFactory.getAtomicQB(type, field, searchTerm);

            if (strictQuery) boolQuery.must(query);
            else boolQuery.should(query);

        }
        return boolQuery;
    }
}
