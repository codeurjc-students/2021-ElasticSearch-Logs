package com.elasticsearchlogs.elasticsearchlogsbackend.controller;

import com.elasticsearchlogs.elasticsearchlogsbackend.document.Log;
import com.elasticsearchlogs.elasticsearchlogsbackend.service.LogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/{agent}")
    public Log findLogByExtension(@PathVariable final String agent){
        return service.findLogByExtension(agent);
    }
}
