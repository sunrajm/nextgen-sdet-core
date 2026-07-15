package com.sdet.framework.api;

import com.sdet.framework.models.DeviceRequest;
import io.restassured.response.Response;

public class DeviceClient extends BaseClient {
    private static final String OBJECTS_ENDPOINT = "/objects";
    public Response createDevice(DeviceRequest payload){
        return post(OBJECTS_ENDPOINT,payload);
    }
}
