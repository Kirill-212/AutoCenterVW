import React, { useContext, useEffect } from "react";
import { OrdersApi, UpdateStateOrderDto } from "../../ImportExportGenClient";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import Context from "../../context";
import GetJwtToken from "../../Services/Jwt/GetJwtToken";
import { getDate } from "../ViewLists/SupportFunction";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";

const UserListOrder = props => {
  const { user } = useContext(Context);
  const [listOrders, setlistOrders] = React.useState([]);
  const [viewList, setViewList] = React.useState(false);
  const [empty, setEmpty] = React.useState(false);
  const [flagFilters, setFlagFilters] = React.useState(true)
  const [list, setList] = React.useState([]);
  const [emailBuyer, setEmailBuyer] = React.useState("");
  const [state, setState] = React.useState("");
  const [vin, setVin] = React.useState("");

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
      filteredRows = listOrders.filter(row => {
        return row.car.vin.toLowerCase().includes(searchedVal.toLowerCase());
      });
    }
    setlistOrders(filteredRows);
  };

  const search = e => {
    if (e.length === 0) {
      setVin("")
      setlistOrders(list);
    } else {
      setVin(e);
      requestSearch(e, null);
    }
  };

  async function GetOrderList() {
    setViewList(false);
    props.handleToggle();
    if (user === undefined) {
      props.setMessageError("Error:Unauthorized");
      props.handleClose();
      return;
    }
    new OrdersApi().apiOrdersUserGet(
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
      setEmpty(false);
      setList(response.body);
      setlistOrders(response.body);
      setViewList(true);
    } else if (response.statusCode > 400) {
      props.setMessageError(response.body.error);
    }
    props.handleClose();
  }

  function UpdateState(value, e) {
    let valueOrder = JSON.parse(value);
    if (user === undefined) {
      props.setMessageError("Error:Unauthorized");
      props.handleClose();
      return;
    }
    if (valueOrder.state === "CANCEL") {
      props.handleToggle();
      new OrdersApi().apiOrdersCancelUserPut(
        GetJwtToken(),
        {
          body: new UpdateStateOrderDto(
            valueOrder.vin,
            valueOrder.email,
            valueOrder.totalCost
          ),
          email: JSON.parse(user).email
        },
        CallbackRequestUpdate
      );
    } else {
      props.handleToggle();
      new OrdersApi().apiOrdersConfirmUserPut(
        GetJwtToken(),
        {
          body: new UpdateStateOrderDto(
            valueOrder.vin,
            valueOrder.email,
            valueOrder.totalCost
          ),
          email: JSON.parse(user).email
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
      GetOrderList();
    } else if (response.statusCode > 400) {
      props.setMessageError(response.body.error);
    }
    props.handleClose();
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

  function ReturnStateByName(value) {
    if (value === "PENDING") {
      return 0;
    } else if (value === "CONFIRM") {
      return 1;
    }
  }

  const Search = () => {
    let filteredRows = listOrders;
    if (state.length !== 0) {
      filteredRows = filteredRows.filter(row => {
        if (row.state === ReturnStateByName(state)) return row;
      });
    } if (emailBuyer.length !== 0) {
      filteredRows = filteredRows.filter(row => {
        return row.user.email.toLowerCase().includes(emailBuyer.toLowerCase());
      });
    }
    setlistOrders(filteredRows);
  };

  function OpenFilters() {
    setFlagFilters(!flagFilters)
  }

  function handleClickFilters() {
    setEmailBuyer("")
    setState("")
    requestSearch(vin, list);
  }

  useEffect(() => {
    GetOrderList();
  }, []);

  if (empty) return <div>No data</div>;

  return (
    <div className="container-md">
      <div className="row mt-5 pt-5 align-items-center">
        <div className="row mt-2 mb-1">
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
            <div className="col-3">
              <div className="input-group rounded w-100">
                <input
                  type="search"
                  className="form-control rounded"
                  placeholder="Search by email buyer"
                  aria-label="Search"
                  aria-describedby="search-addon"
                  onChange={e => setEmailBuyer(e.target.value)}
                  value={emailBuyer}
                />
                <span className="input-group-text border-0" id="search-addon">
                  <i className="fas fa-search" />
                </span>
              </div>
            </div>
            <div className="col-3 form-group d-flex">
                <label className="w-25">State:</label>
                <select aria-label="Default select example" className=" form-select" value={state} onChange={e => setState(e.target.value)}>
                  <option value="" selected>All</option>
                  <option value="PENDING">PENDING</option>
                  <option value="CONFIRM">CONFIRM</option>
                </select>
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
        </div>
        {viewList &&
          listOrders.map(r => {
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
                            <div className="d-grid gap-2 d-md-block text-center">
                              {CheckState(r.state) !== "CONFIRM" &&
                                <Tooltip
                                  disableFocusListener
                                  disableTouchListener
                                  title="Confirm order"
                                  arrow
                                  className="mr-1"
                                >
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
                                  </button></Tooltip>}
                              <Tooltip
                                disableFocusListener
                                disableTouchListener
                                title="Get more information about car"
                                arrow
                                className="mr-1"
                              >
                                <Link
                                  className="btn btn-primary-sm btn-sm ml-1 text-reset "
                                  to={`/clientcar/info?vin=${r.car.vin}
                                    `}
                                >
                                  <i className="fa-solid fa-info" />
                                </Link>
                              </Tooltip>
                              <Tooltip
                                disableFocusListener
                                disableTouchListener
                                title="Cancel order"
                                arrow
                                className="mr-1"
                              >
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
                              </Tooltip>
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
                            {CheckState(r.state) !== "CONFIRM" &&
                              <Tooltip
                                disableFocusListener
                                disableTouchListener
                                title="Confirm order"
                                arrow
                                className="mr-1"
                              >
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
                                </button></Tooltip>}
                            <Tooltip
                              disableFocusListener
                              disableTouchListener
                              title="Get more information about car"
                              arrow
                              className="mr-1"
                            >
                              <Link
                                className="btn btn-primary-sm btn-sm ml-1 text-reset "
                                to={`/clientcar/info?vin=${r.car.vin}
                                    `}
                              >
                                <i className="fa-solid fa-info" />
                              </Link>
                            </Tooltip>
                            <Tooltip
                              disableFocusListener
                              disableTouchListener
                              title="Cancel order"
                              arrow
                              className="mr-1"
                            >
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
                            </Tooltip>
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
