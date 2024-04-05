package com.thiago.fullstackbackend.repository.Custom;

import com.thiago.fullstackbackend.model.Stock;
import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public class CustomStockRepositoryImpl implements CustomStockRepository {

    @Autowired
    private EntityManager entityManager;

    @Transactional
    public Stock saveStockToAllTables(Stock stock) {

        // Insert into stock_type
        entityManager.createNativeQuery("INSERT INTO stock_type(symbol, type) VALUES (:symbol, :type)")
                .setParameter("symbol", stock.getSymbol())
                .setParameter("type", stock.getType())
                .executeUpdate();

        // Insert into stock_marketcap
        entityManager.createNativeQuery("INSERT INTO stock_marketcap(symbol, market_cap) VALUES (:symbol, :marketCap)")
                .setParameter("symbol", stock.getSymbol())
                .setParameter("marketCap", stock.getMarketCap())
                .executeUpdate();

        // Insert into stock_issued_by
        entityManager.createNativeQuery("INSERT INTO stock_issued_by(isin, symbol, company_name) VALUES (:isin, :symbol, :companyName)")
                .setParameter("isin", stock.getISIN())
                .setParameter("symbol", stock.getSymbol())
                .setParameter("companyName", stock.getCompanyName())
                .executeUpdate();

        return stock;
    }

    @Transactional
    public void deleteStockFromAllTables(String isin) {
        String symbol = (String) entityManager.createNativeQuery("SELECT symbol FROM stock_issued_by WHERE isin = :isin")
                .setParameter("isin", isin)
                .getSingleResult();

        entityManager.createNativeQuery("DELETE FROM stock_issued_by WHERE isin = :isin")
                .setParameter("isin", isin)
                .executeUpdate();

        // Delete from stock_marketcap
        entityManager.createNativeQuery("DELETE FROM stock_marketcap WHERE symbol = :symbol LIMIT 1") //TODO: LIMIT?
                .setParameter("symbol", symbol)
                .executeUpdate();

        // Finally, delete from stock_type
        entityManager.createNativeQuery("DELETE FROM stock_type WHERE symbol = :symbol LIMIT 1")
                .setParameter("symbol", symbol)
                .executeUpdate();
    }

    @Transactional
    public Stock updateStockFromAllTables(Stock newStock, Stock oldStock) {
        entityManager.createNativeQuery("UPDATE stock_type SET symbol = :symbol1, type = :type WHERE symbol = :symbol2")
                .setParameter("symbol1", newStock.getSymbol())
                .setParameter("type", newStock.getType())
                .setParameter("symbol2", oldStock.getSymbol())
                .executeUpdate();

        entityManager.createNativeQuery("UPDATE stock_marketcap SET market_cap = :marketCap WHERE symbol = :symbol")
                .setParameter("marketCap", newStock.getMarketCap())
                .setParameter("symbol", newStock.getSymbol()) // FK was already updated
                .executeUpdate();

        entityManager.createNativeQuery("UPDATE stock_issued_by SET isin = :isin1 WHERE isin = :isin2")
                .setParameter("isin1", newStock.getISIN())
                .setParameter("isin2", oldStock.getISIN())
                .executeUpdate();

        entityManager.createNativeQuery("UPDATE stock_issued_by SET company_name = :company_name WHERE isin = :isin")
                .setParameter("isin", newStock.getISIN())
                .setParameter("company_name", newStock.getCompanyName())
                .executeUpdate();

        return newStock;
    }

}
