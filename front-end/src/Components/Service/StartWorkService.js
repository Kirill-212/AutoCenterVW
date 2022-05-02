import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import {
  UpdateStateCarRepairForStartWorkDto,
  CarRepairsApi
} from "../../ImportExportGenClient";
import Context from "../../context";
import GetJwtToken from "../../Services/Jwt/GetJwtToken";
import { validate_dateService } from "../ViewLists/SupportFunction";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getDate } from "../ViewLists/SupportFunction";

const PostService = (props) => {
  const { user } = useContext(Context);
  const [vin, setVin] = React.useState("");
  const [startWork, setStartWork] = React.useState("");
  const [endWork, setEndWork] = React.useState(null);
  const [redirect, setRedirect] = React.useState(false);
  const [viewCarRepairs, setViewCarRepairs] = React.useState(false);
  const [carRepairs, setCarRepairs] = React.useState([])
const [dateStart,setDateStart]=React.useState("");
  async function submitCar(event) {
    event.preventDefault();
    props.handleToggle();
    let date = validate_dateService(startWork);
    if (date !== null) {
      props.setMessageError(date);
      props.handleClose();
      return;
    }
    date = validate_dateService(endWork);
    if (date !== null) {
      props.setMessageError(date);
      props.handleClose();
      return;
    }
    if (user === undefined) {
      props.setMessageError("Error:Unauthorized");
      props.handleClose();
      return;
    }
    new CarRepairsApi().apiCarrepairsStartWorkPut(
      GetJwtToken(),
      {
        body: new UpdateStateCarRepairForStartWorkDto(
          JSON.parse(user).email,
          vin,
          startWork,
          endWork
        )
      },
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
      setRedirect(true);
    } else if (response.statusCode > 400) {
      props.setMessageError(response.body.error);
    }
    props.handleClose();
  }

  async function GetCarRepairs(event) {
    if (user === undefined) {
      props.setMessageError("Error:Unauthorized");
      props.handleClose();
      return;
    }
    new CarRepairsApi().apiCarrepairsAllByEmailGet(
      GetJwtToken(),
      {
        email: JSON.parse(user).email
      },
      CallbackRequestGet
    );
  }

  function CallbackRequestGet(error, data, response) {
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
      setCarRepairs(response.body)
      let date=new Date();
      response.body.forEach(el=>{
        if(getDate(date)<getDate(el.carRepair.endWork)){
          date=new Date(getDate(el.carRepair.endWork));
        }
        
      })
      date.setDate(date.getDate()+1)
      if(date.getDay() == 0){
        date.setDate(date.getDate()+1)
      }else if(date.getDay() == 6){
        date.setDate(date.getDate()+2)
      }
      setDateStart((new Date(date)).setDate((new Date(date)).getDate()-1))
      setStartWork(date);
      setViewCarRepairs(true)
    } else if (response.statusCode > 400) {
      props.setMessageError(response.body.error);
    }
    props.handleClose();
  }
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    setVin(query.get("vin"));
    GetCarRepairs()
  }, []);

  return (
    <div className="d-flex   justify-content-center w-40 align-items-center ">
      <div className="p-4  bg-dark text-white h-100">
        <div className="row mt-5">
          <h1 className="d-flex   justify-content-center align-items-center ">
            Start repair car
          </h1>
        </div>
        <div className="container mt-5 pt-5">
          <form onSubmit={submitCar}>
            <div className="form-group mb-2 ">
              <label>VIN:</label>
              <input
                value={vin}
                className="w-100 shadow-lg  bg-white rounded"
                onChange={e => setVin(e.target.value)}
                name="vin"
                type="text"
                placeholder="Enter your VIN..."
                disabled
              />
            </div>
            <div className="row">
              <div className="col mb-2 ">
                <label>Start work:</label>
                <DatePicker
                  className="w-100 shadow-lg  bg-white rounded"
                  filterDate={d => {
                   
                   return dateStart<d;             
                  }}
                  placeholderText="Select Start work date..."
                  selected={startWork}
                  selectsStart
                  startDate={startWork}
                  endDate={endWork}
                  onChange={date => setStartWork(date)}
                  required
                />
              </div>
              <div className="col mb-2 ">
                <label>End work:</label>
                <DatePicker
                  className="w-100 shadow-lg  bg-white rounded"
                  filterDate={d => {
                    return startWork <= d;
                  }}
                  placeholderText="Select End work date.."
                  selected={endWork}
                  selectsEnd
                  startDate={startWork}
                  endDate={endWork}
                  onChange={date => setEndWork(date)}
                  required
                />
              </div>
            </div>
            <div className="d-flex justify-content-center form-outline mb-3">
              <div className="flex-fill">
                <button
                  type="submit"
                  className="btn btn-secondary btn-rounded w-100 "
                >
                  Post
                </button>
              </div>
            </div>
          </form>
        </div>
        {redirect && <Navigate to={"/service/employee"} />}
      </div>
    </div>
  );
};

export default PostService;
