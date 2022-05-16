package com.elasticsearchlogs.api.search.queryBuilderAPI.complexQBFactory.complexQB;

import com.elasticsearchlogs.api.search.queryBuilderAPI.simpleQBFactory.SimpleQBFactory;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;

import java.util.List;

public class BoolWildcardQB implements ComplexQB {

    /**
     * It returns a BoolQueryBuilder based on wildcard queries
     *
     * @param type        The type of the sub queries
     * @param fields      The fields of the dto
     * @param searchTerms The search terms of the dto
     * @param strictQuery Unused at the moment, but it aims to implement queries with OR or AND operators
     * @return A BoolQueryBuilder made of wildcard queries
     * @author cristian
     */
    public BoolQueryBuilder getQueryBuilder(final String type,
                                      final List<String> fields,
                                      final List<String> searchTerms,
                                      final boolean strictQuery) {

        final BoolQueryBuilder boolQuery = QueryBuilders.boolQuery();

        final String searchTerm = searchTerms.get(0);

        if (searchTerm == null || searchTerm.isEmpty() || searchTerm.isBlank()) return boolQuery;

        for (String field : fields) {
            QueryBuilder query = SimpleQBFactory.getAtomicQB(type, field, searchTerm);

            if (strictQuery) boolQuery.must(query);
            else boolQuery.should(query);
        }

        return boolQuery;
    }

}
