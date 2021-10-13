package com.elasticsearchlogs.elasticsearchlogsbackend.document;

import org.springframework.data.elasticsearch.core.geo.GeoPoint;

public class Geo {

    private GeoPoint coordinates;
    private String dest;
    private String src;
    private String srcdest;

    public Geo() {

    }

    public GeoPoint getCordinates() {
        return coordinates;
    }

    public void setCordinates(GeoPoint coordinates) {
        this.coordinates = coordinates;
    }

    public String getDest() {
        return dest;
    }

    public void setDest(String dest) {
        this.dest = dest;
    }

    public String getSrc() {
        return src;
    }

    public void setSrc(String src) {
        this.src = src;
    }

    public String getSrcdest() {
        return srcdest;
    }

    public void setSrcdest(String srcdest) {
        this.srcdest = srcdest;
    }
}
