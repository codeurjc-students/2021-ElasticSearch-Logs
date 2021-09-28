package com.elasticsearchlogs.elasticsearchlogsbackend.controller;

import com.elasticsearchlogs.elasticsearchlogsbackend.document.City;
import com.elasticsearchlogs.elasticsearchlogsbackend.service.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/city")
public class CityController {

    private final CityService service;

    @Autowired
    public CityController(CityService service){
        this.service = service;
    }

    @PostMapping
    public  void save(@RequestBody final City city){
        service.save(city);
    }

    @GetMapping("/{id}")
    public City findCitiesByCity(@PathVariable final String id){
        return service.findCitiesByCity(id);
    }
}
