package com.elasticsearchlogs.elasticsearchlogsbackend.document;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
import org.springframework.data.elasticsearch.annotations.Setting;

@Document(indexName = "cities")
@Setting(settingPath = "static/es-settings.json")
public class City {

    @Id
    @Field(type = FieldType.Keyword)
    private  String id;

    @Field(type = FieldType.Text)
    private  String city;

    @Field(type = FieldType.Text)
    private  String country;

    @Field(type = FieldType.Text)
    private  String location;

    @Field(type = FieldType.Text)
    private  String population;

    @Field(type = FieldType.Text)
    private  String region;

    public String getId() {
        return id;
    }

    public void setIdy(String id) {
        this.id = id;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getPopulation() {
        return population;
    }

    public void setPopulation(String population) {
        this.population = population;
    }

    public String getRegion() {
        return region;
    }

    public void setRegion(String region) {
        this.region = region;
    }
}
