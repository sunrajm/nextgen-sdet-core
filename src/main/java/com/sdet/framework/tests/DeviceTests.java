package com.sdet.framework.tests;

import com.sdet.framework.api.DeviceClient;
import com.sdet.framework.models.DeviceData;
import com.sdet.framework.models.DeviceRequest;
import io.restassured.response.Response;
import org.testng.Assert;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.DataProvider;
import org.testng.annotations.Test;

public class DeviceTests {
    private DeviceClient deviceClient;

    @BeforeClass
    public void setupWorkspace() {
        deviceClient = new DeviceClient();
    }

    /*
     * Define the data Matrix. Setting Parallel = true opens up concurrent processing threads
     * */

    @DataProvider(name = "deviceMatrixData", parallel = true)
    public Object[][] getDeviceDataMatrix() {
        return new Object[][]{
                {
                    DeviceRequest.builder()
                        .name("Apple iPhone 17 Pro")
                        .data(DeviceData.builder().year(2026).price(1199.00).cpuModel("A20 bionic").build())
                        .build()
                },
                {
                    DeviceRequest.builder()
                            .name("Google Pixel 10 XL")
                            .data(DeviceData.builder().year(2026).price(999.0).cpuModel("Tensor G6").build())
                            .build()
                },
                {
                    DeviceRequest.builder()
                            .name("Samsung Galaxy S26 Ultra")
                            .data(DeviceData.builder().year(2026).price(1399.50).cpuModel("Snapdragon Gen 5").build())
                            .build()
                }
        };
    }

    @Test(description = "Verify successful creation of a device record via API")
    public void verifyCreateDeviceRecord() {
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
        System.out.println("Response: " + apiResponse.asString());
        //Assertions
        Assert.assertEquals(statusCode, 200, "Expected a successful 200 OK. ");

        DeviceRequest responseBody = apiResponse.as(DeviceRequest.class);
        Assert.assertNotNull(apiResponse.jsonPath().getString("id"), "Response should contain a generated ID. ");
        Assert.assertEquals(responseBody.getName(), payload.getName());
    }

    @Test(dataProvider = "deviceMatrixData",description = "Execute parallel validation across distinct matrix payloads")
    public void verifyCreateDeviceRecordMatrix(DeviceRequest deviceRequest){
        //Log thread execution to witness parallel engine mechanics
        System.out.println("Execution Test for: "+deviceRequest.getName()+" on Thread ID: "+Thread.currentThread().getId());
        //Execute POST using our architecture base
        Response apiResponse = deviceClient.createDevice(deviceRequest);
        //Verification validation
        Assert.assertEquals(apiResponse.getStatusCode(),200,"Expected a successful status verification code.");
        DeviceRequest responseBody =  apiResponse.as(DeviceRequest.class);
        Assert.assertEquals(responseBody.getName(),deviceRequest.getName(),"Mismatch detected in structural payload name confirmation. ");


    }
}
