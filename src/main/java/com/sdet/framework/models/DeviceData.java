package com.sdet.framework.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@NoArgsConstructor  // Allows Jackson to create empty instances
@AllArgsConstructor // Required by Lombok when NoArgsConstructor and Builder are paired
@JsonIgnoreProperties(ignoreUnknown = true)
public class DeviceData {
    private Integer year;
    private Double price;

    @JsonProperty("CPU model")
    private String cpuModel;
}
