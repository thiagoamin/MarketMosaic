package com.thiago.fullstackbackend.repository;

import com.thiago.fullstackbackend.model.Stock;
import com.thiago.fullstackbackend.repository.Custom.CustomStockRepository;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StockRepository extends JpaRepository<Stock, String>, CustomStockRepository { //Stock, primary id is ISIN (of type string)
}
