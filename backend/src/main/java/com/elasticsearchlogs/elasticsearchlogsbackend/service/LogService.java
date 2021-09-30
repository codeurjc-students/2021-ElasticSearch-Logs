package com.elasticsearchlogs.elasticsearchlogsbackend.service;

import com.elasticsearchlogs.elasticsearchlogsbackend.document.Log;
import com.elasticsearchlogs.elasticsearchlogsbackend.repository.LogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LogService {

    private final LogRepository repository;

    @Autowired
    public LogService(LogRepository repository){
        this.repository = repository;
    }

    public void save(final Log city){
        repository.save(city);
    }

    public Log findLogByExtension(final String agent){ return repository.findLogByClientip(agent); }
}
