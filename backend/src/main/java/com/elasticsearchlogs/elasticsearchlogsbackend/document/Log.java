package com.elasticsearchlogs.elasticsearchlogsbackend.document;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.LinkedHashMap;
import java.util.List;

public class Log {


    private String id;
    private String agent;
    private String bytes;
    private String clientip;
    private LinkedHashMap<String, String> event;
    private String extension;
    private Geo geo;
    private String host;
    private String index;
    private String ip;
    private String ip_range;
    private LinkedHashMap<String,String> machine;
    private String memory;
    private String message;
    private String phpmemory;
    private String referer;
    private String request;
    private String response;

    private List<String> tags;

    private Timestamp timestamp;
    private String timestamp_range;
    private String url;

    private Timestamp utc_time;

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

    public List<String> getTags() {
        return tags;
    }

    public void setTags(List<String> tags) {
        this.tags = tags;
    }

    public Timestamp getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Timestamp timestamp) {
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

    public Timestamp getUtc_time() {
        return utc_time;
    }

    public void setUtc_time(Timestamp utc_time) {
        this.utc_time = utc_time;
    }

}
