package com.elasticsearchlogs.elasticsearchlogsbackend.search.util;

import com.elasticsearchlogs.elasticsearchlogsbackend.search.SearchRequestDTO;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.common.unit.TimeValue;
import org.elasticsearch.index.query.*;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.elasticsearch.search.sort.SortOrder;

import java.util.*;

public final class SearchUtil {

    private SearchUtil() {
    }

    /**
     * It creates de SearchRequest and set up the configuration
     *
     * @param indexName        The name of the index
     * @param searchRequestDTO The DTO to filter the data
     * @return A SearchRequest with the data
     * @author cristian
     */
    public static SearchRequest buildSearchRequest(
            final String indexName,
            final SearchRequestDTO searchRequestDTO,
            String type,
            boolean strictQuery) {
        try {

            final BoolQueryBuilder boolQuery = Objects.equals(type, "match")
                    ? getBoolQueryBuilder(searchRequestDTO.getFields(), searchRequestDTO.getSearchTerms(), type, strictQuery)
                    : getBoolQueryBuilder(searchRequestDTO.getFields(), searchRequestDTO.getSearchTerms().get(0), type, strictQuery);

            return applyOptions(indexName, searchRequestDTO, getSearchSourceBuilder(searchRequestDTO, boolQuery));

        } catch (final Exception e) {
            e.printStackTrace();
            return null;
        }
    }


    /**
     * Set sorting and other options
     *
     * @param indexName           The name of the index where to search
     * @param searchRequestDTO    The DTO to extract the options
     * @param searchSourceBuilder The SearchSourceBuilder to apply the options
     * @return The SearchRequest ready to being used
     * @author cristian
     */
    private static SearchRequest applyOptions(String indexName,
                                              SearchRequestDTO searchRequestDTO,
                                              SearchSourceBuilder searchSourceBuilder) {
        SearchSourceBuilder builder = searchSourceBuilder;

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
     * @param queryBuilder     The query that contains the sub-queries
     * @return A SearchSourceBuilder to perform the search
     * @author cristian
     */
    private static SearchSourceBuilder getSearchSourceBuilder(SearchRequestDTO searchRequestDTO,
                                                              QueryBuilder queryBuilder) {
        final int size = searchRequestDTO.getSize();

        return new SearchSourceBuilder()
                .size(size)
                .postFilter(queryBuilder);
    }

    /**
     * It creates a bool query builder
     *
     * @param fields      Fields to look at the searchTerms
     * @param searchTerms Search terms to look at the fields
     * @return A BoolQueryBuilder based on several match queries
     * @author cristian
     */
    private static BoolQueryBuilder getBoolQueryBuilder(final List<String> fields,
                                                        final List<String> searchTerms,
                                                        String type,
                                                        boolean strictQuery) {
        final BoolQueryBuilder boolQuery = QueryBuilders.boolQuery();

        Iterator<String> fieldsIterator = fields.iterator();
        Iterator<String> searchTermsIterator = searchTerms.iterator();

        while (fieldsIterator.hasNext() && searchTermsIterator.hasNext()) {
            String field = fieldsIterator.next();
            String searchTerm = searchTermsIterator.next();

            System.out.println("FIELDS =>" + field);
            System.out.println("TERMS =>" + searchTerm);

            QueryBuilder query = getMatchQueryBuilder(field, searchTerm, type);

            if (strictQuery) boolQuery.must(query);
            else boolQuery.should(query);

        }
        return boolQuery;
    }

    /**
     * It creates a bool query builder
     *
     * @param fields     Fields to look at the searchTerms
     * @param searchTerm Search term to look at the fields
     * @return A BoolQueryBuilder based on several match queries
     * @author cristian
     */
    private static BoolQueryBuilder getBoolQueryBuilder(final List<String> fields,
                                                        String searchTerm,
                                                        String type,
                                                        boolean strictQuery) {


        final BoolQueryBuilder boolQuery = QueryBuilders.boolQuery();

        if ( searchTerm == null || searchTerm.isEmpty() || searchTerm.isBlank()) return boolQuery;

        for (String field : fields) {
            System.out.println("FIELDS =>" + field);
            System.out.println("TERM =>" + searchTerm);

            QueryBuilder query = getMatchQueryBuilder(field, searchTerm, type);

            if (strictQuery) boolQuery.must(query);
            else boolQuery.should(query);

        }
        return boolQuery;
    }


    /**
     * It creates a match query builder
     *
     * @param field      Field to look at on the searchTerm
     * @param searchTerm The String to look at
     * @param type       The type of the query
     * @return A queryBuilder based on a match query
     * @author cristian
     */
    private static QueryBuilder getMatchQueryBuilder(final String field,
                                                     final String searchTerm,
                                                     String type) {
        if (field == null || searchTerm == null) return null;

        return switch (type) {
            case "match" -> QueryBuilders
                    .matchQuery(field, searchTerm)
                    .operator(Operator.AND);
            case "wildcard" -> QueryBuilders
                    .wildcardQuery(field, "*" + searchTerm + "*");
            case default -> null;
        };
    }

}


