import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function ViewAllSectors() {
  const [sectors, setSectors] = useState([]);

  const { id } = useParams();
    useEffect(() => {
        loadSectors();
    }, []);

    const loadSectors = async () => {
        const result = await axios.get("http://localhost:8080/sectors");
        // const result = {
        //   data: [
        //     { sectorName: "TestSector", numOfCompanies: 240, marketWeight: 0.67 },
        //   ],
        // };
        setSectors(result.data);
    };

    const loadSectorsWithStocks = async () => {
        const result = await axios.get("http://localhost:8080/dividesectors");
        setSectors(result.data);
    };

    const deleteSector = async(id) => {
        await axios.delete(`http://localhost:8080/sector/${id}`)
        loadSectors()
    }

    return (
        <div className="container">
            <div className="container">
                <h1>Sectors</h1>
                <Link className="btn btn-primary mx-1" to="/addsector">
                    Add Sector
                </Link>
                <button className="btn btn-secondary mx-1" onClick={loadSectors}>Load All Sectors</button>
                <button className="btn btn-secondary mx-1" onClick={loadSectorsWithStocks}>Sectors With Stocks</button>
            </div>
            <div className="py-4">
                <table className="table border shadow">
                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Sector Name</th>
                        <th scope="col">Number of Companies</th>
                        <th scope="col">Overall Market Weight</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="table-group-divider">
                    {sectors.map((sector, index) => (
                        <tr key={sector.sectorName}>
                            <th scope="row" key={index}>
                                {index + 1}
                            </th>
                            <td>{sector.sectorName}</td>
                            <td>{sector.numOfCompanies}</td>
                            <td>{sector.marketWeight}</td>
                            <td>
                                <Link className="btn btn-primary mx-2" to={`/viewsector/${sector.sectorName}`}>View</Link>
                                <Link
                                    className="btn btn-outline-primary mx-2"
                                    to={`/editsector/${sector.sectorName}`}
                                >
                                    Edit
                                </Link>
                                <button className="btn btn-danger mx-2" onClick={()=>deleteSector(sector.sectorName)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}