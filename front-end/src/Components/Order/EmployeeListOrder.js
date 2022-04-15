import React, { useEffect } from "react";
import { OrdersApi, UpdateStateOrderDto } from "../../ImportExportGenClient";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import GetJwtToken from "../../Services/Jwt/GetJwtToken";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { getDate } from "../ViewLists/SupportFunction";

const EmployeeListOrder = props => {
  const [MessageError, setMessageError] = React.useState("");
  const [listCars, setListCars] = React.useState([]);
  const [viewList, setViewList] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [empty, setEmpty] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  const requestSearch = searchedVal => {
    const filteredRows = listCars.filter(row => {
      return row.car.vin.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setListCars(filteredRows);
  };

  const search = e => {
    if (e.length === 0) {
      GetOrderList();
    } else {
      requestSearch(e);
    }
  };

  async function GetOrderList() {
    setViewList(false);
    handleToggle();
    new OrdersApi().apiOrdersEmployeeGet(GetJwtToken(), CallbackRequest);
  }

  function CallbackRequest(error, data, response) {
    if (response == undefined) {
      setMessageError("Error:server is not available");
    } else if (response.statusCode == 400) {
      if (JSON.parse(error.message)["error"] == undefined) {
        let errorResult = "";
        let errorsJson = JSON.parse(error.message)["errors"];
        for (let key in errorsJson) {
          errorResult += errorsJson[key] + " | ";
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
      if (response.body.length == 0) {
        handleClose();
        setEmpty(true);
        return;
      }
      setEmpty(false);
      setListCars(response.body);
      setViewList(true);
    } else if (response.statusCode > 400) {
      setMessageError(JSON.parse(error.message)["error"]);
    }
    handleClose();
  }

  function UpdateState(value, e) {
    let valueOrder = JSON.parse(value);
    if (valueOrder.state === "CANCEL") {
      handleToggle();
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
      handleToggle();
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
          errorResult += errorsJson[key] + " | ";
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
    handleClose();
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

  let style = { width: "30rem" };

  if (empty) return <div>No data</div>;

  return (
    <div className="container-md">
      <div style={style} className=" row text-wrap  text-reset text-white">
        <Backdrop
          sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        {MessageError}
      </div>

      <div className="row mt-5 pt-5 align-items-center">
        <div className="row mt-2  ">
          <div className="input-group rounded w-25">
            <input
              type="search"
              className="form-control rounded"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="search-addon"
              onChange={e => search(e.target.value)}
            />
            <span className="input-group-text border-0" id="search-addon">
              <i className="fas fa-search" />
            </span>
          </div>
          {viewList &&
            listCars.map(r => {
              if (
                r.user.email === listCars[0].user.email &&
                r.car.vin === listCars[0].car.vin &&
                r.totalCost === listCars[0].totalCost
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
                              Total cost(<i className="fa-solid fa-dollar-sign" />):
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
                        <div className="card">
                          <h5 className="card-header">
                            Information about order
                          </h5>
                          <div className="card-body">
                            <div className="row">
                              <div className="col text-right">State</div>
                              <div className="col-1 text-center">
                                <i className="fa-solid fa-arrow-right" />
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
                                <i className="fa-solid fa-arrow-right" />
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
                                <i className="fa-solid fa-arrow-right" />
                              </div>
                              <div className="col text-left">
                                {r.user.firstName}
                              </div>
                            </div>
                            <div className="row">
                              <div className="col text-right">Last name</div>
                              <div className="col-1 text-center">
                                <i className="fa-solid fa-arrow-right" />
                              </div>
                              <div className="col text-left">
                                {r.user.lastName}
                              </div>
                            </div>
                            <div className="row">
                              <div className="col text-right">Surname</div>
                              <div className="col-1 text-center">
                                <i className="fa-solid fa-arrow-right" />
                              </div>
                              <div className="col text-left">
                                {r.user.surname}
                              </div>
                            </div>
                            <div className="row">
                              <div className="col text-right">Phone number</div>
                              <div className="col-1 text-center">
                                <i className="fa-solid fa-arrow-right" />
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
                                <i className="fa-solid fa-arrow-right" />
                              </div>
                              <div className="col text-left">
                                {r.car.carMileage}
                              </div>
                            </div>
                            <div className="row">
                              <div className="col text-right">
                                Cost(<i className="fa-solid fa-dollar-sign" />)
                              </div>
                              <div className="col-1 text-center">
                                <i className="fa-solid fa-arrow-right" />
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
                                <i className="fa-solid fa-arrow-right" />
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
                                    className="btn btn-primary-sm btn-sm ml-1"
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
                                    <i className="fa-regular fa-circle-check" />
                                  </button>}
                              </div>
                              <div className="col">
                                <button
                                  className="btn btn-primary-sm btn-sm ml-1"
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
                                  <i className="fa-solid fa-ban" />
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
                    <Typography>
                      <div className="row d-flex flex-column">
                        <div className="col">
                          <p>
                            Vin: {r.car.vin}
                          </p>
                        </div>
                        <div className="col">
                          <p>
                            Total cost(<i className="fa-solid fa-dollar-sign" />):
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
                      <div className="card">
                        <h5 className="card-header">Information about order</h5>
                        <div className="card-body">
                          <div className="row">
                            <div className="col text-right">State</div>
                            <div className="col-1 text-center">
                              <i className="fa-solid fa-arrow-right" />
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
                              <i className="fa-solid fa-arrow-right" />
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
                              <i className="fa-solid fa-arrow-right" />
                            </div>
                            <div className="col text-left">
                              {r.user.firstName}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col text-right">Last name</div>
                            <div className="col-1 text-center">
                              <i className="fa-solid fa-arrow-right" />
                            </div>
                            <div className="col text-left">
                              {r.user.lastName}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col text-right">Surname</div>
                            <div className="col-1 text-center">
                              <i className="fa-solid fa-arrow-right" />
                            </div>
                            <div className="col text-left">
                              {r.user.surname}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col text-right">Phone number</div>
                            <div className="col-1 text-center">
                              <i className="fa-solid fa-arrow-right" />
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
                              <i className="fa-solid fa-arrow-right" />
                            </div>
                            <div className="col text-left">
                              {r.car.carMileage}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col text-right">
                              Cost(<i className="fa-solid fa-dollar-sign" />)
                            </div>
                            <div className="col-1 text-center">
                              <i className="fa-solid fa-arrow-right" />
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
                              <i className="fa-solid fa-arrow-right" />
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
                                  className="btn btn-primary-sm btn-sm ml-1"
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
                                  <i className="fa-regular fa-circle-check" />
                                </button>}
                            </div>
                            <div className="col">
                              <button
                                className="btn btn-primary-sm btn-sm ml-1"
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
                                <i className="fa-solid fa-ban" />
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
    </div>
  );
};

export default EmployeeListOrder;
