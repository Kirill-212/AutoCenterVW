import React, { useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import Context from "../../context";
import {
  PutCarDto,
  ImgDto,
  ClientCarsApi,
  CarEquipmentApi
} from "../../ImportExportGenClient";
import GetJwtToken from "../../Services/Jwt/GetJwtToken";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { getDate } from "../ViewLists/SupportFunction";
const ClientCarDetail = () => {
  const { user } = useContext(Context);
  const [flag, setFlag] = React.useState(false);
  const [MessageError, setMessageError] = React.useState("");
  const [detailCar, setDetailCar] = React.useState({});
  const [detailUser, setDetailUser] = React.useState({});
  const [carEquipment, setCarEquipment] = React.useState({});
  const [registerNumber, setRegisterNumber] = React.useState("");
  async function GetCarByVin(vin) {
    setMessageError("");
    new ClientCarsApi().apiClientcarsVinGet(
      GetJwtToken(),
      { vin: vin },
      CallbackRequest
    );
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
      setRegisterNumber(response.body.registerNumber);
      setDetailCar(response.body.car);
      setDetailUser(response.body.user);
      new CarEquipmentApi().apiCarequipmentsEquipmentIdGet(
        GetJwtToken(),
        response.body.car.idCarEquipment,
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
    <React.Fragment>
      <CssBaseline />
      <Container fixed className="text-white">
        <Box sx={{ bgcolor: "black" }}>
          <div className="row">
            <p className="text-reset text-white">
              {MessageError}
            </p>
          </div>

          <div className=" row">
            <div className="col" />
            {flag &&
              <div className="d-flex  row">
                <h4 className="card-title text-center">
                  Information about user
                </h4>
                <div className="row m-3 d-flex flex-row justify-content-center">
                  <div className="col">
                    <i className="fa-solid fa-angle-right text white mr-2 ml-4" />
                    User Photo
                    <img
                      src={detailUser.urlPhoto}
                      className="rounded-circle ml-5"
                      width="200"
                      height="200"
                      alt="..."
                    />
                  </div>
                  <div className="col align-self-end">
                    <i className="fa-solid fa-angle-right text white mr-2" />
                    <label className="mr-2"> First name</label>
                    {detailUser.firstName}
                    <i className="ml-2 fa-solid fa-angle-right text white mr-2" />
                    <label className="mr-2"> Last name</label>
                    {detailUser.lastName}
                  </div>
                </div>
              </div>}
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
                            className=""
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
                            className=""
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
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next pt-5 pr-5 mt-5"
                type="button"
                data-mdb-target="#slider"
                data-mdb-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Next</span>
              </button>
            </div>
            <div className="col" />
            {flag &&
              <div className="card-body row">
                <h4 className="card-title text-center">
                  Information about car
                </h4>
                <div className="row m-3">
                  <div className="col-2">
                    <i className="fa-solid fa-angle-right text white mr-2" />
                    Register number
                  </div>
                  <div className="col-10 text-left text white">
                    {registerNumber === null && "None"}
                    {registerNumber !== null && registerNumber}
                  </div>
                </div>
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

            <div className="row  text-white text-center">
              <a
                className="text-reset text-white"
                href={"/" + JSON.parse(user).roleName.toLowerCase()}
              >
                Home
              </a>
            </div>
          </div>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default ClientCarDetail;
