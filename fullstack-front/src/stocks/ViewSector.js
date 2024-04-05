import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewSector() {

    const [sector, setSector] = useState({
        sectorName: "",
        numOfCompanies: 0,
        marketWeight: 0,
    });

    const { id } = useParams();

    useEffect(() => {
        loadSector();
    }, []);

    const loadSector = async () => {
        const result = await axios.get(`http://localhost:8080/sector/${id}`);
        setSector(result.data);
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Sector Details</h2>

                    <div className="card">
                        <div className="card-header">
                            Details of Sector:
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <b>Sector Name: </b>
                                    {sector.sectorName}
                                </li>
                                <li className="list-group-item">
                                    <b>Number Of Companies: </b>
                                    {sector.numOfCompanies}
                                </li>
                                <li className="list-group-item">
                                    <b>Total Market Weight: </b>
                                    {sector.marketWeight}
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Link className="btn btn-primary my-2" to={"/viewallsectors"}>
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}