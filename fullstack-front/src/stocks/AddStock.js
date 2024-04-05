import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


export default function AddStock() {

    let navigate=useNavigate()

    const [stock, setStock]=useState({
        isin:"",
        symbol:"",
        marketCap:null,
        type:"",
        companyName:"",
    })

    const{isin, symbol, marketCap,type, companyName} = stock; // stock object

    const onInputChange= (e)=>{
        setStock({...stock, [e.target.name]:e.target.value});
    }

    const onSubmit= async (e)=>{
        e.preventDefault(); //makes sure link doesnt change when we press submit
        await axios.post("http://localhost:8080/stock", stock);
        navigate("/"); // go back to home once submission is completed
    }

  return (<div className="container">
    <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
            <h2 className="text-center m-4">
                Register Stock
            </h2>

            <form onSubmit={(e)=>onSubmit(e)}>

            <div className="mb-3">
                <label htmlFor="ISIN" className="form-label">
                    ISIN
                </label>
                <input 
                type={"text"}
                className="form-control"
                placeholder="Enter ISIN"
                name="isin"
                value={isin}
                onChange={(e)=>onInputChange(e)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="Symbol" className="form-label">
                    Symbol
                </label>
                <input 
                type={"text"}
                className="form-control"
                placeholder="Enter Symbol"
                name="symbol"
                value={symbol}
                onChange={(e)=>onInputChange(e)}/>
            </div>
            <div className="mb-3">
                <label htmlFor="Market Cap" className="form-label">
                    Market Cap
                </label>
                <input 
                type={"text"}
                className="form-control"
                placeholder="Enter Market Cap"
                name="marketCap"
                value={marketCap}
                onChange={(e)=>onInputChange(e)}/>
            </div>
            <div className="mb-3">
                <label htmlFor="Type" className="form-label">
                    Type
                </label>
                <input 
                type={"text"}
                className="form-control"
                placeholder="Enter Type"
                name="type"
                value={type}
                onChange={(e)=>onInputChange(e)}/>
            </div>
            <div className="mb-3">
                <label htmlFor="Company Name" className="form-label">
                    Company Name
                </label>
                <input 
                type={"text"}
                className="form-control"
                placeholder="Enter Company Name"
                name="companyName"
                value={companyName}
                onChange={(e)=>onInputChange(e)}/>
            </div>
            <button type="submit" className="btn btn-outline-primary">
                Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/">
                Cancel
            </Link>
            </form>
        </div>
    </div>

  </div>);
}
