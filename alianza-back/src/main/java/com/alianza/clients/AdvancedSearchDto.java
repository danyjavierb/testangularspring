package com.alianza.clients;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.time.LocalDate;

public class AdvancedSearchDto {

    private String sharedKey ="";

    private String businessId = "";

    private String email = "";

    private Long phone = Long.valueOf(0);

    @JsonProperty("startsAt")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate startsAt = LocalDate.now();

    @JsonProperty("endsAt")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate endsAt = LocalDate.now();

    public AdvancedSearchDto() {

    }

    public AdvancedSearchDto(String sharedKey, String businessId, String email) {
        this.sharedKey = sharedKey;
        this.businessId = businessId;
        this.email = email;
    }

    public AdvancedSearchDto(String sharedKey, String businessId, String email, Long phone, LocalDate startsAt, LocalDate endsAt) {
        this.sharedKey = sharedKey;
        this.businessId = businessId;
        this.email = email;
        this.phone = phone;
        this.startsAt = startsAt;
        this.endsAt = endsAt;
    }

    public String getSharedKey() {
        return sharedKey;
    }

    public void setSharedKey(String sharedKey) {
        this.sharedKey = sharedKey;
    }

    public String getBusinessId() {
        return businessId;
    }

    public void setBusinessId(String businessId) {
        this.businessId = businessId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getPhone() {
        return phone;
    }

    public void setPhone(Long phone) {
        this.phone = phone;
    }

    public LocalDate getStartsAt() {
        return startsAt;
    }

    public void setStartsAt(LocalDate startsAt) {
        this.startsAt = startsAt;
    }

    public LocalDate getEndsAt() {
        return endsAt;
    }

    public void setEndsAt(LocalDate endsAt) {
        this.endsAt = endsAt;
    }
}
