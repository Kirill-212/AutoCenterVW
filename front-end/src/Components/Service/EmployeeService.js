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
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";

const EmployeeListService = props => {
  const { user } = useContext(Context);
  const [listService, setListService] = React.useState([]);
  const [list, setList] = React.useState([]);
  const [vin, setVin] = React.useState("");
  const [flagFilters, setFlagFilters] = React.useState(true)
  const [viewList, setViewList] = React.useState(false);
  const [empty, setEmpty] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [state, setState] = React.useState("");
  const [dateStart, setDateStart] = React.useState("");
  const [dateEnd, setDateEnd] = React.useState("");

  const requestSearch = (searchedVal, data) => {
    let filteredRows;
    if (data !== null) {
      if (searchedVal.length == 0) {
        filteredRows = data;
      }
      else {
        filteredRows = data.filter(row => {
          return row.car.vin.toLowerCase().includes(searchedVal.toLowerCase());
        });
      }
    } else {
      filteredRows = listService.filter(row => {
        return row.car.vin.toLowerCase().includes(searchedVal.toLowerCase());
      });
    }
    setListService(filteredRows);
  };

  const search = e => {
    if (e.length === 0) {
      setVin("")
      setListService(list);
    } else {
      setVin(e);
      requestSearch(e, null);
    }
  };

  async function GetServiceList() {
    setViewList(false);
    props.handleToggle();
    if (user === undefined) {
      props.setMessageError("Error:Unauthorized");
      props.handleClose();
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
      props.setMessageError("Error:Server is not available");
    } else if (response.statusCode == 400) {
      if (response.body.errors !== undefined) {
        let errorResult = [];
        let errorsJson = response.body.errors;
        for (let key in response.body.errors) {
          errorResult.push(<>{errorsJson[key]} <br></br> </>);
        }
        props.setMessageError(errorResult);
      } else {
        props.setMessageError(response.body.error);
      }
    } else if (response.statusCode == 403) {
      props.setMessageError("Error:Forbidden");
    } else if (response.statusCode == 401) {
      props.setMessageError("Error:Unauthorized");
    } else if (response.statusCode === 200 || response.statusCode === 204) {
      if (response.body.length == 0) {
        props.handleClose();
        setEmpty(true);
        return;
      }
      setList(response.body)
      setEmpty(false);
      setListService(response.body);
      setViewList(true);
    } else if (response.statusCode > 400) {
      props.setMessageError(response.body.error);
    }
    props.handleClose();
  }

  function UpdateState(value, e) {
    let valueService = JSON.parse(value);
    if (valueService.state === "CANCEL") {
      props.handleToggle();
      if (user === undefined) {
        props.setMessageError("Error:Unauthorized");
        props.handleClose();
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
      props.handleToggle();
      if (user === undefined) {
        props.setMessageError("Error:Unauthorized");
        props.handleClose();
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
      props.setMessageError("Error:Server is not available");
    } else if (response.statusCode == 400) {
      if (response.body.errors !== undefined) {
        let errorResult = [];
        let errorsJson = response.body.errors;
        for (let key in response.body.errors) {
          errorResult.push(<>{errorsJson[key]} <br></br> </>);
        }
        props.setMessageError(errorResult);
      } else {
        props.setMessageError(response.body.error);
      }
    } else if (response.statusCode == 403) {
      props.setMessageError("Error:Forbidden");
    } else if (response.statusCode == 401) {
      props.setMessageError("Error:Unauthorized");
    } else if (response.statusCode === 200 || response.statusCode === 204) {
      GetServiceList();
    } else if (response.statusCode > 400) {
      props.setMessageError(response.body.error);
    }
    props.handleClose();
  }

  async function SendNotify(value, e) {
    e.preventDefault();
    props.handleToggle();
    new CarRepairsApi().apiCarrepairsSendNotificationPost(
      GetJwtToken(),
      { email: JSON.parse(value).email },
      CallbackRequestSendNotify
    );
  }

  function CallbackRequestSendNotify(error, data, response) {
    if (response == undefined) {
      props.setMessageError("Error:Server is not available");
    } else if (response.statusCode == 400) {
      if (response.body.errors !== undefined) {
        let errorResult = [];
        let errorsJson = response.body.errors;
        for (let key in response.body.errors) {
          errorResult.push(<>{errorsJson[key]} <br></br> </>);
        }
        props.setMessageError(errorResult);
      } else {
        props.setMessageError(response.body.error);
      }
    } else if (response.statusCode == 403) {
      props.setMessageError("Error:Forbidden");
    } else if (response.statusCode == 401) {
      props.setMessageError("Error:Unauthorized");
    } else if (response.statusCode === 200 || response.statusCode === 204) {
    } else if (response.statusCode > 400) {
      props.setMessageError(response.body.error);
    }
    props.handleClose();
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

  function ReturnStateByName(value) {
    if (value === "PENDING") {
      return 0;
    } else if (value === "STARTWORK") {
      return 1;
    }
  }

  const Search = () => {
    let filteredRows;
    if (vin.length !== 0) {
      filteredRows = list.filter(row => {
        return row.car.vin.toLowerCase().includes(vin.toLowerCase());
      });
    } else {
      filteredRows = list;
    }
    if (state.length !== 0) {
      filteredRows = filteredRows.filter(row => {
        if (row.carRepair.stateCarRepair === ReturnStateByName(state)) return row;
      });
    } if (email.length !== 0) {
      filteredRows = filteredRows.filter(row => {
        return row.emp.email.toLowerCase().includes(email.toLowerCase());
      });
    }
    if (dateEnd.length !== 0) {
      filteredRows = filteredRows.filter(row => {
        if (getDate(row.carRepair.endWork) === getDate(dateEnd)) return true
      });
    }
    if (dateStart.length !== 0) {
      filteredRows = filteredRows.filter(row => {
        if (getDate(row.carRepair.startWork) === getDate(dateStart)) return true
      });
    }
    setListService(filteredRows);
  };

  function OpenFilters() {
    setFlagFilters(!flagFilters)
  }

  function handleClickFilters() {
    setEmail("")
    setState("")
    setDateEnd("")
    setDateStart("")
    requestSearch(vin, list);
  }

  if (empty){ 
    props.setMesInfo("You do not have car repairs")
    return (
  <div>
  </div>)}

  return (
    <div className="container-md">
      <div className="row mt-5 pt-5 align-items-center">
        <div className="row mt-2 mb-1 ">
          <div className="col-3">
            <div className="input-group rounded w-100">
              <input
                type="search"
                className="form-control rounded"
                placeholder="Search by vin"
                aria-label="Search"
                value={vin}
                aria-describedby="search-addon"
                onChange={e => search(e.target.value)}
              />
              <span className="input-group-text border-0" id="search-addon">
                <i className="fas fa-search" />
              </span>
            </div>
          </div>
          <div className="col">
            <button
              onClick={OpenFilters}
              className="btn btn-secondary btn-rounded"
            >
              More filters...
            </button>
          </div>
          <div className="row m-2 p-2 bg-white text-black" hidden={flagFilters}>
            <div className="row">
              <div className="col-5">
                <div className="input-group rounded w-100">
                  <input
                    type="search"
                    className="form-control rounded"
                    placeholder="Search by email employee"
                    aria-label="Search"
                    aria-describedby="search-addon"
                    onChange={e => setEmail(e.target.value)}
                    value={email}
                  />
                  <span className="input-group-text border-0" id="search-addon">
                    <i className="fas fa-search" />
                  </span>
                </div>
              </div>
              <div className="col-2">
                <button
                  onClick={handleClickFilters}
                  className="btn btn-secondary btn-rounded"
                >
                  Cancel filters
                </button>
              </div>
              <div className="col-2">
                <button
                  onClick={Search}
                  className="btn btn-secondary btn-rounded"
                >
                  Search
                </button>
              </div>
            </div>
            <div className="row">
            <div className="col">
                <div className="form-group d-flex">
                  <label className="w-25">State:</label>
                  <select aria-label="Default select example" className=" form-select" value={state} onChange={e => setState(e.target.value)}>
                    <option value="" selected>All</option>
                    <option value="PENDING">PENDING</option>
                    <option value="STARTWORK">START WORK</option>
                  </select>
                </div>
              </div>
              <div className="col">
                <label >Date end work:</label>
                <input
                  className="ml-2 w-50 shadow-lg  bg-white rounded"
                  onChange={e => setDateEnd(e.target.value)}
                  value={dateEnd}
                  type="date"
                  required
                />
              </div>
              <div className="col">
                <label >Date start work:</label>
                <input
                  className="ml-2 w-50 shadow-lg  bg-white rounded"
                  onChange={e => setDateStart(e.target.value)}
                  value={dateStart}
                  type="date"
                  required
                />
              </div>
            </div>

          </div>
        </div>
        {viewList &&
          listService.map(r => {
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
                            <div className="d-grid gap-2 d-md-block text-center">
                              <Tooltip
                                disableFocusListener
                                disableTouchListener
                                title="Get more information about car"
                                arrow
                                className="mr-1 ml-1"
                              >
                                <Link
                                  className="btn btn-primary-sm btn-sm m-2 text-reset "
                                  to={`/clientcar/info?vin=${r.car.vin}
                          `}
                                >
                                  <i className="fa-solid fa-info" />
                                </Link>
                              </Tooltip>
                              <Tooltip
                                disableFocusListener
                                disableTouchListener
                                title="Cancel car repair"
                                arrow
                                className="mr-1 ml-1"
                              >
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
                              </Tooltip>
                              {CheckState(r.carRepair.stateCarRepair) ===
                                "PENDING" &&
                                <Tooltip
                                  disableFocusListener
                                  disableTouchListener
                                  title="Start car repair"
                                  arrow
                                  className="mr-1 ml-1"
                                >
                                  <Link
                                    className="btn btn-primary-sm btn-sm m-2 text-reset "
                                    to={`/service/start?vin=${r.car.vin}
                        `}
                                  >
                                    <i className="fa-solid fa-flag-checkered" />
                                  </Link></Tooltip>
                              }

                              {getDate(r.carRepair.endWork) ===
                                getDate(new Date()) &&
                                <>
                                  <Tooltip
                                    disableFocusListener
                                    disableTouchListener
                                    title="End work car repair"
                                    arrow
                                    className="mr-1 ml-1"
                                  >
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
                                    </button></Tooltip>
                                  <Tooltip
                                    disableFocusListener
                                    disableTouchListener
                                    title="Send notify"
                                    arrow
                                    className="mr-1 ml-1"
                                  >
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
                                    </button></Tooltip>
                                </>}
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
                        <div className="row ">
                          <div className="d-grid gap-2 d-md-block text-center">
                            <Tooltip
                              disableFocusListener
                              disableTouchListener
                              title="Get more information about car"
                              arrow
                              className="mr-1 ml-1"
                            >
                              <Link
                                className="btn btn-primary-sm btn-sm m-2 text-reset "
                                to={`/clientcar/info?vin=${r.car.vin}
                          `}
                              >
                                <i className="fa-solid fa-info" />
                              </Link>
                            </Tooltip>
                            <Tooltip
                              disableFocusListener
                              disableTouchListener
                              title="Cancel car repair"
                              arrow
                              className="mr-1 ml-1"
                            >
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
                            </Tooltip>
                            {CheckState(r.carRepair.stateCarRepair) ===
                              "PENDING" &&
                              <Tooltip
                                disableFocusListener
                                disableTouchListener
                                title="Start car repair"
                                arrow
                                className="mr-1 ml-1"
                              >
                                <Link
                                  className="btn btn-primary-sm btn-sm m-2 text-reset "
                                  to={`/service/start?vin=${r.car.vin}
                        `}
                                >
                                  <i className="fa-solid fa-flag-checkered" />
                                </Link></Tooltip>
                            }

                            {getDate(r.carRepair.endWork) ===
                              getDate(new Date()) &&
                              <>
                                <Tooltip
                                  disableFocusListener
                                  disableTouchListener
                                  title="End work car repair"
                                  arrow
                                  className="mr-1 ml-1"
                                >
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
                                  </button></Tooltip>
                                <Tooltip
                                  disableFocusListener
                                  disableTouchListener
                                  title="Send notify"
                                  arrow
                                  className="mr-1 ml-1"
                                >
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
                                  </button></Tooltip>
                              </>}
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

export default EmployeeListService;
