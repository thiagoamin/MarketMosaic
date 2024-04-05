import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { sanitizeInput } from "../security/SanitizeInput";

export default function AddCompany() {
  let navigate = useNavigate();
  const alertPlaceholder = document.getElementById("liveAlertPlaceholder");

  const [company, setCompany] = useState({
    name: "",
    employees: "",
    revenue: "",
    sector: "",
  });

  const { name, employees, revenue, sector } = company;

  const appendAlert = (message, type) => {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = [
      `<div class="alert alert-${type} alert-dismissible" role="alert">`,
      `   <div>${message}</div>`,
      '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
      "</div>",
    ].join("");

    const alertBox = wrapper.querySelector(".alert");
    const closeButton = wrapper.querySelector(".btn-close");

    closeButton.addEventListener("click", () => {
      alertBox.remove(); // Remove the alert box when the close button is clicked
    });

    alertPlaceholder.append(wrapper);
  };

  const onInputChange = (e) => {
    setCompany({ ...company, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const cleanCompany = {
      name: sanitizeInput(company.name),
      employees: sanitizeInput(company.employees),
      revenue: sanitizeInput(company.revenue),
      sector: sanitizeInput(company.sector),
    };

    if (
      !cleanCompany.name ||
      !cleanCompany.employees ||
      !cleanCompany.revenue ||
      !cleanCompany.sector
    ) {
      appendAlert("Invalid Arguments. Try Again", "danger");
      return;
    }
    if (!/^\d+$/.test(cleanCompany.employees)) {
      appendAlert("Please Enter an Integer for Number of Employees.", "danger");
      return;
    }
    if (!/^\d+$/.test(cleanCompany.revenue)) {
      appendAlert("Please Enter an Integer for Revenue.", "danger");
      return;
    }
    if (!/^[a-zA-Z]+$/.test(cleanCompany.sector)) {
      appendAlert(
        "Please Enter a Sector Name with No Special Characters",
        "danger"
      );
      return;
    }

    await axios
      .post("http://localhost:8080/company", company)
      .then(() => {
        appendAlert(
          "New Company Successfully Added. Returning to Companies List...",
          "success"
        );
        setTimeout(() => {
          navigate("/viewallcompanies");
        }, 5000);
      })
      .catch((e) => {
        appendAlert("Duplicate values or invalid sector name. Try again", "warning");
        return;
      });
  };

  return (
    <div className="container">
      <div id="liveAlertPlaceholder"></div>
      <div className="row">
        <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
          <h2 className="text-center m-4">Add Company</h2>

          <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
              <label htmlFor="sector" className="form-label">
                Company Name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter Company Name"
                name="name"
                value={name}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="numOfCompanies" className="form-label">
                Employees
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter a number"
                name="employees"
                value={employees}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="revenue" className="form-label">
                Revenue
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter a number"
                name="revenue"
                value={revenue}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="sector" className="form-label">
                Sector Name
              </label>
              <input
                type={"text"}
                className="form-control"
                placeholder="Enter a sector"
                name="sector"
                value={sector}
                onChange={(e) => onInputChange(e)}
              />
            </div>
            <button type="submit" className="btn btn-outline-primary">
              Submit
            </button>
            <Link className="btn btn-outline-danger mx-2" to="/viewallcompanies">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
