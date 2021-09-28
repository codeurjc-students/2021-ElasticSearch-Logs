package com.elasticsearchlogs.elasticsearchlogsbackend.repository;

import com.elasticsearchlogs.elasticsearchlogsbackend.document.City;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

public interface CityRepository extends ElasticsearchRepository<City,String> {

    City findCitiesByCity(String name);

}
