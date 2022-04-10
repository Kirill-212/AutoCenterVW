import React, { useContext, useEffect } from "react";
import { TestDrivesApi, TestDriveDto } from "../../ImportExportGenClient";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import Context from "../../context";
import GetJwtToken from "../../Services/Jwt/GetJwtToken";

import { getDate } from "../ViewLists/SupportFunction";
const EmployeeListOrder = props => {
  const { user } = useContext(Context);
  const [MessageError, setMessageError] = React.useState("");
  const [listTestDrive, setListTestDrive] = React.useState([]);
  const [viewList, setViewList] = React.useState(false);
  async function GetTestDriveList() {
    setViewList(false);
    new TestDrivesApi().apiTestdrivesEmployeeGet(
      GetJwtToken(),
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
      setListTestDrive(response.body);
      setViewList(true);
    } else if (response.statusCode > 400) {
      setMessageError(JSON.parse(error.message)["error"]);
    }
  }

  function UpdateState(value, e) {
    console.log(value, e);
    let valueTestDrive = JSON.parse(value);
    console.log({
      body: new TestDriveDto(
        valueTestDrive.dateStart,
        valueTestDrive.time,
        valueTestDrive.email,
        valueTestDrive.vin
      )
    });
    if (valueTestDrive.state === "CANCEL") {
      new TestDrivesApi().apiTestdrivesCancelPut(
        GetJwtToken(),
        {
          body: new TestDriveDto(
            valueTestDrive.dateStart,
            valueTestDrive.time,
            valueTestDrive.email,
            valueTestDrive.vin
          )
        },
        CallbackRequestUpdate
      );
    } else {
      new TestDrivesApi().apiTestdrivesConfirmPut(
        GetJwtToken(),
        {
          body: new TestDriveDto(
            valueTestDrive.dateStart,
            valueTestDrive.time,
            valueTestDrive.email,
            valueTestDrive.vin
          )
        },
        CallbackRequestUpdate
      );
    }
  }

  function CallbackRequestUpdate(error, data, response) {
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
      GetTestDriveList();
    } else if (response.statusCode > 400) {
      setMessageError(JSON.parse(error.message)["error"]);
    }
  }

  function CheckState(value) {
    if (value === 0) {
      return "PENDING";
    } else if (value === 1) {
      return "CONFIRM";
    } else if (value === 2) {
      return "CANCEL";
    }
  }
  useEffect(() => {
    GetTestDriveList();
  }, []);
  return (
    <div className="container-md">
      <div className="row align-items-center">
        <p className="text-reset text-white">
          {MessageError}
        </p>
      </div>

      <div className="row mt-5 pt-5 align-items-center">
        {viewList &&
          listTestDrive.map(r => {
            console.log("r", r);
            if (
              r.user.email === listTestDrive[0].user.email &&
              r.car.vin === listTestDrive[0].car.vin &&
              r.totalCost === listTestDrive[0].totalCost
            )
              return (
                <Accordion>
                  <AccordionSummary
                    aria-controls="panel1d-content"
                    id="panel1d-header"
                  >
                    <Typography>
                      <div className="row d-flex flex-column">
                        <div className="col">
                          <p>
                            Vin: {r.car.vin}
                          </p>
                        </div>
                        <div className="col">
                          <p>
                            Email: {r.user.email}
                          </p>
                        </div>
                        <div className="col">
                          <p>
                            Date start:
                            {getDate(r.dateStart)}
                          </p>
                        </div>
                        <div className="col">
                          <p>
                            Hour: {r.time}
                          </p>
                        </div>
                      </div>
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      <div class="card">
                        <h5 class="card-header">
                          Information about test drive
                        </h5>
                        <div class="card-body">
                          <div className="row">
                            <div className="col text-right">State</div>
                            <div className="col-1 text-center">
                              <i class="fa-solid fa-arrow-right" />
                            </div>
                            <div className="col text-left">
                              {CheckState(r.stateTestDrive)}
                            </div>
                          </div>
                          <div className="row d-flex flex-column">
                            <div className="col text-center">
                              <h4> Information about user </h4>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col text-right">First name</div>
                            <div className="col-1 text-center">
                              <i class="fa-solid fa-arrow-right" />
                            </div>
                            <div className="col text-left">
                              {r.user.firstName}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col text-right">Last name</div>
                            <div className="col-1 text-center">
                              <i class="fa-solid fa-arrow-right" />
                            </div>
                            <div className="col text-left">
                              {r.user.lastName}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col text-right">Surname</div>
                            <div className="col-1 text-center">
                              <i class="fa-solid fa-arrow-right" />
                            </div>
                            <div className="col text-left">
                              {r.user.surname}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col text-right">Phone number</div>
                            <div className="col-1 text-center">
                              <i class="fa-solid fa-arrow-right" />
                            </div>
                            <div className="col text-left">
                              {r.user.phoneNumber}
                            </div>
                          </div>
                          <div className="row d-flex flex-column">
                            <div className="col text-center">
                              <h4> Information about car </h4>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col text-right">
                              Car mileage(km)
                            </div>
                            <div className="col-1 text-center">
                              <i class="fa-solid fa-arrow-right" />
                            </div>
                            <div className="col text-left">
                              {r.car.carMileage}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col text-right">
                              Cost(<i class="fa-solid fa-dollar-sign" />)
                            </div>
                            <div className="col-1 text-center">
                              <i class="fa-solid fa-arrow-right" />
                            </div>
                            <div className="col text-left">
                              {r.car.cost}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col text-right">
                              Date of realese car
                            </div>
                            <div className="col-1 text-center">
                              <i class="fa-solid fa-arrow-right" />
                            </div>
                            <div className="col text-left">
                              {getDate(r.car.dateOfRealeseCar)}
                            </div>
                          </div>
                          <div className="row d-flex flex-column">
                            <div className="col text-center">
                              <h4>Options </h4>
                            </div>
                          </div>
                          <div className="row ">
                            <div className="col text-right">
                              {CheckState(r.stateTestDrive) !== "CONFIRM" &&
                                <button
                                  class="btn btn-primary-sm btn-sm ml-1"
                                  onClick={e =>
                                    UpdateState(
                                      JSON.stringify({
                                        vin: r.car.vin,
                                        email: r.user.email,
                                        time: r.time,
                                        dateStart: r.dateStart,
                                        state: "CONFIRM"
                                      }),
                                      e
                                    )}
                                  type="button"
                                >
                                  <i class="fa-regular fa-circle-check" />
                                </button>}
                            </div>
                            <div className="col">
                              <button
                                class="btn btn-primary-sm btn-sm ml-1"
                                onClick={e =>
                                  UpdateState(
                                    JSON.stringify({
                                      vin: r.car.vin,
                                      email: r.user.email,
                                      time: r.time,
                                      dateStart: r.dateStart,
                                      state: "CANCEL"
                                    }),
                                    e
                                  )}
                                type="button"
                              >
                                <i class="fa-solid fa-ban" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              );
            return (
              <Accordion>
                <AccordionSummary
                  aria-controls={
                    r.user.email +
                    r.car.vin +
                    r.time +
                    r.dateStart +
                    "d-content"
                  }
                  id={
                    r.user.email + r.car.vin + r.time + r.dateStart + "d-header"
                  }
                >
                  <Typography>
                    <div className="row d-flex flex-column">
                      <div className="col">
                        <p>
                          Vin: {r.car.vin}
                        </p>
                      </div>
                      <div className="col">
                        <p>
                          Email: {r.user.email}
                        </p>
                      </div>
                      <div className="col">
                        <p>
                          Date start:
                          {getDate(r.dateStart)}
                        </p>
                      </div>
                      <div className="col">
                        <p>
                          Hour: {r.time}
                        </p>
                      </div>
                    </div>
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <div class="card">
                      <h5 class="card-header">Information about test drive</h5>
                      <div class="card-body">
                        <div className="row">
                          <div className="col text-right">State</div>
                          <div className="col-1 text-center">
                            <i class="fa-solid fa-arrow-right" />
                          </div>
                          <div className="col text-left">
                            {CheckState(r.stateTestDrive)}
                          </div>
                        </div>
                        <div className="row d-flex flex-column">
                          <div className="col text-center">
                            <h4> Information about user </h4>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col text-right">First name</div>
                          <div className="col-1 text-center">
                            <i class="fa-solid fa-arrow-right" />
                          </div>
                          <div className="col text-left">
                            {r.user.firstName}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col text-right">Last name</div>
                          <div className="col-1 text-center">
                            <i class="fa-solid fa-arrow-right" />
                          </div>
                          <div className="col text-left">
                            {r.user.lastName}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col text-right">Surname</div>
                          <div className="col-1 text-center">
                            <i class="fa-solid fa-arrow-right" />
                          </div>
                          <div className="col text-left">
                            {r.user.surname}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col text-right">Phone number</div>
                          <div className="col-1 text-center">
                            <i class="fa-solid fa-arrow-right" />
                          </div>
                          <div className="col text-left">
                            {r.user.phoneNumber}
                          </div>
                        </div>
                        <div className="row d-flex flex-column">
                          <div className="col text-center">
                            <h4> Information about car </h4>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col text-right">Car mileage(km)</div>
                          <div className="col-1 text-center">
                            <i class="fa-solid fa-arrow-right" />
                          </div>
                          <div className="col text-left">
                            {r.car.carMileage}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col text-right">
                            Cost(<i class="fa-solid fa-dollar-sign" />)
                          </div>
                          <div className="col-1 text-center">
                            <i class="fa-solid fa-arrow-right" />
                          </div>
                          <div className="col text-left">
                            {r.car.cost}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col text-right">
                            Date of realese car
                          </div>
                          <div className="col-1 text-center">
                            <i class="fa-solid fa-arrow-right" />
                          </div>
                          <div className="col text-left">
                            {getDate(r.car.dateOfRealeseCar)}
                          </div>
                        </div>
                        <div className="row d-flex flex-column">
                          <div className="col text-center">
                            <h4>Options </h4>
                          </div>
                        </div>
                        <div className="row ">
                          <div className="col text-right">
                            {CheckState(r.stateTestDrive) !== "CONFIRM" &&
                              <button
                                class="btn btn-primary-sm btn-sm ml-1"
                                onClick={e =>
                                  UpdateState(
                                    JSON.stringify({
                                      vin: r.car.vin,
                                      email: r.user.email,
                                      time: r.time,
                                      dateStart: r.dateStart,
                                      state: "CONFIRM"
                                    }),
                                    e
                                  )}
                                type="button"
                              >
                                <i class="fa-regular fa-circle-check" />
                              </button>}
                          </div>
                          <div className="col">
                            <button
                              class="btn btn-primary-sm btn-sm ml-1"
                              onClick={e =>
                                UpdateState(
                                  JSON.stringify({
                                    vin: r.car.vin,
                                    email: r.user.email,
                                    time: r.time,
                                    dateStart: r.dateStart,
                                    state: "CANCEL"
                                  }),
                                  e
                                )}
                              type="button"
                            >
                              <i class="fa-solid fa-ban" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Typography>
                </AccordionDetails>
              </Accordion>
            );
          })}
      </div>
    </div>
  );
};

export default EmployeeListOrder;