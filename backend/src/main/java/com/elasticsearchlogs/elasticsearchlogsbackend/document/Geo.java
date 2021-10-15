package com.elasticsearchlogs.elasticsearchlogsbackend.document;

import java.util.LinkedHashMap;

public class Geo {

    private LinkedHashMap<String, Double> coordinates;
    private String dest;
    private String src;
    private String srcdest;

    public Geo() {

    }

    public LinkedHashMap<String, Double> getcoordinates() {
        return coordinates;
    }

    public void setcoordinates(LinkedHashMap<String, Double> coordinates) {
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
