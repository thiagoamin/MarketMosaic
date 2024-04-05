package com.thiago.fullstackbackend.repository.Services;

import com.thiago.fullstackbackend.model.Stock;
import org.springframework.stereotype.Service;

import java.util.List;

public interface StockService {
    Stock save(Stock stock);
    Stock update(Stock newStock, String isin);
    void deleteById(String id);
    List<Stock> findAll();
    Stock findById(String id);
    boolean existsById(String isin);
}
