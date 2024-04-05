package com.thiago.fullstackbackend.exception;

public class SectorNotFoundException extends RuntimeException{
    public SectorNotFoundException(String id) {
        super("Sector name not found in database");
    }
}