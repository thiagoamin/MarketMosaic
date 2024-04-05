import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

export default function ViewAllCompanies() {
  const [companies, setCompanies] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    const result = await axios.get("http://localhost:8080/companies");
    setCompanies(result.data);
  };

  const deleteCompany = async (id) => {
    await axios.delete(`http://localhost:8080/company/${id}`);
    loadCompanies();
  };

  return (
    <div className="container">
      <div className="container">
        <h1>Companies</h1>
        <Link className="btn btn-primary mx-1" to="/addcompany">
          Add Company
        </Link>
      </div>
      <div className="py-4">
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Company Name</th>
              <th scope="col">Number of Employees</th>
              <th scope="col">Revenue</th>
              <th scope="col">Sector</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {companies.map((company, index) => (
              <tr key={index}>
                {" "}
                {/* Moved the key prop to the outermost element */}
                <th scope="row">{index + 1}</th>
                <td>{company.name}</td>
                <td>{company.employees}</td>
                <td>{company.revenue}</td>
                <td>{company.sector}</td>
                <td>
                  <Link
                    className="btn btn-primary mx-2"
                    to={`/viewcompany/${company.name}`}
                  >
                    View
                  </Link>
                  <Link
                    className="btn btn-outline-primary mx-2"
                    to={`/editcompany/${company.name}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-danger mx-2"
                    onClick={() => deleteCompany(company.name)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
