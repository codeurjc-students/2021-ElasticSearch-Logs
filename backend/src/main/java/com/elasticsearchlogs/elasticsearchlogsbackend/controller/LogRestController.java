package com.elasticsearchlogs.elasticsearchlogsbackend.controller;

import com.elasticsearchlogs.elasticsearchlogsbackend.document.Log;
import com.elasticsearchlogs.elasticsearchlogsbackend.search.SearchRequestDTO;
import com.elasticsearchlogs.elasticsearchlogsbackend.service.LogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/log")
public class LogRestController {

    private final LogService service;

    @Autowired
    public LogRestController(LogService service) {
        this.service = service;
    }

    @PostMapping("/")
    public void index(@RequestBody final Log log) {
        service.index(log);
    }

    @GetMapping("/{id}")
    public Log getById(@PathVariable final String id) {
        return service.getById(id);
    }

    @PostMapping("/search")
    public List<Log> search(@RequestBody final SearchRequestDTO searchRequestDTO) {
        return service.search(searchRequestDTO);
    }
}
