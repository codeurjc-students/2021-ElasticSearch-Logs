package com.elasticsearchlogs.elasticsearchlogsbackend.controller;

import com.elasticsearchlogs.elasticsearchlogsbackend.search.model.document.Log;
import com.elasticsearchlogs.elasticsearchlogsbackend.search.model.dto.SearchRequestDTO;
import com.elasticsearchlogs.elasticsearchlogsbackend.search.SearchRestController;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
public class LogRestControllerTest {

    @Autowired
    private SearchRestController logRestController;

    private SearchRequestDTO createSearchRequestDTO(List<String> fields, List<String> searchTerms) {
        SearchRequestDTO searchRequestDTO = new SearchRequestDTO();

        searchRequestDTO.setFields(fields);
        searchRequestDTO.setSearchTerms(searchTerms);
        /*searchRequestDTO.setPage(0);
        searchRequestDTO.setSize(50);*/

        return searchRequestDTO;
    }

    @Test
    void searchOneField() {
        SearchRequestDTO searchRequestDTO = createSearchRequestDTO(List.of("extension"), List.of("deb"));
        List<Log> res = logRestController.boolSearch(searchRequestDTO);
        assertFalse(res.isEmpty());
    }

    @Test
    void searchMoreThanOneField() {
        SearchRequestDTO searchRequestDTO = createSearchRequestDTO(List.of("extension", "bytes"), List.of("deb", "0"));
        List<Log> res = logRestController.boolSearch(searchRequestDTO);
        assertFalse(res.isEmpty());
    }

    @Test
    void searchWithMoreFieldsThanSearchTerms() {
        SearchRequestDTO searchRequestDTO = createSearchRequestDTO(List.of("extension", "bytes","ip"), List.of("deb", "0"));
        List<Log> res = logRestController.boolSearch(searchRequestDTO);
        assertFalse(res.isEmpty());
    }

    @Test
    void searchWithMoreSearchTermsThanFields() {
        SearchRequestDTO searchRequestDTO = createSearchRequestDTO(List.of("extension", "bytes"), List.of("deb", "0","xxx"));
        List<Log> res = logRestController.boolSearch(searchRequestDTO);
        assertFalse(res.isEmpty());
    }

    @Test
    void searchButNothingFound() {
        SearchRequestDTO searchRequestDTO = createSearchRequestDTO(List.of("extension", "bytes"), List.of("xrx", "0"));
        List<Log> res = logRestController.boolSearch(searchRequestDTO);
        assertTrue(res.isEmpty());
    }
}
