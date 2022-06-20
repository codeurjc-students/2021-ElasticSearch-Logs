package com.elasticsearchlogs.elasticsearchlogsbackend.e2e;


import io.restassured.RestAssured;
import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;
import net.minidev.json.JSONObject;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;

import static io.restassured.RestAssured.get;
import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.is;

public class IndexTest {

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
    public void get_all_indices(){
        RestAssured.useRelaxedHTTPSValidation();
        given()
                .cookie("AuthToken",this.getAuthCookie())
        .when()
                .get("https://localhost:8443/api/index/all")
        .then()
                .statusCode(200)
                .body("size()", Matchers.lessThanOrEqualTo(7));


    }
}