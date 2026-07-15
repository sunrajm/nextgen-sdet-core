package com.sdet.framework.tests;

import com.sdet.framework.api.DeviceClient;
import com.sdet.framework.models.DeviceData;
import com.sdet.framework.models.DeviceRequest;
import io.restassured.response.Response;
import org.testng.Assert;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

public class DeviceTests {
    private DeviceClient deviceClient;

    @BeforeClass
    public void setupWorkspace(){
        deviceClient = new DeviceClient();
    }

    @Test(description = "Verify successful creation of a device record via API")
    public void verifyCreateDeviceRecord(){
        //Construct the test payload
        DeviceData technicalSpecs = DeviceData.builder()
                .year(2026)
                .price(1199.99)
                .cpuModel("A20 Bionic")
                .build();

        DeviceRequest payload = DeviceRequest.builder()
                .name("Apple iPhone 17 Pro")
                .data(technicalSpecs)
                .build();

        //Execute POST
        Response apiResponse = deviceClient.createDevice(payload);
        int statusCode = apiResponse.getStatusCode();
        System.out.println("Response: "+apiResponse.asString());
        //Assertions
        Assert.assertEquals(statusCode,200,"Expected a successful 200 OK. ");

        DeviceRequest responseBody = apiResponse.as(DeviceRequest.class);
        Assert.assertNotNull(apiResponse.jsonPath().getString("id"),"Response should contain a generated ID. ");
        Assert.assertEquals(responseBody.getName(),payload.getName());
    }
}
