package com.thiago.fullstackbackend.exception;

public class StockNotFoundException extends RuntimeException {
    public StockNotFoundException(String isin){
        super("Could not find stock with isin " + isin);
    }
}
