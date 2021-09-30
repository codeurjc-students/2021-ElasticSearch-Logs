package com.elasticsearchlogs.elasticsearchlogsbackend.repository;

import com.elasticsearchlogs.elasticsearchlogsbackend.document.Log;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

import java.util.List;

public interface LogRepository extends ElasticsearchRepository<Log,String> {

    List<Log> findAllByClientip(String clientIp);

    List<Log> findAllByExtension(String extension);

    List<Log> findAllByUrl(String url);

}
