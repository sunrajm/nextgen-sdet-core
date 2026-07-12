package com.sdet.framework.models;

import lombok.Builder;
import lombok.Data;
import lombok.extern.jackson.Jacksonized;

@Data
@Builder
@Jacksonized
public class DeviceRequest {
    private String name;
    private DeviceData data;
}
