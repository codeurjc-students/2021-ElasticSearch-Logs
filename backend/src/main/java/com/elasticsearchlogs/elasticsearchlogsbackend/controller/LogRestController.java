package com.elasticsearchlogs.elasticsearchlogsbackend.controller;

import com.elasticsearchlogs.elasticsearchlogsbackend.document.Filter;
import com.elasticsearchlogs.elasticsearchlogsbackend.document.Log;
import com.elasticsearchlogs.elasticsearchlogsbackend.service.LogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/log")
public class LogRestController {

    private final LogService service;

    @Autowired
    public LogRestController(LogService service){
        this.service = service;
    }

    @PostMapping
    public  void save(@RequestBody final Log log){
        service.save(log);
    }

    @GetMapping("/{pageNumber}")
    public Page<Log> findAll(@PathVariable final int pageNumber){
        return service.findAll(pageNumber);
    }

    @GetMapping("/clientip/{clientIp}")
    public List<Log> findAllByClientip(@PathVariable final String clientIp){
        return service.findAllByClientip(clientIp);
    }

    @GetMapping("/extension/{extension}")
    public List<Log> findAllByExtension(@PathVariable final String extension){
        return service.findAllByExtension(extension);
    }

    @GetMapping("/url/{url}")
    public List<Log> findAllByUrl(@PathVariable final String url){
        return service.findAllByUrl(url);
    }
}
