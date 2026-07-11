package com.sdet.framwork.api;

import io.restassured.RestAssured;
import io.restassured.builder.RequestSpecBuilder;
import io.restassured.filter.log.LogDetail;
import io.restassured.http.ContentType;
import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;

import java.util.Map;

public abstract class BaseClient {
    protected final RequestSpecification requestSpec;
    private static final String BASE_URL = "https://api.restful-api.dev/";

    public BaseClient() {
        this.requestSpec = new RequestSpecBuilder()
                .setBaseUri(BASE_URL)
                .setContentType(ContentType.JSON)
                .log(LogDetail.ALL)
                .build();
    }

    protected <T>Response post(String endpoint,T payload){
            return RestAssured.given()
                    .spec(requestSpec)
                    .body(payload)
                    .when()
                    .post(endpoint);
    }

    protected Response get(String endpoint, Map<String,String> pathParams){
        return RestAssured.given()
                .spec(requestSpec)
                .pathParams(pathParams)
                .when()
                .get(endpoint);
    }

}
