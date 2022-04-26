package com.elasticsearchlogs.elasticsearchlogsbackend.search;

import com.elasticsearchlogs.elasticsearchlogsbackend.search.document.Log;
import com.elasticsearchlogs.elasticsearchlogsbackend.search.dto.CountDTO;
import com.elasticsearchlogs.elasticsearchlogsbackend.search.dto.SearchRequestDTO;
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
    public List<Log> boolMatchSearch(@RequestBody final SearchRequestDTO searchRequestDTO) {
        return service.search(searchRequestDTO,"match");
    }

    @PostMapping("/wildcard-search")
    public List<Log> boolWildcardSearch(@RequestBody final SearchRequestDTO searchRequestDTO) {
        return service.search(searchRequestDTO,"wildcard");
    }

    @PostMapping("/range-search")
    public List<Log> rangeSearch(@RequestBody final SearchRequestDTO searchRequestDTO) {
        return service.search(searchRequestDTO,"range");
    }

    @GetMapping("/count/all/{index}")
    public List<CountDTO> countAll(@PathVariable final String index) {
        return service.count(index);
    }
 

}
