package com.thiago.fullstackbackend.repository.Custom;

import com.thiago.fullstackbackend.model.Stock;

public interface CustomStockRepository {
    Stock saveStockToAllTables(Stock stock);
    Stock updateStockFromAllTables(Stock newStock, Stock oldStock);
    void deleteStockFromAllTables(String isin);
}
