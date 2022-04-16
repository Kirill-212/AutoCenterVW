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
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { getDate } from "../ViewLists/SupportFunction";

const EmployeeListService = props => {
  const { user } = useContext(Context);
  const [MessageError, setMessageError] = React.useState("");
  const [listService, setListService] = React.useState([]);
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
    const filteredRows = listService.filter(row => {
      return row.car.vin.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setListService(filteredRows);
  };

  const search = e => {
    if (e.length === 0) {
      GetServiceList();
    } else {
      requestSearch(e);
    }
  };

  async function GetServiceList() {
    setViewList(false);
    handleToggle();
    if (user === undefined) {
      setMessageError("Unauthorized");
      handleClose();
      return;
    }
    new CarRepairsApi().apiCarrepairsEmployeeGet(
      GetJwtToken(),
      { email: JSON.parse(user).email },
      CallbackRequest
    );
  }

  function CallbackRequest(error, data, response) {
    if (response == undefined) {
      setMessageError("Error:server is not available");
    } else if (response.statusCode == 400) {
      if (response.body.errors !== undefined) {
        let errorResult = "";
        let errorsJson = response.body.errors;
        for (let key in response.body.errors) {
          errorResult += errorsJson[key] + " | ";
        }
        setMessageError(errorResult);
      } else {
        setMessageError(response.body.error);
      }
    } else if (response.statusCode == 403) {
      setMessageError("Forbidden");
    } else if (response.statusCode == 401) {
      setMessageError("Unauthorized");
    } else if (response.statusCode === 200 || response.statusCode === 204) {
      if (response.body.length == 0) {
        handleClose();
        setEmpty(true);
        return;
      }
      setEmpty(false);
      setListService(response.body);
      setViewList(true);
    } else if (response.statusCode > 400) {
     setMessageError(response.body.error);
    }
    handleClose();
  }

  function UpdateState(value, e) {
    let valueService = JSON.parse(value);
    if (valueService.state === "CANCEL") {
      handleToggle();
      if (user === undefined) {
        setMessageError("Unauthorized");
        handleClose();
        return;
      }
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
    } else if (valueService.state === "ENDWORK") {
      handleToggle();
      if (user === undefined) {
        setMessageError("Unauthorized");
        handleClose();
        return;
      }
      new CarRepairsApi().apiCarrepairsEndWorkPut(
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
      if (response.body.errors !== undefined) {
        let errorResult = "";
        let errorsJson = response.body.errors;
        for (let key in response.body.errors) {
          errorResult += errorsJson[key] + " | ";
        }
        setMessageError(errorResult);
      } else {
        setMessageError(response.body.error);
      }
    } else if (response.statusCode == 403) {
      setMessageError("Forbidden");
    } else if (response.statusCode == 401) {
      setMessageError("Unauthorized");
    } else if (response.statusCode === 200 || response.statusCode === 204) {
      GetServiceList();
    } else if (response.statusCode > 400) {
     setMessageError(response.body.error);
    }
    handleClose();
  }

  async function SendNotify(value, e) {
    e.preventDefault();
    handleToggle();
    new CarRepairsApi().apiCarrepairsSendNotificationPost(
      GetJwtToken(),
      { email: JSON.parse(value).email },
      CallbackRequestSendNotify
    );
  }

  function CallbackRequestSendNotify(error, data, response) {
    if (response == undefined) {
      setMessageError("Error:server is not available");
    } else if (response.statusCode == 400) {
      if (response.body.errors !== undefined) {
        let errorResult = "";
        let errorsJson = response.body.errors;
        for (let key in response.body.errors) {
          errorResult += errorsJson[key] + " | ";
        }
        setMessageError(errorResult);
      } else {
        setMessageError(response.body.error);
      }
    } else if (response.statusCode == 403) {
      setMessageError("Forbidden");
    } else if (response.statusCode == 401) {
      setMessageError("Unauthorized");
    } else if (response.statusCode === 200 || response.statusCode === 204) {
    } else if (response.statusCode > 400) {
     setMessageError(response.body.error);
    }
    handleClose();
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
        </div>
        {viewList &&
          listService.map(r => {
            console.log(
              "r",
              getDate(r.carRepair.endWork),
              getDate(new Date()),
              getDate(r.carRepair.endWork) === getDate(new Date())
            );
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
                            Start:
                            {r.carRepair.startWork === null
                              ? "None"
                              : getDate(r.carRepair.startWork)}
                          </p>
                        </div>
                        <div className="col">
                          <p>
                            End:
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
                      <div className="card">
                        <h5 className="card-header">
                          Information about car repair
                        </h5>
                        <div className="card-body">
                          <div className="row">
                            <div className="col text-right">Description</div>
                            <div className="col-1 text-center">
                              <i className="fa-solid fa-arrow-right" />
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
                              <i className="fa-solid fa-arrow-right" />
                            </div>
                            <div className="col text-left">
                              {r.carUser.firstName}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col text-right">Last name</div>
                            <div className="col-1 text-center">
                              <i className="fa-solid fa-arrow-right" />
                            </div>
                            <div className="col text-left">
                              {r.carUser.lastName}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col text-right">Surname</div>
                            <div className="col-1 text-center">
                              <i className="fa-solid fa-arrow-right" />
                            </div>
                            <div className="col text-left">
                              {r.carUser.surname}
                            </div>
                          </div>
                          <div className="row">
                            <div className="col text-right">Phone number</div>
                            <div className="col-1 text-center">
                              <i className="fa-solid fa-arrow-right" />
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
                          <div className="row d-grid gap-2 d-md-block">
                            <div className="col ">
                              <a
                                className="btn btn-primary-sm btn-sm m-2 text-reset "
                                href={`/clientcar/info?vin=${r.car.vin}
                          `}
                              >
                                <i className="fa-solid fa-info" />
                              </a>
                            </div>
                            <div className="col-1">
                              <button
                                className="btn btn-primary-sm btn-sm m-2"
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
                                <i className="fa-solid fa-ban" />
                              </button>
                            </div>
                            {CheckState(r.carRepair.stateCarRepair) ===
                              "PENDING" &&
                              <div className="col">
                                <a
                                  className="btn btn-primary-sm btn-sm m-2 text-reset "
                                  href={`/service/start?vin=${r.car.vin}
                        `}
                                >
                                  <i className="fa-solid fa-flag-checkered" />
                                </a>
                              </div>}

                            {getDate(r.carRepair.endWork) ===
                              getDate(new Date()) &&
                              <div>
                                <button
                                  className="btn btn-primary-sm btn-sm m-2"
                                  onClick={e =>
                                    UpdateState(
                                      JSON.stringify({
                                        vin: r.car.vin,
                                        state: "ENDWORK"
                                      }),
                                      e
                                    )}
                                  type="button"
                                >
                                  <i className="fa-solid fa-money-bill-1" />
                                </button>
                                <button
                                  className="btn btn-primary-sm btn-sm m-2"
                                  onClick={e =>
                                    SendNotify(
                                      JSON.stringify({
                                        email: r.carUser.email
                                      }),
                                      e
                                    )}
                                  type="button"
                                >
                                  <i className="fa-solid fa-bell" />
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
                          Start:
                          {r.carRepair.startWork === null
                            ? "None"
                            : getDate(r.carRepair.startWork)}
                        </p>
                      </div>
                      <div className="col">
                        <p>
                          End:
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
                    <div className="card">
                      <h5 className="card-header">
                        Information about car repair
                      </h5>
                      <div className="card-body">
                        <div className="row">
                          <div className="col text-right">Description</div>
                          <div className="col-1 text-center">
                            <i className="fa-solid fa-arrow-right" />
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
                            <i className="fa-solid fa-arrow-right" />
                          </div>
                          <div className="col text-left">
                            {r.carUser.firstName}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col text-right">Last name</div>
                          <div className="col-1 text-center">
                            <i className="fa-solid fa-arrow-right" />
                          </div>
                          <div className="col text-left">
                            {r.carUser.lastName}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col text-right">Surname</div>
                          <div className="col-1 text-center">
                            <i className="fa-solid fa-arrow-right" />
                          </div>
                          <div className="col text-left">
                            {r.carUser.surname}
                          </div>
                        </div>
                        <div className="row">
                          <div className="col text-right">Phone number</div>
                          <div className="col-1 text-center">
                            <i className="fa-solid fa-arrow-right" />
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
                          <div className="col text-right">Car mileage(km)</div>
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
                        <div className="row d-grid gap-2 d-md-block">
                          <div className="col">
                            <a
                              className="btn btn-primary-sm btn-sm m-2 text-reset "
                              href={`/clientcar/info?vin=${r.car.vin}
                          `}
                            >
                              <i className="fa-solid fa-info" />
                            </a>
                          </div>
                          <div className="col-1">
                            <button
                              className="btn btn-primary-sm btn-sm m-2"
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
                              <i className="fa-solid fa-ban" />
                            </button>
                          </div>
                          {CheckState(r.carRepair.stateCarRepair) ===
                            "PENDING" &&
                            <div className="col">
                              <a
                                className="btn btn-primary-sm btn-sm m-2 text-reset "
                                href={`/service/start?vin=${r.car.vin}
                        `}
                              >
                                <i className="fa-solid fa-flag-checkered" />
                              </a>
                            </div>}

                          {getDate(r.carRepair.endWork) ===
                            getDate(new Date()) &&
                            <div>
                              <button
                                className="btn btn-primary-sm btn-sm m-2"
                                onClick={e =>
                                  UpdateState(
                                    JSON.stringify({
                                      vin: r.car.vin,
                                      state: "ENDWORK"
                                    }),
                                    e
                                  )}
                                type="button"
                              >
                                <i className="fa-solid fa-money-bill-1" />
                              </button>
                              <button
                                className="btn btn-primary-sm btn-sm m-2"
                                onClick={e =>
                                  SendNotify(
                                    JSON.stringify({
                                      email: r.carUser.email
                                    }),
                                    e
                                  )}
                                type="button"
                              >
                                <i className="fa-solid fa-bell" />
                              </button>
                            </div>}
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

export default EmployeeListService;
