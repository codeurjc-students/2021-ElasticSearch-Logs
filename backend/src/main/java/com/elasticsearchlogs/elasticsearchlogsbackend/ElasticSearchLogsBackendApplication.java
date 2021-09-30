package com.elasticsearchlogs.elasticsearchlogsbackend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;

@SpringBootApplication
public class ElasticSearchLogsBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(ElasticSearchLogsBackendApplication.class, args);
    }

}
