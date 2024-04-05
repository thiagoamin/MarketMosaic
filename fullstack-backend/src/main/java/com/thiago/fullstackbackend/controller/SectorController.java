package com.thiago.fullstackbackend.controller;

import com.thiago.fullstackbackend.exception.SectorNotFoundException;
import com.thiago.fullstackbackend.model.Sector;
import com.thiago.fullstackbackend.repository.SectorRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class SectorController {

    @Autowired
    private SectorRepository sectorRepository;

    @PersistenceContext
    private EntityManager entityManager;

    @PostMapping("/sector")
    Sector newSector(@RequestBody Sector newSector) {

//        try {
//            newSector.setSectorName(extractIdFromJsonBody(newSector));
//        } catch (IOException e) {
//            System.out.println("Failed to parse sectorName");
//            throw new RuntimeException(e);
//        }
        return sectorRepository.save(newSector);
    }

    @GetMapping("/sectors")
    List<Sector> getAllSectors() {
        return sectorRepository.findAll(); //To TEST
    }

    private String extractIdFromJsonBody(@RequestBody Sector sector) throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        JsonNode jsonNode = mapper.readTree(mapper.writeValueAsString(sector));
        return jsonNode.get("sectorName").asText();
    }

    @GetMapping("/sector/{id}")
    Sector getSectorById(@PathVariable String id) {
        return sectorRepository.findById(id)
                .orElseThrow(() -> new SectorNotFoundException(id));
    }

    @PutMapping("/sector/{id}")
    Sector updateSector(@RequestBody Sector newSector, @PathVariable String id) {
        return sectorRepository.findById(id)
                .map(sector -> {
                    sector.setMarketWeight(newSector.getMarketWeight());
                    sector.setNumOfCompanies(newSector.getNumOfCompanies());
                    return sectorRepository.save(sector);
                })
                .orElseThrow(()->new SectorNotFoundException(id));
    }

    @DeleteMapping("/sector/{id}")
    String deleteSector(@PathVariable String id) {
        if (!sectorRepository.existsById(id)) {
            throw new SectorNotFoundException(id);
        }
        sectorRepository.deleteById(id);
        return "Sector with ID " + id + " has been deleted";
    }

    @GetMapping("/dividesectors")
    List<Sector> getSectorsWithStocks() {
        String query = "SELECT * FROM sector s " +
                "WHERE NOT EXISTS ( SELECT coi.name FROM company_operates_in coi WHERE coi.sector_name = s.sector_name " +
                "AND NOT EXISTS ( SELECT 1 FROM stock_issued_by sib WHERE sib.company_name = coi.name ))";
        Query result = entityManager.createNativeQuery(query, Sector.class);
        List<Sector> resultList = result.getResultList();
        return resultList;
    }



}