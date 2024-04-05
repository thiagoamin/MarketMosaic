import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios';

export default function ViewStock() {

    const [stock, setStock]=useState({
        isin:"",
        symbol:"",
        marketCap:null,
        type:"",
        companyName:""
    });

    const{isin}=useParams();

    useEffect(()=>{
        loadStock();
    }, []);

    const loadStock = async ()=>{
        const result=await axios.get(`http://localhost:8080/stock/${isin}`)
        setStock(result.data);
    }

    return (
        <div className="container">
          <div className="row">
            <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
              <h2 className="text-center m-4">Stock Details</h2>
    
              <div className="card">
                <div className="card-header">
                  Details of stock isin : {stock.isin}
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <b>ISIN:</b>
                      {stock.isin} 
                    </li>
                    <li className="list-group-item">
                      <b>Symbol:</b>
                      {stock.symbol}
                    </li>
                    <li className="list-group-item">
                      <b>Market Cap:</b>
                      {stock.marketCap}
                    </li>
                    <li className="list-group-item">
                      <b>Type:</b>
                      {stock.type}
                    </li>
                    <li className="list-group-item">
                      <b>Company Name:</b>
                      {stock.companyName}
                    </li>
                  </ul>
                </div>
              </div>
              <Link className="btn btn-primary my-2" to={"/"}>
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      );
}
