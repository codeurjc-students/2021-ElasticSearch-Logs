package com.elasticsearchlogs.elasticsearchlogsbackend.document;

import org.springframework.data.elasticsearch.annotations.*;
import org.springframework.data.elasticsearch.core.geo.GeoPoint;


@Document(indexName = "kibana_sample_data_logs")
@Setting(settingPath = "static/es-settings.json")
public class Geo {

    @GeoPointField
    private GeoPoint coordinates;

    @Field(type = FieldType.Keyword)
    private String dest;

    @Field(type = FieldType.Keyword)
    private String src;

    @Field(type = FieldType.Keyword)
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
