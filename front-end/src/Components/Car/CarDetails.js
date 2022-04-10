import React, { useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import Context from "../../context";
import {
  PutCarDto,
  CarsApi,
  ImgDto,
  CarEquipmentApi
} from "../../ImportExportGenClient";
import GetJwtToken from "../../Services/Jwt/GetJwtToken";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { getDate } from "../ViewLists/SupportFunction";
const CarDetail = () => {
  const { user } = useContext(Context);
  const [flag, setFlag] = React.useState(false);
  const [MessageError, setMessageError] = React.useState("");
  const [detailCar, setDetailCar] = React.useState({});
  const [carEquipment, setCarEquipment] = React.useState({});

  async function GetCarByVin(vin) {
    setMessageError("");
    new CarsApi().apiCarsByVinGet(GetJwtToken(), { vin: vin }, CallbackRequest);
  }
  function CallbackRequest(error, data, response) {
    if (response == undefined) {
      setMessageError("Error:server is not available");
    } else if (response.statusCode == 400) {
      if (JSON.parse(error.message)["error"] == undefined) {
        let errorResult = "";
        let errorsJson = JSON.parse(error.message)["errors"];
        for (let key in errorsJson) {
          errorResult += key + " : " + errorsJson[key] + " | ";
        }
        setMessageError(errorResult);
      } else {
        setMessageError(JSON.parse(error.message)["error"]);
      }
    } else if (response.statusCode == 403) {
      setMessageError("Forbidden");
    } else if (response.statusCode == 401) {
      setMessageError("Unauthorized");
    } else if (response.statusCode === 200 || response.statusCode === 204) {
      console.log(response.body);
      setDetailCar(response.body);
      new CarEquipmentApi().apiCarequipmentsEquipmentIdGet(
        GetJwtToken(),
        response.body.idCarEquipment,
        CallbackRequestGetById
      );
    } else if (response.statusCode > 400) {
      setMessageError(JSON.parse(error.message)["error"]);
    }
  }
  function CallbackRequestGetById(error, data, response) {
    console.log(response);
    if (response == undefined) {
      setMessageError("Error:server is not available");
    } else if (response.statusCode == 400) {
      if (JSON.parse(error.message)["error"] == undefined) {
        let errorResult = "";
        let errorsJson = JSON.parse(error.message)["errors"];
        for (let key in errorsJson) {
          errorResult += key + " : " + errorsJson[key] + " | ";
        }
        setMessageError(errorResult);
      } else {
        setMessageError(JSON.parse(error.message)["error"]);
      }
    } else if (response.statusCode == 403) {
      setMessageError("Forbidden");
    } else if (response.statusCode == 401) {
      setMessageError("Unauthorized");
    } else if (response.statusCode === 200 || response.statusCode === 204) {
      console.log(response.body);
      setCarEquipment(response.body);
      setFlag(true);
    } else if (response.statusCode > 400) {
      setMessageError(JSON.parse(error.message)["error"]);
    }
  }
  function ViewCarEquipment() {
    let totalCost = detailCar.cost;
    let equipment = [];
    equipment.push(
      <div className="row m-3">
        <div className="col-2">
          <i className="fa-solid fa-angle-right text white mr-2" />
          Name car equipment
        </div>
        <div className="col-10 text-left text white">
          {carEquipment.name}
        </div>
      </div>
    );
    console.log("1", carEquipment.equipments[0]);
    carEquipment.equipments.forEach(el => {
      totalCost += el.equipmentItem.cost;
      equipment.push(
        <div className="row m-3">
          <div className="col-2">
            <i className="fa-solid fa-angle-right text white mr-2" />
            Name
          </div>
          <div className="col-10 text-left text white">
            {el.name}
          </div>
          <div className="row m-3">
            <div className="col-2">
              <i className="fa-solid fa-angle-right text white mr-2" />
              Value
            </div>
            <div className="col-10 text-left text white">
              {el.equipmentItem.value}
            </div>
          </div>
          <div className="row m-3">
            <div className="col-2">
              <i className="fa-solid fa-angle-right text white mr-2" />
              Cost($)
            </div>
            <div className="col-10 text-left text white">
              {el.equipmentItem.cost}
            </div>
          </div>
        </div>
      );
    });

    totalCost =
      detailCar.actionCar != null
        ? Number(totalCost * (100 - detailCar.actionCar.sharePercentage) / 100)
        : totalCost;
    equipment.push(
      <div className="row m-3">
        <div className="col-2">
          <i className="fa-solid fa-angle-right text white mr-2" />
          Total cost($)
        </div>
        <div className="col-10 text-left text white">
          {totalCost}
        </div>
      </div>
    );
    return equipment;
  }

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    GetCarByVin(query.get("vin"));
  }, []);
  let fl = true;
  return (
    <div className="container-md w-50 bg-dark text-white opacity-90">
      <div className="row align-items-center">
        <p className="text-reset text-white">
          {MessageError}
        </p>
      </div>
      <div className="row mt-5 pt-5 align-items-center ">
        <div className="col" />
        <div
          id="slider"
          className="col carousel slide carousel-fade carousel-dark justify-content-center align-self-center p-5 w-100 "
          data-mdb-ride="carousel"
        >
          <div className="carousel-inner">
            {flag &&
              detailCar.imgsCar.map(e => {
                if (fl) {
                  fl = !fl;
                  return (
                    <div className="carousel-item active ">
                      <img
                        src={e.url}
                        alt="..."
                        width="800"
                        heigth="600"
                        className="opacity-100"
                      />
                    </div>
                  );
                } else {
                  return (
                    <div className="carousel-item">
                      <img
                        src={e.url}
                        alt="..."
                        width="800"
                        heigth="600"
                        className="opacity-100"
                      />
                    </div>
                  );
                }
              })}
          </div>
          <button
            className="carousel-control-prev pt-5 pl-5 mt-5"
            type="button"
            data-mdb-target="#slider"
            data-mdb-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true" />
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next pt-5 pr-5 mt-5"
            type="button"
            data-mdb-target="#slider"
            data-mdb-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true" />
            <span className="visually-hidden">Next</span>
          </button>
        </div>
        <div className="col" />
        {flag &&
          <div className="card-body row w-50 ">
            <h4 className="card-title text-center">Information about car</h4>
            <div className="row m-3">
              <div className="col-2">
                <i className="fa-solid fa-angle-right text white mr-2" />
                Vin
              </div>
              <div className="col-10 text-left text white">
                {detailCar.vin}
              </div>
            </div>
            <div className="row m-3">
              <div className="col-2">
                <i className="fa-solid fa-angle-right text white mr-2" />
                Car mileage(km)
              </div>
              <div className="col-10 text-left text white">
                {detailCar.carMileage}
              </div>
            </div>
            <div className="row m-3">
              <div className="col-2">
                <i className="fa-solid fa-angle-right text white mr-2" />
                Cost($)
              </div>
              <div className="col-10 text-left text white">
                {detailCar.cost}
              </div>
            </div>
            <div className="row m-3">
              <div className="col-2">
                <i className="fa-solid fa-angle-right text white mr-2" />
                Date of realese car
              </div>
              <div className="col-10 text-left text white">
                {getDate(detailCar.dateOfRealeseCar)}
              </div>
            </div>
            <div className="row m-3">
              <div className="col-2">
                <i className="fa-solid fa-angle-right text white mr-2" />
                For sale
              </div>
              <div className="col-10 text-left text white">
                {detailCar.isActive === true && "True"}
                {detailCar.isActive !== true && "False"}
              </div>
            </div>
            <div className="row m-3">
              <div className="col-2">
                <i className="fa-solid fa-angle-right text white mr-2" />
                Share percentage
              </div>
              <div className="col-10 text-left text white">
                {detailCar.actionCar !== null &&
                  detailCar.actionCar.sharePercentage}
                {detailCar.actionCar === null && "None"}
              </div>
            </div>
            <h4 className="card-title text-center">
              Information about equipment
            </h4>
            {ViewCarEquipment()}
          </div>}
      </div>
    </div>
  );
};

export default CarDetail;
