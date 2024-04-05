package com.thiago.fullstackbackend.exception;

public class CompanyNotFoundException extends RuntimeException{
    public CompanyNotFoundException(String id) {
        super("Company name not found in database");
    }
}