package com.thiago.fullstackbackend.model;

import jakarta.persistence.*;

@Entity
public class Sector {

    @Id
    private String sectorName; //PKEY
    private int numOfCompanies;
    private float marketWeight;




    public String getSectorName() {
        return sectorName;
    }

    public void setSectorName(String sector) {
        this.sectorName = sector;
    }

    public int getNumOfCompanies() {
        return numOfCompanies;
    }

    public void setNumOfCompanies(int numOfCompanies) {
        this.numOfCompanies = numOfCompanies;
    }

    public float getMarketWeight() {
        return marketWeight;
    }

    public void setMarketWeight(float marketWeight) {
        this.marketWeight = marketWeight;
    }
}