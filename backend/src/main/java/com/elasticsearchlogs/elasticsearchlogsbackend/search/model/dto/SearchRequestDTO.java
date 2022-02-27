package com.elasticsearchlogs.elasticsearchlogsbackend.search.model.dto;

import org.elasticsearch.search.sort.SortOrder;

import java.util.List;

public class SearchRequestDTO extends PageRequestDTO {
    private List<String> fields;
    private List<String> searchTerms;
    private String sortBy;
    private SortOrder order;

    public List<String> getFields() {
        return fields;
    }

    public void setFields(List<String> fields) {
        this.fields = fields;
    }

    public List<String> getSearchTerms() {
        return searchTerms;
    }

    public void setSearchTerms(List<String> searchTerms) {
        this.searchTerms = searchTerms;
    }

    public String getSortBy() {
        return sortBy;
    }

    public void setSortBy(String sortBy) {
        this.sortBy = sortBy;
    }

    public SortOrder getOrder() {
        return order;
    }

    public void setOrder(SortOrder order) {
        this.order = order;
    }

    @Override
    public String toString() {
        return "SearchRequestDTO{" +
                "fields=" + fields +
                ", searchTerms=" + searchTerms +
                ", sortBy='" + sortBy + '\'' +
                ", order=" + order +
                ", page=" + getPage() +
                ", size=" + getSize() +
                '}';
    }
}
