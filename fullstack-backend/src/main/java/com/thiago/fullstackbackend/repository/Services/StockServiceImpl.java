package com.thiago.fullstackbackend.repository.Services;

import com.thiago.fullstackbackend.exception.StockNotFoundException;
import com.thiago.fullstackbackend.model.Stock;
import com.thiago.fullstackbackend.repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class StockServiceImpl implements StockService {

    @Autowired
    private StockRepository stockRepository;

    @Override
    @Transactional
    public Stock save(Stock stock) {
        return stockRepository.saveStockToAllTables(stock);
    }

    @Override
    @Transactional
    public Stock update(Stock newStock, String isin) {
        Stock oldStock = stockRepository.findById(isin)
                .orElseThrow(()->new StockNotFoundException(isin));
        return stockRepository.updateStockFromAllTables(newStock, oldStock);
    }

    @Override
    @Transactional
    public void deleteById(String id) {
        stockRepository.deleteStockFromAllTables(id);
    }

    @Transactional
    public List<Stock> findAll() {
        return stockRepository.findAll();
    }

    @Transactional
    @Override
    public Stock findById(String isin) {
        return stockRepository.findById(isin)
                .orElseThrow(()->new StockNotFoundException(isin));
    }

    @Transactional
    @Override
    public boolean existsById(String isin){
        return stockRepository.existsById(isin);
    }
}
