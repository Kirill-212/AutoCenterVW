import React, { useEffect } from "react";
import { TestDrivesApi, TestDriveDto } from "../../ImportExportGenClient";
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
  const [listTestDrive, setListTestDrive] = React.useState([]);
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
    const filteredRows = listTestDrive.filter(row => {
      return row.car.vin.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setListTestDrive(filteredRows);
  };

  const search = e => {
    if (e.length === 0) {
      GetTestDriveList();
    } else {
      requestSearch(e);
    }
  };

  async function GetTestDriveList() {
    setViewList(false);
    handleToggle();
    new TestDrivesApi().apiTestdrivesEmployeeGet(
      GetJwtToken(),
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
      setListTestDrive(response.body);
      setViewList(true);
    } else if (response.statusCode > 400) {
     setMessageError(response.body.error);
    }
    handleClose();
  }

  function UpdateState(value, e) {
    let valueTestDrive = JSON.parse(value);
    if (valueTestDrive.state === "CANCEL") {
      handleToggle();
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
      handleToggle();
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
      GetTestDriveList();
    } else if (response.statusCode > 400) {
     setMessageError(response.body.error);
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
    }
  }

  useEffect(() => {
    GetTestDriveList();
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
          listTestDrive.map(r => {
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
                      <div className="card">
                        <h5 className="card-header">
                          Information about test drive
                        </h5>
                        <div className="card-body">
                          <div className="row">
                            <div className="col text-right">State</div>
                            <div className="col-1 text-center">
                              <i className="fa-solid fa-arrow-right" />
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
                              {CheckState(r.stateTestDrive) !== "CONFIRM" &&
                                <button
                                  className="btn btn-primary-sm btn-sm ml-1"
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
                                      time: r.time,
                                      dateStart: r.dateStart,
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
                    <div className="card">
                      <h5 className="card-header">
                        Information about test drive
                      </h5>
                      <div className="card-body">
                        <div className="row">
                          <div className="col text-right">State</div>
                          <div className="col-1 text-center">
                            <i className="fa-solid fa-arrow-right" />
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
                          <div className="col text-right">
                            {CheckState(r.stateTestDrive) !== "CONFIRM" &&
                              <button
                                className="btn btn-primary-sm btn-sm ml-1"
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
                                    time: r.time,
                                    dateStart: r.dateStart,
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
  );
};

export default EmployeeListOrder;
