package com.elasticsearchlogs.elasticsearchlogsbackend.service;

import com.elasticsearchlogs.elasticsearchlogsbackend.document.City;
import com.elasticsearchlogs.elasticsearchlogsbackend.repository.CityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CityService {

    private final CityRepository repository;

    @Autowired
    public CityService(CityRepository repository){
        this.repository = repository;
    }

    public void save(final City city){
        repository.save(city);
    }

    public City findCitiesByCity(final String id){
        return repository.findCitiesByCity(id);
    }
}
