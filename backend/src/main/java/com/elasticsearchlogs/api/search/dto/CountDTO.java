package com.elasticsearchlogs.api.search.dto;

public class CountDTO {

    private String hour;
    private long count;

    public CountDTO(String hour, long count) {
        this.hour = hour;
        this.count = count;
    }

    public String getHour() {
        return hour;
    }

    public void setHour(String hour) {
        this.hour = hour;
    }

    public long getCount() {
        return count;
    }

    public void setCount(long count) {
        this.count = count;
    }
}
