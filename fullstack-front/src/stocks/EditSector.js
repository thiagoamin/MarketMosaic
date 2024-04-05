import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { sanitizeInput } from "../security/SanitizeInput";

export default function EditSector() {
  let navigate = useNavigate();
  const alertPlaceholder = document.getElementById("liveAlertPlaceholder");

  const { id } = useParams();

  const [sector, setSector] = useState({
    sectorName: "",
    numOfCompanies: "",
    marketWeight: "",
  });

  const { sectorName, numOfCompanies, marketWeight } = sector;

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
    setSector({ ...sector, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const cleanSector = {
      sectorName: sanitizeInput(sector.sectorName),
      numOfCompanies: sanitizeInput(sector.numOfCompanies),
      marketWeight: sanitizeInput(sector.marketWeight),
    };
    if (
      !cleanSector.sectorName ||
      !cleanSector.numOfCompanies ||
      !cleanSector.marketWeight
    ) {
      appendAlert("Invalid Arguments. Try Again", "danger");
      return;
    }
    if (!/^\d+$/.test(cleanSector.numOfCompanies)) {
      appendAlert("Please Enter an Integer for Number of Companies.", "danger");
      return;
    }
    if (
      !/^[.0-9]+$/.test(cleanSector.marketWeight)
    ) {
      appendAlert(
        "Please Enter a number between 0 and 1 for market weight",
        "danger"
      );
      return;
    }

    await axios.put(`http://localhost:8080/sector/${id}`, sector).catch((e) => {
      appendAlert(
        "Duplicate values or invalid sector name given. Try again",
        "warning"
      );
      return;
    });
    appendAlert(
      "New Changes to Sector Made. Returning to Sectors List...",
      "success"
    );
    setTimeout(() => {
      navigate("/viewallsectors");
    }, 5000);
  };

  const loadSector = async () => {
    const result = await axios.get(`http://localhost:8080/sector/${id}`)
    setSector(result.data);
    console.log(sector)
  };

  useEffect(() => {
    loadSector();
  }, []);

  return (
    <div>
      <div id="liveAlertPlaceholder"></div>
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
            <h2 className="text-center m-4">Edit Sector</h2>

            <form onSubmit={(e) => onSubmit(e)}>
              <div className="mb-3">
                <label htmlFor="sectorName" className="form-label">
                  Sector Name
                </label>
                <input
                  type={"text"}
                  className="form-control"
                  placeholder="Enter Sector Name"
                  name="sectorName"
                  value={sectorName}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="numOfCompanies" className="form-label">
                  Number of Companies
                </label>
                <input
                  type={"text"}
                  className="form-control"
                  placeholder="Enter an Integer"
                  name="numOfCompanies"
                  value={numOfCompanies}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="marketWeight" className="form-label">
                  Market Weight
                </label>
                <input
                  type={"text"}
                  className="form-control"
                  placeholder="Enter a number between 0 and 1"
                  name="marketWeight"
                  value={marketWeight}
                  onChange={(e) => onInputChange(e)}
                />
              </div>
              <button type="submit" className="btn btn-outline-primary">
                Submit
              </button>
              <Link className="btn btn-outline-danger mx-2" to="/viewallsectors">
                Cancel
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
