import React, { useEffect } from "react";
import { TestDrivesApi, TestDriveDto } from "../../ImportExportGenClient";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import GetJwtToken from "../../Services/Jwt/GetJwtToken";
import { getDate } from "../ViewLists/SupportFunction";

const EmployeeListOrder = props => {
  const [listTestDrive, setListTestDrive] = React.useState([]);
  const [list,setList] = React.useState([]);
  const [vin,setVin]=React.useState("");
  const [flagFilters,setFlagFilters]=React.useState(true)
  const [viewList, setViewList] = React.useState(false);
  const [empty, setEmpty] = React.useState(false);
  const[email,setEmail]=React.useState("");
  const [state,setState]=React.useState("");
  const[date,setDate]=React.useState("");
  const [time,setTime]=React.useState("");
  const requestSearch = (searchedVal,data) => {

    const filteredRows = listTestDrive.filter(row => {
      return row.car.vin.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setListTestDrive(filteredRows);
  };

  const search = e => {
    if (e.length === 0) {
      setVin("")
     setListTestDrive(list);
    } else {
      setVin(e);
      requestSearch(e,null);
    }
  };

  async function GetTestDriveList() {
    setViewList(false);
    props.handleToggle();
    new TestDrivesApi().apiTestdrivesEmployeeGet(
      GetJwtToken(),
      CallbackRequest
    );
  }

  function CallbackRequest(error, data, response) {
    if (response == undefined) {
      props.setMessageError("Error:server is not available");
    } else if (response.statusCode == 400) {
      if (response.body.errors !== undefined) {
        let errorResult =[];
        let errorsJson = response.body.errors;
        for (let key in response.body.errors) {
          errorResult.push( <>{errorsJson[key]} <br></br> </>);
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
      setList(response.body)
      setListTestDrive(response.body);
      setViewList(true);
    } else if (response.statusCode > 400) {
     props.setMessageError(response.body.error);
    }
    props.handleClose();
  }

  function UpdateState(value, e) {
    let valueTestDrive = JSON.parse(value);
    if (valueTestDrive.state === "CANCEL") {
      props.handleToggle();
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
      props.handleToggle();
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
      props.setMessageError("Error:server is not available");
    } else if (response.statusCode == 400) {
      if (response.body.errors !== undefined) {
        let errorResult =[];
        let errorsJson = response.body.errors;
        for (let key in response.body.errors) {
          errorResult.push( <>{errorsJson[key]} <br></br> </>);
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
      GetTestDriveList();
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
    }
  }

  function ReturnStateByName(value) {
    if (value === "PENDING") {
      return 0;
    } else if (value ===  "CONFIRM") {
      return 1;
    }
  }
  const Search =()=> {
    let filteredRows = listTestDrive;
    if(state.length!==0 ){
      filteredRows = filteredRows.filter(row => {
        console.log(row,ReturnStateByName(state))
        if(row.stateTestDrive===ReturnStateByName(state))return row;

      });
    }if(email.length!==0){
      filteredRows = filteredRows.filter(row => {
        return row.user.email.toLowerCase().includes(email.toLowerCase());
      });
    }
    
    setListTestDrive(filteredRows);
  };
  function OpenFilters(){
    setFlagFilters(!flagFilters)
  }
  function handleClickFilters(){
    setEmail("")
    setState("")
    requestSearch(vin,list);
  }
  useEffect(() => {
    GetTestDriveList();
  }, []);

  if (empty) return <div>No data</div>;
  return (
    <div className="container-md">
      <div className="row mt-5 pt-5 align-items-center">
        <div className="row mt-2  ">
         
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


                  <div className="row m-2 p-2 bg-white text-black"  hidden={flagFilters}>
                    <div className="row">
                        <div className="col"> 
                        <div className="input-group rounded w-100">         
                            <input
                              type="search"
                              className="form-control rounded"
                              placeholder="Search by email user"
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

                        <div className="col">
                          <div className="form-group d-flex">
                          <label className="w-25">State:</label>
                          <select aria-label="Default select example" className=" form-select" value={state} onChange={e => setState(e.target.value)}>
                          <option value="" selected>All</option>
                          <option value="PENDING">PENDING</option>
                          <option value="CONFIRM">CONFIRM</option>
                            </select>
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
                   <div className="col w-50">
                          <div className="form-group d-flex">
                          <label >Time:</label>
                          <select aria-label="Default select example" className="ml-2 form-select" value={time} onChange={e => setTime(e.target.value)}>
                          <option value="" selected>All</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                          <option value="11">11</option>
                          <option value="12">12</option>
                          <option value="13">13</option>
                          <option value="14">14</option>
                          <option value="15">15</option>
                          <option value="16">16</option>
                          <option value="17">17</option>
                            </select>
                            </div>
                            </div>
                            <div className="col">
                <label >Date start:</label>
                <input
                  className="ml-2 w-50 shadow-lg  bg-white rounded"
                  onChange={e => setDate(e.target.value)}
                  value={date}
                  type="date"
                  required
                />
              </div>
                   </div>

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
