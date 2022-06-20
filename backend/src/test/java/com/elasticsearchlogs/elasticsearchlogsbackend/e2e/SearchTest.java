package com.elasticsearchlogs.elasticsearchlogsbackend.e2e;

import io.restassured.RestAssured;
import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;
import net.minidev.json.JSONObject;
import org.junit.jupiter.api.Test;

import java.util.Arrays;
import java.util.List;

import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.*;

public class SearchTest {

    private String getAuthCookie(){
        RequestSpecification loginReq = RestAssured.given();
        RestAssured.useRelaxedHTTPSValidation();

        JSONObject loginReqParams = new JSONObject();
        loginReqParams.put("username", "elasticadmin");
        loginReqParams.put("password", "MY_SECRET");

        loginReq.header("Content-Type", "application/json");
        loginReq.body(loginReqParams.toJSONString());

        Response loginRes = loginReq.post("https://localhost:8443/api/auth/login");

        return loginRes.getCookie("AuthToken");
    }

    @Test
    public void post_match_search(){
        JSONObject body = new JSONObject();
        body.put("fields", List.of("log_level"));
        body.put("searchTerms", List.of("INFO"));
        RestAssured.useRelaxedHTTPSValidation();

        given()
                .cookie("AuthToken",this.getAuthCookie())
                .header("Content-Type", "application/json")
                .body(body.toJSONString())
        .when()
                .post("https://localhost:8443/api/log/match-search")
        .then()
                .statusCode(200)
                .body("size()",is(200));
    }

    @Test
    public void post_wildcard_search(){
        JSONObject body = new JSONObject();
        body.put("fields", List.of("log_level"));
        body.put("searchTerms", List.of("INFO"));
        RestAssured.useRelaxedHTTPSValidation();

        given()
                .cookie("AuthToken",this.getAuthCookie())
                .header("Content-Type", "application/json")
                .body(body.toJSONString())
        .when()
                .post("https://localhost:8443/api/log/wildcard-search")
        .then()
                .statusCode(200)
                .body("size()",is(200));
    }

    @Test
    public void post_range_search(){
        JSONObject body = new JSONObject();
        body.put("fields", List.of("@timestamp"));
        body.put("searchTerms", List.of("2022-04-24T00:00:00.000+00:00","2022-04-24T04:00:00.000+00:00,"));
        RestAssured.useRelaxedHTTPSValidation();

        given()
                .cookie("AuthToken",this.getAuthCookie())
                .header("Content-Type", "application/json")
                .body(body.toJSONString())
        .when()
                .post("https://localhost:8443/api/log/range-search")
        .then()
                .statusCode(200);
    }
}
