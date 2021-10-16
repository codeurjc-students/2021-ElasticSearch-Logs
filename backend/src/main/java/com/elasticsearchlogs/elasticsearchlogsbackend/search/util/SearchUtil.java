package com.elasticsearchlogs.elasticsearchlogsbackend.search.util;

import com.elasticsearchlogs.elasticsearchlogsbackend.search.SearchRequestDTO;
import org.elasticsearch.action.search.SearchRequest;
import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.Operator;
import org.elasticsearch.index.query.QueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;
import org.elasticsearch.search.builder.SearchSourceBuilder;
import org.elasticsearch.search.sort.SortOrder;

import java.util.Iterator;

public final class SearchUtil {

    private SearchUtil() {
    }

    /**
     * It creates de SearchRequest and set up the configuration
     *
     * @param indexName        The name of the index
     * @param searchRequestDTO The DTO to filter the data
     * @return A SearchRequest with the data
     */
    public static SearchRequest buildSearchRequest(final String indexName, final SearchRequestDTO searchRequestDTO) {
        try {

            final BoolQueryBuilder boolQuery = getBoolQueryBuilder(searchRequestDTO);

            SearchSourceBuilder builder = getSearchSourceBuilder(searchRequestDTO, boolQuery);

            if (searchRequestDTO.getSortBy() != null) {
                builder = builder.sort(
                        searchRequestDTO.getSortBy(),
                        searchRequestDTO.getOrder() != null ? searchRequestDTO.getOrder() : SortOrder.ASC
                );
            }

            final SearchRequest request = new SearchRequest(indexName);
            request.source(builder);

            return request;

        } catch (final Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    /**
     * It builds the SearchSourceBuilder and add pagination options
     * @param searchRequestDTO The DTO to filter the data
     * @param boolQuery The query that contains the subqueries
     * @return A SearchSourceBuilder to perform the search
     */
    private static SearchSourceBuilder getSearchSourceBuilder(SearchRequestDTO searchRequestDTO, BoolQueryBuilder boolQuery) {
        final int page = searchRequestDTO.getPage();
        final int size = searchRequestDTO.getSize();
        final int from = page <= 0 ? 0 : page * size;

        SearchSourceBuilder builder = new SearchSourceBuilder()
                .from(from)
                .size(size)
                .postFilter(boolQuery);
        return builder;
    }

    private static BoolQueryBuilder getBoolQueryBuilder(SearchRequestDTO searchRequestDTO) {
        final BoolQueryBuilder boolQuery = QueryBuilders.boolQuery();

        Iterator<String> fieldsIterator = searchRequestDTO.getFields().iterator();
        Iterator<String> searchTermsIterator = searchRequestDTO.getSearchTerms().iterator();

        while (fieldsIterator.hasNext() && searchTermsIterator.hasNext()) {
            String field = fieldsIterator.next();
            String searchTerm = searchTermsIterator.next();

            System.out.println("FIELDS =>" + field);
            System.out.println("TERM =>" + searchTerm);

            QueryBuilder query = getQueryBuilder(field, searchTerm);

            boolQuery.must(query);
        }
        return boolQuery;
    }


    private static QueryBuilder getQueryBuilder(final String field, final String searchTerm) {
        if (field == null || searchTerm == null) {
            return null;
        }
        return QueryBuilders
                .matchQuery(field, searchTerm)
                .operator(Operator.AND);
    }
}
