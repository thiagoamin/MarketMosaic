package com.thiago.fullstackbackend.controller;

import com.thiago.fullstackbackend.exception.StockNotFoundException;
import com.thiago.fullstackbackend.model.Stock;
import com.thiago.fullstackbackend.repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000") //connection to frontend (REACT)
public class StockController {

    @Autowired
    private StockRepository stockRepository;

    // sends data from app to sql database using springboot
    @PostMapping("/stock") // http://localhost:8080/stock
    Stock newStock(@RequestBody Stock newStock) {
        return stockRepository.save(newStock);
    }

    // gets sql database data and sends to app
    @GetMapping("/stocks")
    List<Stock> getAllStocks() {
        return stockRepository.findAll();
    }

    @GetMapping("/stock/{isin}")
    Stock getUserByISIN(@PathVariable String isin) {
        return stockRepository.findById(isin)
                .orElseThrow(()->new StockNotFoundException(isin));
    }

    @PutMapping("/stock/{isin}")
    Stock updateStock(@RequestBody Stock newStock, @PathVariable String isin) {
        return stockRepository.findById(isin).map(stock -> {
            stock.setISIN(newStock.getISIN());
            stock.setSymbol(newStock.getSymbol());
            stock.setType(newStock.getType());
            stock.setMarketCap(newStock.getMarketCap());
            return stockRepository.save(stock);
        }).orElseThrow(()->new StockNotFoundException(isin));
    }

    @DeleteMapping("stock/{isin}")
    String deleteStock(@PathVariable String isin) {
        if(!stockRepository.existsById(isin)) {
            throw new StockNotFoundException(isin);
        }
        stockRepository.deleteById(isin);
        return "Stock with isin " + "isin " + "has been deleted.";
    }
}
