package com.elasticsearchlogs.elasticsearchlogsbackend.search.queryBuilderAPI.complexQBFactory.complexQB;

import org.elasticsearch.index.query.BoolQueryBuilder;
import org.elasticsearch.index.query.QueryBuilder;
import org.elasticsearch.index.query.QueryBuilders;

import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;

public class RangeQB implements ComplexQB {
    @Override
    public QueryBuilder getQueryBuilder(String type, List<String> fields, List<String> searchTerms, boolean strictQuery) {


        return QueryBuilders
                .rangeQuery(fields.get(0))
                .gte(searchTerms.get(0))
                .lte(searchTerms.get(1));
    }


}

