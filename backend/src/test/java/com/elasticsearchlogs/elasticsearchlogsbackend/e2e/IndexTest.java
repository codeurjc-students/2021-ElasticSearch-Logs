package com.elasticsearchlogs.elasticsearchlogsbackend.e2e;


import com.elasticsearchlogs.elasticsearchlogsbackend.index.IndexRestController;
import io.restassured.RestAssured;
import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;
import net.minidev.json.JSONObject;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static io.restassured.RestAssured.get;
import static io.restassured.RestAssured.given;
import static org.hamcrest.Matchers.is;

public class IndexTest {

    private String getAuthCookie(){
        RequestSpecification loginReq = RestAssured.given();

        JSONObject loginReqParams = new JSONObject();
        loginReqParams.put("username", "elasticadmin");
        loginReqParams.put("password", "MY_SECRET");

        loginReq.header("Content-Type", "application/json");
        loginReq.body(loginReqParams.toJSONString());

        Response loginRes = loginReq.post("http://localhost:8080/api/auth/login");

        return loginRes.getCookie("AuthToken");
    }
    @Test
    public void get_all_indices(){

        given()
                .cookie("AuthToken",this.getAuthCookie())
        .when()
                .get("http://localhost:8080/api/index/all")
        .then()
                .statusCode(200)
                .body("size()",is(7));


    }
}