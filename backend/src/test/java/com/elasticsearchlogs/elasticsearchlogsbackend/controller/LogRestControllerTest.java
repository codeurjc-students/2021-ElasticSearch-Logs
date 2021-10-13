package com.elasticsearchlogs.elasticsearchlogsbackend.controller;

import com.elasticsearchlogs.elasticsearchlogsbackend.document.Log;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class LogRestControllerTest {

    @Autowired
    private LogRestController logRestController;

    /*@Test
    void getPageNumber() {
        Page<Log> res = logRestController.findAll(0);
        assertEquals(0,res.getNumber());
    }*/
}
