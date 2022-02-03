package com.elasticsearchlogs.elasticsearchlogsbackend.configuration;

import lombok.SneakyThrows;
import org.apache.http.HttpHost;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.elasticsearch.client.RequestOptions;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestClientBuilder;
import org.elasticsearch.client.RestHighLevelClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.elasticsearch.client.ClientConfiguration;
import org.springframework.data.elasticsearch.client.RestClients;
import org.springframework.data.elasticsearch.config.AbstractElasticsearchConfiguration;

import java.net.MalformedURLException;
import java.net.URL;

@Configuration
@ComponentScan(basePackages = {"com.elasticsearchlogs.elasticsearchlogsbackend"})
public class Config extends AbstractElasticsearchConfiguration {

    @Value("${elasticsearch.url}")
    public String elasticsearchUrl;

    @SneakyThrows
    @Bean
    @Override
    public RestHighLevelClient elasticsearchClient() {
        URL url = new URL("https://demos.openvidu.io/openvidu/elasticsearch");
        HttpHost host = new HttpHost(new HttpHost(url.getHost(), url.getPort(), url.getProtocol()));
        RestClientBuilder restClientBuilder = RestClient.builder(host);
        if (url.getPath() != null && !url.getPath().isEmpty()) {
            restClientBuilder.setPathPrefix(url.getPath());
        }
        CredentialsProvider credentialsProvider = new BasicCredentialsProvider();
        credentialsProvider.setCredentials(AuthScope.ANY, new UsernamePasswordCredentials("elasticadmin", "MY_SECRET"));
        restClientBuilder.setHttpClientConfigCallback(
                httpClientBuilder -> httpClientBuilder.setDefaultCredentialsProvider(credentialsProvider));

        return  new RestHighLevelClient(restClientBuilder);
    }




}
