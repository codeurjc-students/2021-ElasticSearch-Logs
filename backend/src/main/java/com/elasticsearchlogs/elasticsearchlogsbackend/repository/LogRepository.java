package com.elasticsearchlogs.elasticsearchlogsbackend.repository;

import com.elasticsearchlogs.elasticsearchlogsbackend.document.Log;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface LogRepository extends ElasticsearchRepository<Log,String> {

    Log findLogByClientip(String agent);

}
