package com.elasticsearchlogs.elasticsearchlogsbackend.document;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.*;

import java.util.LinkedHashMap;

@Document(indexName = "kibana_sample_data_logs")
@Setting(settingPath = "static/es-settings.json")
public class Log {

    @Id
    @Field(type = FieldType.Keyword)
    private String id;

    @Field(type = FieldType.Text)
    private String agent;

    @Field(type = FieldType.Long)
    private String bytes;

    @Field(type = FieldType.Ip)
    private String clientip;

    @Field(type = FieldType.Keyword)
    private LinkedHashMap<String, String> event;

    @Field(type = FieldType.Text)
    private String extension;

    @GeoPointField
    private Geo geo;

    @Field(type = FieldType.Text)
    private String host;

    @Field(type = FieldType.Text)
    private String index;

    @Field(type = FieldType.Ip)
    private String ip;

    @Field(type = FieldType.Ip_Range)
    private String ip_range;

    @Field(type = FieldType.Text)
    private LinkedHashMap<String,String> machine;

    @Field(type = FieldType.Double)
    private String memory;

    @Field(type = FieldType.Text)
    private String message;

    @Field(type = FieldType.Long)
    private String phpmemory;

    @Field(type = FieldType.Keyword)
    private String referer;

    @Field(type = FieldType.Text)
    private String request;

    @Field(type = FieldType.Text)
    private String response;

    @Field(type = FieldType.Text)
    private String tags;

    @Field(type = FieldType.Date)
    private String timestamp;

    @Field(type = FieldType.Date_Range)
    private String timestamp_range;

    @Field(type = FieldType.Text)
    private String url;

    @Field(type = FieldType.Date)
    private String utc_time;

    public Log() {

    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getAgent() {
        return agent;
    }

    public void setAgent(String agent) {
        this.agent = agent;
    }

    public String getBytes() {
        return bytes;
    }

    public void setBytes(String bytes) {
        this.bytes = bytes;
    }

    public String getClientip() {
        return clientip;
    }

    public void setClientip(String clientip) {
        this.clientip = clientip;
    }

    public LinkedHashMap<String, String> getEvent() {
        return event;
    }

    public void setEvent(LinkedHashMap<String, String> event) {
        this.event = event;
    }

    public String getExtension() {
        return extension;
    }

    public void setExtension(String extension) {
        this.extension = extension;
    }

    public Geo getGeo() {
        return geo;
    }

    public void setGeo(Geo geo) {
        this.geo = geo;
    }

    public String getHost() {
        return host;
    }

    public void setHost(String host) {
        this.host = host;
    }

    public String getIndex() {
        return index;
    }

    public void setIndex(String index) {
        this.index = index;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public String getIp_range() {
        return ip_range;
    }

    public void setIp_range(String ip_range) {
        this.ip_range = ip_range;
    }

    public LinkedHashMap<String, String> getMachine() {
        return machine;
    }

    public void setMachine(LinkedHashMap<String, String> machine) {
        this.machine = machine;
    }

    public String getMemory() {
        return memory;
    }

    public void setMemory(String memory) {
        this.memory = memory;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getPhpmemory() {
        return phpmemory;
    }

    public void setPhpmemory(String phpmemory) {
        this.phpmemory = phpmemory;
    }

    public String getReferer() {
        return referer;
    }

    public void setReferer(String referer) {
        this.referer = referer;
    }

    public String getRequest() {
        return request;
    }

    public void setRequest(String request) {
        this.request = request;
    }

    public String getResponse() {
        return response;
    }

    public void setResponse(String response) {
        this.response = response;
    }

    public String getTags() {
        return tags;
    }

    public void setTags(String tags) {
        this.tags = tags;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public String getTimestamp_range() {
        return timestamp_range;
    }

    public void setTimestamp_range(String timestamp_range) {
        this.timestamp_range = timestamp_range;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getUtc_time() {
        return utc_time;
    }

    public void setUtc_time(String utc_time) {
        this.utc_time = utc_time;
    }
}
