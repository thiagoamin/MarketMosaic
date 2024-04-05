import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import QueryResultsTable from "../components/QueryResultsTable";
import { sanitizeInput } from "../security/SanitizeInput";

export default function JoinStocks() {
  const [checkboxStates, setCheckboxStates] = useState({
    stock: false,
    company: false,
    sector: false,
  });

  const [error, setError] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [queryResults, setQueryResults] = useState(null);
  const [selectedColumns, setSelectedColumns] = useState([
    "symbol",
    "market_cap",
    "type",
    "company_name",
    "sector_name",
    "employees",
    "revenue",
  ]);
  const [operand, setOperand] = useState();
  const [column, setColumn] = useState();

  let queryString = "";

  let options = [
    { label: "", value: "" },
    { label: "Symbol", value: "symbol" },
    { label: "Market Capitalization", value: "market_cap" },
    { label: "Type", value: "type" },
    { label: "Company Name", value: "company_name" },
    { label: "Sector Name", value: "sector_name" },
    { label: "Employees", value: "employees" },
    { label: "Revenue", value: "revenue" },
  ];

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckboxStates((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    console.log("Submit");
    setError("");
    event.preventDefault();
    queryString =
      "SELECT symbol, market_cap, type, company_name, sector_name, employees, revenue FROM stock_view, company_operates_in WHERE company_name = name";
    const inputClean = sanitizeInput(inputValue);
    if (column && operand && inputClean) {
      queryString += " AND " + column + " " + operand + " " + inputClean;
    }
    console.log(inputClean);
    if (!inputClean) {
      setError("Error: Invalid user input");
      return;
    }

    console.log("Query String is: " + queryString);

    await axios
      .post("http://localhost:8080/customquery", queryString, {
        headers: {
          "Content-Type": "text/plain",
        },
      })
      .then((result) => {
        // set query results variable so we can access it later to add tables
        setQueryResults(result);
        console.log(result.data);
      })
      .catch((err) => {
        console.log("ERROR " + err);
        setError("Error: " + err);
      });
  };

  if (error)
    return (
      <div>
        There was an error with your query, please reload the page to try again.
      </div>
    );

  return (
    <div>
      <div className="col-12 text-center">
        <h2 className="pt-4">Advanced Queries on a Company's Stocks</h2>
      </div>
      <h3>Select conditions</h3>
      <div>
        <select
          className="form-select mt-3 form-control"
          value={column}
          onChange={(e) => setColumn(e.target.value)}
        >
          {options.map((option) => (
            <option value={option.value}> {option.label} </option>
          ))}
        </select>
      </div>
      <div>
        <select
          className="form-select mt-3 form-control"
          value={operand}
          onChange={(e) => setOperand(e.target.value)}
        >
          <option value={""}>{""}</option>
          <option value={"="}>{"="}</option>
          <option value={"<"}>{"<"}</option>
          <option value={">"}>{">"}</option>
          <option value={">="}>{">="}</option>
          <option value={"<="}>{"<="}</option>
        </select>
      </div>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="mt-3 form-control"
          placeholder="Enter your condition"
        />
      </div>
      <div className="mt-3">
        <button className="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </div>

      <h3>Resullts:</h3>
      <QueryResultsTable
        queryResults={queryResults}
        selectedColumns={selectedColumns}
      />
    </div>
  );
}
