package com.thiago.fullstackbackend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
public class Stock {

    @Id // this tells MySQL that ISIN is primary key;
   //  @GeneratedValue = we don't use this tag because we don't want ID to be generated
    private String ISIN; // 12-digit alphanumeric code that uniquely identifies a specific security
    private String symbol; // Ticker symbols identify a company or other security within an exchange ("AAPL" -> Apple Inc)
    private Float marketCap; // multiplying outstanding shares by the current market price of one share
    private String type; //stock type (e.g., common, preferred, frowth, class a/b, etc.)

    public String getISIN() {
        return ISIN;
    }

    public void setISIN(String ISIN) {
        this.ISIN = ISIN;
    }

    public String getSymbol() {
        return symbol;
    }

    public void setSymbol(String symbol) {
        this.symbol = symbol;
    }

    public Float getMarketCap() {
        return marketCap;
    }

    public void setMarketCap(Float marketCap) {
        this.marketCap = marketCap;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}


