package com.elasticsearchlogs.elasticsearchlogsbackend.controller;

import com.elasticsearchlogs.elasticsearchlogsbackend.document.Log;
import com.elasticsearchlogs.elasticsearchlogsbackend.search.SearchRequestDTO;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class LogRestControllerTest {

    @Autowired
    private LogRestController logRestController;

    private SearchRequestDTO createSearchRequestDTO() {
        SearchRequestDTO searchRequestDTO = new SearchRequestDTO();

        searchRequestDTO.setFields(Collections.singletonList("extension"));
        searchRequestDTO.setSearchTerm("deb");
        searchRequestDTO.setPage(0);
        searchRequestDTO.setSize(50);

        return searchRequestDTO;
    }

    @Test
    void searchByExtension() {
        SearchRequestDTO searchRequestDTO = createSearchRequestDTO();
        List<Log> res = logRestController.search(searchRequestDTO);
        assertEquals(50, res.size());
    }
}
