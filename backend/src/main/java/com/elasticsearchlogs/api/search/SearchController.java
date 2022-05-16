package com.elasticsearchlogs.api.search;

import com.elasticsearchlogs.api.search.document.OpenViduLog;
import com.elasticsearchlogs.api.search.dto.CountDTO;
import com.elasticsearchlogs.api.search.dto.SearchRequestDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/log")
public class SearchController {

    private final SearchService service;

    @Autowired
    public SearchController(SearchService service) {
        this.service = service;
    }

    @PostMapping("/match-search")
    public List<OpenViduLog> boolMatchSearch(@RequestBody final SearchRequestDTO searchRequestDTO) {
        return service.search(searchRequestDTO,"match");
    }

    @PostMapping("/wildcard-search")
    public List<OpenViduLog> boolWildcardSearch(@RequestBody final SearchRequestDTO searchRequestDTO) {
        return service.search(searchRequestDTO,"wildcard");
    }

    @PostMapping("/range-search")
    public List<OpenViduLog> rangeSearch(@RequestBody final SearchRequestDTO searchRequestDTO) {
        return service.search(searchRequestDTO,"range");
    }

    @GetMapping("/count/all/{index}")
    public List<CountDTO> countAll(@PathVariable final String index) {
        return service.count(index);
    }


}
