package com.elasticsearchlogs.elasticsearchlogsbackend.client;

import org.apache.http.HttpHost;
import org.apache.http.auth.AuthScope;
import org.apache.http.auth.UsernamePasswordCredentials;
import org.apache.http.client.CredentialsProvider;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.elasticsearch.client.ElasticsearchClient;
import org.elasticsearch.client.RestClient;
import org.elasticsearch.client.RestClientBuilder;
import org.elasticsearch.client.RestHighLevelClient;
import org.jetbrains.annotations.NotNull;
import org.jetbrains.annotations.Nullable;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.elasticsearch.config.AbstractElasticsearchConfiguration;

import java.net.MalformedURLException;
import java.net.URL;

@Configuration
@ComponentScan(basePackages = {"com.elasticsearchlogs.elasticsearchlogsbackend"})
public class ClientConfig extends AbstractElasticsearchConfiguration {

    @Value("${spring.elasticsearch.rest.uris}")
    public String elasticsearchUrl;

    @Value("${spring.elasticsearch.rest.username}")
    public String username;

    @Value("${spring.elasticsearch.rest.password}")
    public String password;


    @Bean
    @Override
    public @NotNull RestHighLevelClient elasticsearchClient() {

        URL url = buildURL();
        if (url == null) throw new RuntimeException("The provided URL is malformed");

        HttpHost host = new HttpHost(new HttpHost(url.getHost(), url.getPort(), url.getProtocol()));
        RestClientBuilder restClientBuilder = RestClient.builder(host);
        if (url.getPath() != null && !url.getPath().isEmpty()) {
            restClientBuilder.setPathPrefix(url.getPath());
        }

        CredentialsProvider credentialsProvider = login();
        if (credentialsProvider != null){
            restClientBuilder.setHttpClientConfigCallback(
                    httpClientBuilder -> httpClientBuilder.setDefaultCredentialsProvider(credentialsProvider));
        }

        return new RestHighLevelClient(restClientBuilder);
    }


    private @Nullable URL buildURL() {
        try {
            return new URL(this.elasticsearchUrl);
        } catch (MalformedURLException e) {
            e.printStackTrace();
            return null;
        }
    }

    private @Nullable CredentialsProvider login() {

        if (this.username == null || this.password == null) return null;

            CredentialsProvider credentialsProvider = new BasicCredentialsProvider();
        credentialsProvider.setCredentials(
                AuthScope.ANY,
                new UsernamePasswordCredentials(this.username, this.password)
        );

        return credentialsProvider;
    }


}
