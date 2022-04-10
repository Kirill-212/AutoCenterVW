import React, { useContext, useEffect } from "react";
import { OrdersApi, UpdateStateOrderDto } from "../../ImportExportGenClient";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import Context from "../../context";
import GetJwtToken from "../../Services/Jwt/GetJwtToken";

import { getDate } from "../ViewLists/SupportFunction";
const UserListOrder = props => {
  const { user } = useContext(Context);
  const [MessageError, setMessageError] = React.useState("");
  const [listOrders, setlistOrders] = React.useState([]);
  const [viewList, setViewList] = React.useState(false);
  async function GetOrderList() {
    setViewList(false);
    new OrdersApi().apiOrdersUserGet(
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
      setlistOrders(response.body);
      setViewList(true);
    } else if (response.statusCode > 400) {
      setMessageError(JSON.parse(error.message)["error"]);
    }
  }

  function UpdateState(value, e) {
    console.log(value, e);
    let valueOrder = JSON.parse(value);
    if (valueOrder.state === "CANCEL") {
      new OrdersApi().apiOrdersCancelPut(
        GetJwtToken(),
        {
          body: new UpdateStateOrderDto(
            valueOrder.vin,
            valueOrder.email,
            valueOrder.totalCost
          )
        },
        CallbackRequestUpdate
      );
    } else {
      new OrdersApi().apiOrdersConfirmPut(
        GetJwtToken(),
        {
          body: new UpdateStateOrderDto(
            valueOrder.vin,
            valueOrder.email,
            valueOrder.totalCost
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
      GetOrderList();
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
    } else if (value == 3) {
      return "PAID";
    }
  }
  useEffect(() => {
    GetOrderList();
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
          listOrders.map(r => {
            console.log("r", r);
            if (
              r.user.email === listOrders[0].user.email &&
              r.car.vin === listOrders[0].car.vin &&
              r.totalCost === listOrders[0].totalCost
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
                            Total cost(<i class="fa-solid fa-dollar-sign" />):
                            {r.totalCost}
                          </p>
                        </div>
                        <div className="col">
                          <p>
                            Email buyer: {r.user.email}
                          </p>
                        </div>
                      </div>
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      <div class="card">
                        <h5 class="card-header">Information about order</h5>
                        <div class="card-body">
                          <div className="row">
                            <div className="col text-right">State</div>
                            <div className="col-1 text-center">
                              <i class="fa-solid fa-arrow-right" />
                            </div>
                            <div className="col text-left">
                              {CheckState(r.state)}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col text-right">
                              Change register number
                            </div>
                            <div className="col-1 text-center">
                              <i class="fa-solid fa-arrow-right" />
                            </div>
                            <div className="col text-left">
                              {r.changeRegisterNumber === false
                                ? "False"
                                : "True"}
                            </div>
                          </div>
                          <div className="row d-flex flex-column">
                            <div className="col text-center">
                              <h4> Information about buyer </h4>
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
                              {CheckState(r.state) !== "CONFIRM" &&
                                <button
                                  class="btn btn-primary-sm btn-sm ml-1"
                                  onClick={e =>
                                    UpdateState(
                                      JSON.stringify({
                                        vin: r.car.vin,
                                        email: r.user.email,
                                        totalCost: r.totalCost,
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
                                      totalCost: r.totalCost,
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
                    r.user.email + r.car.vin + r.totalCost + "d-content"
                  }
                  id={r.user.email + r.car.vin + r.totalCost + "d-header"}
                >
                  <div className="row">
                    <div className="col">
                      <p>
                        {r.car.vin}
                      </p>
                    </div>
                    <div className="col">
                      <p>
                        {r.totalCost}
                      </p>
                    </div>
                    <div className="col">
                      <p>
                        {r.user.email}
                      </p>
                    </div>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    <div class="card">
                      <h5 class="card-header">Information about order</h5>
                      <div class="card-body">
                        <div className="row">
                          <div className="col text-right">State</div>
                          <div className="col-1 text-center">
                            <i class="fa-solid fa-arrow-right" />
                          </div>
                          <div className="col text-left">
                            {CheckState(r.state)}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col text-right">
                            Change register number
                          </div>
                          <div className="col-1 text-center">
                            <i class="fa-solid fa-arrow-right" />
                          </div>
                          <div className="col text-left">
                            {r.changeRegisterNumber === false
                              ? "False"
                              : "True"}
                          </div>
                        </div>
                        <div className="row d-flex flex-column">
                          <div className="col text-center">
                            <h4> Information about buyer </h4>
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
                            {CheckState(r.state) !== "CONFIRM" &&
                              <button
                                class="btn btn-primary-sm btn-sm ml-1"
                                onClick={e =>
                                  UpdateState(
                                    JSON.stringify({
                                      vin: r.car.vin,
                                      email: r.user.email,
                                      totalCost: r.totalCost,
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
                                    totalCost: r.totalCost,
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

export default UserListOrder;
