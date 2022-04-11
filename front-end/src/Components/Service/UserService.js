import React, { useContext, useEffect } from "react";
import {
  CarRepairsApi,
  UpdateStateCarRepairDto
} from "../../ImportExportGenClient";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import Context from "../../context";
import GetJwtToken from "../../Services/Jwt/GetJwtToken";

import { getDate } from "../ViewLists/SupportFunction";
const EmployeeListService = props => {
  const { user } = useContext(Context);
  const [MessageError, setMessageError] = React.useState("");
  const [listService, setListService] = React.useState([]);
  const [viewList, setViewList] = React.useState(false);
  async function GetServiceList() {
    setViewList(false);
    new CarRepairsApi().apiCarrepairsUserGet(
      GetJwtToken(),
      { email: JSON.parse(user).email },
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
      setListService(response.body);
      setViewList(true);
    } else if (response.statusCode > 400) {
      setMessageError(JSON.parse(error.message)["error"]);
    }
  }

  function UpdateState(value, e) {
    console.log(value, e);
    let valueService = JSON.parse(value);
    if (valueService.state === "CANCEL") {
      new CarRepairsApi().apiCarrepairsCancelPut(
        GetJwtToken(),
        {
          body: new UpdateStateCarRepairDto(
            JSON.parse(user).email,
            valueService.vin
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
      GetServiceList();
    } else if (response.statusCode > 400) {
      setMessageError(JSON.parse(error.message)["error"]);
    }
  }

  function CheckState(value) {
    if (value === 0) {
      return "PENDING";
    } else if (value === 1) {
      return "STARTWORK";
    } else if (value === 2) {
      return "ENDWORK";
    } else if (value === 4) {
      return "CANCEL";
    }
  }
  useEffect(() => {
    GetServiceList();
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
          listService.map(r => {
            console.log("r", getDate(r.carRepair.endWork), getDate(new Date()));
            if (
              r.carUser.email === listService[0].carUser.email &&
              r.car.vin === listService[0].car.vin
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
                            Email: {r.carUser.email}
                          </p>
                        </div>
                        <div className="col">
                          <p>
                            State:
                            {CheckState(r.carRepair.stateCarRepair)}
                          </p>
                        </div>
                        <div className="col">
                          <p>
                            Start:{" "}
                            {r.carRepair.startWork === null
                              ? "None"
                              : getDate(r.carRepair.startWork)}
                          </p>
                        </div>
                        <div className="col">
                          <p>
                            End:{" "}
                            {r.carRepair.endWork === null
                              ? "None"
                              : getDate(r.carRepair.endWork)}
                          </p>
                        </div>
                      </div>
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      <div class="card">
                        <h5 class="card-header">
                          Information about car repair
                        </h5>
                        <div class="card-body">
                          <div className="row">
                            <div className="col text-right">Description</div>
                            <div className="col-1 text-center">
                              <i class="fa-solid fa-arrow-right" />
                            </div>
                            <div className="col text-left">
                              {r.carRepair.description}
                            </div>
                          </div>
                          <div className="row d-flex flex-column">
                            <div className="col text-center">
                              <h4> Information about car owner </h4>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col text-right">First name</div>
                            <div className="col-1 text-center">
                              <i class="fa-solid fa-arrow-right" />
                            </div>
                            <div className="col text-left">
                              {r.carUser.firstName}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col text-right">Last name</div>
                            <div className="col-1 text-center">
                              <i class="fa-solid fa-arrow-right" />
                            </div>
                            <div className="col text-left">
                              {r.carUser.lastName}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col text-right">Surname</div>
                            <div className="col-1 text-center">
                              <i class="fa-solid fa-arrow-right" />
                            </div>
                            <div className="col text-left">
                              {r.carUser.surname}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col text-right">Phone number</div>
                            <div className="col-1 text-center">
                              <i class="fa-solid fa-arrow-right" />
                            </div>
                            <div className="col text-left">
                              {r.carUser.phoneNumber}
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
                          <div className="row d-grid gap-2 d-md-block">
                            <div className="col m-1">
                              <a
                                className="btn btn-primary-sm btn-sm ml-1 text-reset "
                                href={`/clientcar/info?vin=${r.car.vin}
                          `}
                              >
                                <i class="fa-solid fa-info" />
                              </a>
                            </div>

                            {CheckState(r.carRepair.stateCarRepair) ===
                              "PENDING" &&
                              <div className="col">
                                {" "}<button
                                  class="btn btn-primary-sm btn-sm ml-1"
                                  onClick={e =>
                                    UpdateState(
                                      JSON.stringify({
                                        vin: r.car.vin,
                                        state: "CANCEL"
                                      }),
                                      e
                                    )}
                                  type="button"
                                >
                                  <i class="fa-solid fa-ban" />
                                </button>
                              </div>}
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
                  aria-controls={r.carUser.email + r.car.vin + "d-content"}
                  id={r.carUser.email + r.car.vin + "d-header"}
                />
                <AccordionDetails>
                  <Typography />
                </AccordionDetails>
              </Accordion>
            );
          })}
      </div>
    </div>
  );
};

export default EmployeeListService;
