package com.elasticsearchlogs.elasticsearchlogsbackend.index;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/index")
public class IndexRestController {

    private final IndexService indexService;

    @Autowired
    public IndexRestController(IndexService indexService) {
        this.indexService = indexService;
    }

    /**
     * It gets all the available indices from OpenVidu
     *
     * @return A List with the name of all the indices
     * @author cristian
     */
    @GetMapping("/all")
    public List<String> boolMatchSearch() {
        return Arrays.asList(indexService.getMostRecentIndicesKeys());
    }
}
