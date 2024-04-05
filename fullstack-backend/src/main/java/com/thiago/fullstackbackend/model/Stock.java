package com.thiago.fullstackbackend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "stock_view") // name of your view
public class Stock {

    @Id // this tells MySQL that ISIN is primary key;
    @Column(name = "isin")
    private String ISIN; // 12-digit alphanumeric code that uniquely identifies a specific security
    @Column(name = "symbol")
    private String symbol; // Ticker symbols identify a company or other security within an exchange ("AAPL" -> Apple Inc)
    @Column(name = "market_cap")
    private Float marketCap; // multiplying outstanding shares by the current market price of one share
    @Column(name = "type")
    private String type; //stock type (e.g., common, preferred, frowth, class a/b, etc.)
    @Column(name="company_name")
    private String companyName;

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

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
     this.companyName = companyName;
    }
}