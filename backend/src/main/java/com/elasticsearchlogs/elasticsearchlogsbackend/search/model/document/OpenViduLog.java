package com.elasticsearchlogs.elasticsearchlogsbackend.search.model.document;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.sql.Timestamp;


public class OpenViduLog implements Log {

    private Timestamp timestamp;
    private String cluster_id;
    private String message;
    private String host;
    private String log_level;
    private String logger;
    private String node_id;
    private String node_role;
    private String stacktrace;
    private String thread;

    public OpenViduLog() {
    }

    @JsonProperty("timestamp")
    public Timestamp getTimestamp() {
        return timestamp;
    }

    @JsonProperty("@timestamp")
    public void setTimestamp(Timestamp timestamp) {
        this.timestamp = timestamp;
    }

    @JsonProperty("cluster_id")
    public String getCluster_id() {
        return cluster_id;
    }

    @JsonProperty("cluster_id")
    public void setCluster_id(String cluster_id) {
        this.cluster_id = cluster_id;
    }

    @JsonProperty("message")
    public String getMessage() {
        return message;
    }

    @JsonProperty("message")
    public void setMessage(String message) {
        this.message = message;
    }

    @JsonProperty("host")
    public String getHost() {
        return host;
    }

    @JsonProperty("host")
    public void setHost(String host) {
        this.host = host;
    }

    @JsonProperty("log_level")
    public String getLog_level() {
        return log_level;
    }

    @JsonProperty("log_level")
    public void setLog_level(String log_level) {
        this.log_level = log_level;
    }

    @JsonProperty("logger")
    public String getLogger() {
        return logger;
    }

    @JsonProperty("logger")
    public void setLogger(String logger) {
        this.logger = logger;
    }

    @JsonProperty("node_id")
    public String getNode_id() {
        return node_id;
    }

    @JsonProperty("node_id")
    public void setNode_id(String node_id) {
        this.node_id = node_id;
    }

    @JsonProperty("node_role")
    public String getNode_role() {
        return node_role;
    }

    @JsonProperty("node_role")
    public void setNode_role(String node_role) {
        this.node_role = node_role;
    }

    @JsonProperty("stacktrace")
    public String getStacktrace() {
        return stacktrace;
    }

    @JsonProperty("stacktrace")
    public void setStacktrace(String stacktrace) {
        this.stacktrace = stacktrace;
    }

    @JsonProperty("thread")
    public String getThread() {
        return thread;
    }

    @JsonProperty("thread")
    public void setThread(String thread) {
        this.thread = thread;
    }
}
