package com.thiago.fullstackbackend.repository;

import com.thiago.fullstackbackend.model.Company;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository<Company, String> {
}

