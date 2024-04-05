package com.thiago.fullstackbackend.model;

import jakarta.persistence.*;

import java.math.BigInteger;

// SQL 1: company(name, employees, revenue, ......) - spring generated
// SQL 2: Company_operatesIn(...)
@Entity
@Table(name = "company_operates_in")
public class Company {
    @Id
    @Column(name="name")
    private String name;
    @Column(name="employees")
    private int employees;
    @Column(name="revenue")
    private BigInteger revenue;
    @Column(name="sector_name")
    private String sector;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getEmployees() {
        return employees;
    }

    public void setEmployees(int employees) {
        this.employees = employees;
    }

    public BigInteger getRevenue() {
        return revenue;
    }

    public void setRevenue(BigInteger revenue) {
        this.revenue = revenue;
    }

    public String getSector() {
        return sector;
    }

    public void setSector(String sector) {
        this.sector = sector;
    }
}
