import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export default function ViewCompany() {
  
  const [company, setCompany] = useState({
    name: "",
    employees: 0,
    revenue: 0,
    sectorName:""
  });

  const { id } = useParams();

  useEffect(() => {
    loadCompany();
  }, []);

  const loadCompany = async () => {
    const result = await axios.get(`http://localhost:8080/company/${id}`);
    setCompany(result.data);
  };
  
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Company Details</h2>

          <div className="card">
            <div className="card-header">
              Details of Company:
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <b>Company Name: </b>
                  {company.name}
                </li>
                <li className="list-group-item">
                  <b>Number Of Employees: </b>
                  {company.employees}
                </li>
                <li className="list-group-item">
                  <b>Revenue: </b>
                  {company.revenue}
                </li>
                <li className="list-group-item">
                  <b>Sector: </b>
                  {company.sectorName}
                </li>
              </ul>
            </div>
          </div>
          <Link className="btn btn-primary my-2" to={"/viewallcompanies"}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}