package com.thiago.fullstackbackend.repository;

import com.thiago.fullstackbackend.model.Stock;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockRepository extends JpaRepository<Stock, String> { //Stock, primary id is ISIN (of type string)
}
