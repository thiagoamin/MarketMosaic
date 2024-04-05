package com.thiago.fullstackbackend.controller;

import com.thiago.fullstackbackend.exception.CompanyNotFoundException;
import com.thiago.fullstackbackend.model.Company;
import com.thiago.fullstackbackend.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class CompanyController {

    @Autowired
    private CompanyRepository companyRepository;

    @PostMapping("/company")
    Company newCompany(@RequestBody Company newCompany) {
        return companyRepository.save(newCompany);
    }

    @GetMapping("/companies")
    List<Company> getAllCompanies() {return companyRepository.findAll();}


    @GetMapping("/company/{id}")
    Company getCompanyById(@PathVariable String id) {
        return companyRepository.findById(id)
                .orElseThrow(() -> new CompanyNotFoundException(id));
    }

    @PutMapping("/company/{id}")
    Company updateCompany(@RequestBody Company newCompany, @PathVariable String id) {
        return companyRepository.findById(id)
                .map(companyOperatesin -> {
                    companyOperatesin.setEmployees(newCompany.getEmployees());
                    companyOperatesin.setRevenue(newCompany.getRevenue());
                    companyOperatesin.setSector(newCompany.getSector()); //changed this
                    return companyRepository.save(companyOperatesin);
                })
                .orElseThrow(()->new CompanyNotFoundException(id));
    }

    @DeleteMapping("/company/{id}")
    String deleteCompany(@PathVariable String id) {
        if (!companyRepository.existsById(id)) {
            throw new CompanyNotFoundException(id);
        }
        companyRepository.deleteById(id);
        return "Company with name " + id + " has been deleted";
    }

}