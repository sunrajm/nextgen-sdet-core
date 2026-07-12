package com.sdet.framework.models;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)

public class DeviceData {
    private Integer year;
    private Double price;

    @JsonProperty("CPU model")
    private String cpuModel;
}
