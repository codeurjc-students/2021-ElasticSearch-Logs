package com.elasticsearchlogs.elasticsearchlogsbackend.search;

import com.elasticsearchlogs.elasticsearchlogsbackend.search.model.document.Log;
import com.elasticsearchlogs.elasticsearchlogsbackend.search.model.dto.SearchRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/log")
public class SearchRestController {

    private final SearchService service;

    @Autowired
    public SearchRestController(SearchService service) {
        this.service = service;
    }

    @PostMapping("/match-search")
    public List<Log> boolSearch(@RequestBody final SearchRequestDTO searchRequestDTO) {
        return service.search(searchRequestDTO,"match");
    }

    @PostMapping("/wildcard-search")
    public List<Log> termSearch(@RequestBody final SearchRequestDTO searchRequestDTO) {
        return service.search(searchRequestDTO,"wildcard");
    }
}
