package com.elasticsearchlogs.elasticsearchlogsbackend.service;

import com.elasticsearchlogs.elasticsearchlogsbackend.document.Log;
import com.elasticsearchlogs.elasticsearchlogsbackend.repository.LogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LogService {

    private final LogRepository repository;

    @Autowired
    public LogService(LogRepository repository){
        this.repository = repository;
    }

    public void save(final Log log){
        repository.save(log);
    }

    public Page<Log> findAll(int pageNumber){
        Pageable pageable = PageRequest.of(pageNumber, 15);
        return repository.findAll(pageable);
    }

    public List<Log> findAllByClientip(final String clientIp){ return repository.findAllByClientip(clientIp); }

    public List<Log> findAllByExtension(final String extension){ return repository.findAllByExtension(extension); }

    public List<Log> findAllByUrl(final String url){ return repository.findAllByUrl(url); }
}
