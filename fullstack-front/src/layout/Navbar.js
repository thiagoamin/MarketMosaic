import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            Market Mozaic
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <Link className="btn" to="/viewallsectors">
            View Sectors
          </Link>

          <Link className="btn" to="/viewallcompanies">
            View Companies
          </Link>

          {/* <Link className="btn" to="/addstock">
            Add Stock
          </Link>

          <Link className="btn" to="/addsector">
            Add Sector
          </Link>

          <Link className="btn" to="/addcompany">
            Add Company
          </Link> */}

          <Link className="btn" to="/filterstocks">
            Filter Stocks
          </Link>
          <Link className="btn" to="/companystocks">
            Company Stock
          </Link>
        </div>
      </nav>
    </div>
  );
}
