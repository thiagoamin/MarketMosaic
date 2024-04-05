package com.thiago.fullstackbackend.controller;

import com.thiago.fullstackbackend.exception.StockNotFoundException;
import com.thiago.fullstackbackend.model.Stock;
import com.thiago.fullstackbackend.repository.Services.StockService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000") //connection to frontend (REACT)
public class StockController {

    @Autowired
    private StockService stockService;

    @PersistenceContext
    private EntityManager entityManager;

    // sends data from app to sql database using springboot
    @PostMapping("/stock") // http://localhost:8080/stock
    Stock newStock(@RequestBody Stock newStock) {
        return stockService.save(newStock);
    }

    @PostMapping("/customquery") // http://localhost:8080/customquery
    List customQuery(@RequestBody String query) {
        System.out.println(query);
        Query result = entityManager.createNativeQuery(query);
        return result.getResultList();
    }

    // gets sql database data and sends to app
    @GetMapping("/stocks")
    List<Stock> getAllStocks() {
        return stockService.findAll();
    }

    @GetMapping("/stock/{isin}")
    Stock getUserByISIN(@PathVariable String isin) {
        return stockService.findById(isin);
    }

    @PutMapping("/stock/{isin}")
    Stock updateStock(@RequestBody Stock newStock, @PathVariable String isin) {
        return stockService.update(newStock, isin);
    }

    @DeleteMapping("stock/{isin}")
    String deleteStock(@PathVariable String isin) {
        if(!stockService.existsById(isin)) {
            throw new StockNotFoundException(isin);
        }
        stockService.deleteById(isin);
        return "Stock with isin " + "isin " + "has been deleted.";
    }
}
