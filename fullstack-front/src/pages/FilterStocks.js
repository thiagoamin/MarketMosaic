import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import QueryResultsTable from "../components/QueryResultsTable";
import { sanitizeInput } from "../security/SanitizeInput";

export default function FilterStocks() {
  let queryString;
  // let queryResults;
  let selected = [];

  const [checkboxStates, setCheckboxStates] = useState({
    symbol: false,
    marketCap: false,
    type: false,
    isin: false,
  });

  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const [queryResults, setQueryResults] = useState(null);
  const [selectedColumns, setSelectedColumns] = useState(null);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    setCheckboxStates((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
    console.log("symbol: ", checkboxStates.symbol);
    console.log("market cap: ", checkboxStates.marketCap);
    console.log("type: ", checkboxStates.type);
    console.log("isin: ", checkboxStates.isin);
  };

  const handleGroupSubmit = async (event) => {
    setError("");
    event.preventDefault();
    selected.push("type");
    selected.push("market_cap");
    setSelectedColumns(selected);

    let queryString =
      "SELECT type, AVG(market_cap) as avg_market_cap FROM stock_view GROUP BY type HAVING AVG(market_cap) > 500000000000";

    // Send post request containing query to backend endpoint
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

  const handleNestedSubmit = async (event) => {
    // Get the max avg market cap value among all types
    setError("");
    event.preventDefault();
    selected.push("market_cap");
    setSelectedColumns(selected);

    let queryString =
      "SELECT MAX(avg_market_cap) AS max_average_market_cap FROM (SELECT AVG(market_cap) AS avg_market_cap FROM stock_view GROUP BY type) AS subquery";

    // Send post request containing query to backend endpoint
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

  const handleSubmit = async (event) => {
    setError("");
    // selected = [];
    event.preventDefault();
    console.log("Input Value:", inputValue);

    // todo: send query to backend
    if (checkboxStates.symbol) {
      selected.push("symbol");
    }

    if (checkboxStates.marketCap) {
      selected.push("market_cap");
    }

    if (checkboxStates.type) {
      selected.push("type");
    }

    if (checkboxStates.isin) {
      selected.push("isin");
    }
    if (inputValue.trim().length === 0) {
      console.log("selected: " + selected);
      setSelectedColumns(selected);
      queryString = "SELECT " + selected.join(", ") + " FROM stock_view";
    } else {
      console.log("selected: " + selected);
      setSelectedColumns(selected);
      queryString = "SELECT " + selected.join(", ") + " FROM stock_view WHERE ";
      const cleanInput = sanitizeInput(inputValue);
      console.log("CLEANED INPUT IS: " + cleanInput);
      if (!cleanInput) {
        setError("Error: Invalid user input");
        return;
      }
      queryString += inputValue;
    }

    console.log("query string is: ", queryString);

    // Send post request containing query to backend endpoint
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

  // todo: handle returning results

  const handleInputChange = (event) => {
    setInputValue(event.target.value); // Update state with input value
  };

  return (
    <div>
      <div className="col-12 text-center">
        <h2 className="pt-4">Filter Stocks</h2>
      </div>
      <h4>Choose columns to display:</h4>
      <form>
        <label className="me-3">
          Symbol
          <input
            name="symbol"
            type="checkbox"
            checked={checkboxStates.symbol}
            onChange={handleCheckboxChange}
          />
        </label>
        <label className="me-3">
          Market Cap
          <input
            name="marketCap"
            type="checkbox"
            checked={checkboxStates.marketCap}
            onChange={handleCheckboxChange}
          />
        </label>
        <label className="me-3">
          Type
          <input
            name="type"
            type="checkbox"
            checked={checkboxStates.type}
            onChange={handleCheckboxChange}
          />
        </label>
        <label className="me-3">
          ISIN
          <input
            name="isin"
            type="checkbox"
            checked={checkboxStates.isin}
            onChange={handleCheckboxChange}
          />
        </label>
      </form>
      <br />
      <br />
      <h4>Choose conditions to query (in the form: [Attribute] [operation such as as &lt; or =] [Value])</h4>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          className="mt-3 form-control"
          placeholder="Enter your query"
        />
      </div>

      <div className="mt-3">
        <button className="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <br />
      <br />
      <h4>Show types of stocks with average market cap over 500 billion:</h4>
      <div className="mt-3">
        <button className="btn btn-primary" onClick={handleGroupSubmit}>
          Submit
        </button>
      </div>
      <br />
      <br />
      <h4>Show max average market cap value among all types of stocks:</h4>
      <div className="mt-3">
        <button className="btn btn-primary" onClick={handleNestedSubmit}>
          Submit
        </button>
      </div>
      <br />
      <h3>Results:</h3>
      <QueryResultsTable
        queryResults={queryResults}
        selectedColumns={selectedColumns}
      />
    </div>
  );
}
