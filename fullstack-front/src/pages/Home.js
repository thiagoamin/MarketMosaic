import React, { useEffect, useState } from 'react'
import axios from "axios";
import { Link, useParams } from 'react-router-dom';

export default function Home() {

    const [stocks, setStocks]=useState([])

    const {isin} = useParams()

    useEffect(()=>{
        loadStocks();
    },[])

    const loadStocks=async()=>{
        const result=await axios.get("http://localhost:8080/stocks")
        setStocks(result.data);
    }

    const deleteStock= async (isin) => {
        await axios.delete(`http://localhost:8080/stock/${isin}`);
        loadStocks();
    }

    return (
        <div className='container'>
            <div className="container">
                <h1>Stocks</h1>
                <Link className="btn btn-primary mx-1" to="/addstock">
                    Add Stock
                </Link>
            </div>
            <div className='py-4'>
                <table class="table border shadow">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">ISIN</th>
                            <th scope="col">Symbol</th>
                            <th scope="col">Market Cap</th>
                            <th scope="col">Type</th>
                            <th scope="col">Company</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            stocks.map((stock, index)=>(
                                <tr>
                                <th scope="row" key={index}>{index+1}</th>
                                <td>{stock.isin}</td>
                                <td>{stock.symbol}</td>
                                <td>{stock.marketCap}</td>
                                <td>{stock.type}</td>
                                <td>{stock.companyName}</td>
                                <td>
                                    <Link className="btn btn-primary mx-2" to={`/viewstock/${stock.isin}`}>View</Link>
                                    <Link className="btn btn-outline-primary mx-2" to={`/editstock/${stock.isin}`}>Edit</Link>
                                    <button className="btn btn-danger mx-2" onClick={()=>deleteStock(stock.isin)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                            ))
                        }

                    </tbody>
                </table>

            </div>

        </div>
    )
}
