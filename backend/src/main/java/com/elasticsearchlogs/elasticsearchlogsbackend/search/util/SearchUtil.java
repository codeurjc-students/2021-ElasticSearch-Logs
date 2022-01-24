package com.elasticsearchlogs.elasticsearchlogsbackend.search.util;

import com.elasticsearchlogs.elasticsearchlogsbackend.document.Log;
import com.elasticsearchlogs.elasticsearchlogsbackend.search.SearchRequestDTO;
import org.apache.lucene.search.TermQuery;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.common.unit.TimeValue;
import org.elasticsearch.index.query.*;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.elasticsearch.search.sort.SortOrder;

import java.lang.reflect.Array;
import java.lang.reflect.Field;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;

public final class SearchUtil {

    private SearchUtil() {
    }

    /**
     * It creates a SearchRequest based on match queries
     *
     * @param indexName        The name of the index
     * @param searchRequestDTO The DTO to filter the data
     * @return A SearchRequest with the data
     * @author cristian
     */
    public static SearchRequest buildBoolSearchRequestBasedOnMatch(final String indexName, final SearchRequestDTO searchRequestDTO) {
        try {

            final BoolQueryBuilder boolQuery = getBoolQueryBuilderBasedOnMatch(searchRequestDTO);

            return setupSearchRequestConfig(indexName, searchRequestDTO, boolQuery);

        } catch (final Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * It creates a SearchRequest based on term queries
     *
     * @param indexName        The name of the index
     * @param searchRequestDTO The DTO to filter the data
     * @return A SearchRequest with the data
     * @author cristian
     */
    public static SearchRequest buildBoolSearchRequestBasedOnTerm(final String indexName, final SearchRequestDTO searchRequestDTO) {
        try {

            final BoolQueryBuilder boolQuery = getTermQueryBuilderBasedOnTerms(searchRequestDTO);

            return setupSearchRequestConfig(indexName, searchRequestDTO, boolQuery);

        } catch (final Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * It set up basic config to the SearchRequest like sorting options and scroll properties
     *
     * @param indexName        The name of the index
     * @param searchRequestDTO The DTO to filter the data
     * @param boolQuery        The bool query to get the SearchSourceBuilder
     * @return A SearchRequest fully configured
     * @author cristian
     */
    private static SearchRequest setupSearchRequestConfig(String indexName, SearchRequestDTO searchRequestDTO, BoolQueryBuilder boolQuery) {
        SearchSourceBuilder builder = getSearchSourceBuilder(searchRequestDTO, boolQuery);

        if (searchRequestDTO.getSortBy() != null) {
            builder = builder.sort(
                    searchRequestDTO.getSortBy(),
                    searchRequestDTO.getOrder() != null ? searchRequestDTO.getOrder() : SortOrder.ASC
            );
        }

        final SearchRequest request = new SearchRequest(indexName);
        request.source(builder);
        request.scroll(TimeValue.timeValueMinutes(1L));

        return request;
    }

    /**
     * It builds the SearchSourceBuilder and add pagination options
     *
     * @param searchRequestDTO The DTO to filter the data
     * @param boolQuery        The query that contains the sub-queries
     * @return A SearchSourceBuilder to perform the search
     * @author cristian
     */
    private static SearchSourceBuilder getSearchSourceBuilder(SearchRequestDTO searchRequestDTO, BoolQueryBuilder boolQuery) {
        final int size = searchRequestDTO.getSize();

        return new SearchSourceBuilder()
                .size(size)
                .postFilter(boolQuery);
    }

    /**
     * It creates a bool query based on match queries
     *
     * @param searchRequestDTO The DTO to filter the data
     * @return A BoolQueryBuilder with based on term queries
     * @author cristian
     */
    private static BoolQueryBuilder getBoolQueryBuilderBasedOnMatch(SearchRequestDTO searchRequestDTO) {
        final BoolQueryBuilder boolQuery = QueryBuilders.boolQuery();

        Iterator<String> fieldsIterator = searchRequestDTO.getFields().iterator();
        Iterator<String> searchTermsIterator = searchRequestDTO.getSearchTerms().iterator();

        while (fieldsIterator.hasNext() && searchTermsIterator.hasNext()) {
            String field = fieldsIterator.next();
            String searchTerm = searchTermsIterator.next();

            System.out.println("FIELDS =>" + field);
            System.out.println("TERM =>" + searchTerm);

            QueryBuilder query = getQueryBuilder(field, searchTerm, "match");

            boolQuery.must(query);
        }
        return boolQuery;
    }

    /**
     * It creates a bool query based on term queries
     *
     * @param searchRequestDTO The DTO to filter the data
     * @return A BoolQueryBuilder with based on term queries
     * @author cristian
     */
    private static BoolQueryBuilder getTermQueryBuilderBasedOnTerms(SearchRequestDTO searchRequestDTO) {
        final BoolQueryBuilder boolQuery = QueryBuilders.boolQuery();

        final String searchTerm = searchRequestDTO.getSearchTerms().get(0);

        // All fields need to be added
        List<String> fields = Arrays.asList("message", "host", "request", "response");

        System.out.println("SearchTerm => " + searchTerm);
        for (String field : fields) {
            System.out.println("Field => " + field);
            QueryBuilder query = getQueryBuilder(field, searchTerm, "term");

            System.out.println(query.toString());

            boolQuery.should(query);
        }

        System.out.println(boolQuery.toString());
        return boolQuery;

    }


    /**
     * It creates a basic QueryBuilder
     *
     * @param field      The field to query for
     * @param searchTerm The term to query for
     * @param type  The type of the query
     * @return A QueryBuilder to perform queries
     * @author cristian
     */
    private static QueryBuilder getQueryBuilder(final String field, final String searchTerm, final String type) {

        if (field == null || searchTerm == null) return null;

        return switch (type) {
            case "match" -> QueryBuilders
                    .matchQuery(field, searchTerm)
                    .operator(Operator.AND);
            case "term" -> QueryBuilders
                    .termQuery(field, searchTerm);
            default -> null;
        };

    }
}
