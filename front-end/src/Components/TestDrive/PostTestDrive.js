import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { TestDrivesApi, TestDriveDto } from "../../ImportExportGenClient";
import Context from "../../context";
import GetJwtToken from "../../Services/Jwt/GetJwtToken";
import { validate_dateTestDrive } from "../ViewLists/SupportFunction";
import { getDate } from "../ViewLists/SupportFunction";
const PostTestDrive = (props) => {
  const { user } = useContext(Context);
  const [vin, setVin] = React.useState("");
  const [dateStart, setDateStart] = React.useState("");
  const [redirect, setRedirect] = React.useState(false);
  const [hourStart, setHourStart] = React.useState(0);
  const[renderOption,setRenderOption]=React.useState([])
  const[valueOption,setValueOption]=React.useState([{val:9},{val:10},
    {val:11},{val:12},{val:13},{val:14},{val:15},{val:16},{val:17}])
    const[flagRender,setFlagRender]=React.useState(false);



  async function submit(e) {
    e.preventDefault();
    props.handleToggle();
    let date = validate_dateTestDrive(dateStart);
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
    new TestDrivesApi().apiTestdrivesPost(
      GetJwtToken(),
      {
        body: new TestDriveDto(
          dateStart,
          hourStart,
          JSON.parse(user).email,
          vin
        )
      },
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
      setRedirect(true);
    } else if (response.statusCode > 400) {
     props.setMessageError(response.body.error);
    }
    props.handleClose();
  }

  function setDate(e){
    setDateStart(e)
    GetTestDriveList(e)
  }

  async function GetTestDriveList(e) {
   
    props.handleToggle();
    new TestDrivesApi().apiTestdrivesVinWithEmailGet(
      GetJwtToken(),{vin:vin,_date:e},
      CallbackRequestGet
    );
  }

  function CallbackRequestGet(error, data, response) {
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
      console.log('1')
      let fl=true;
      valueOption.forEach(el=>{
        fl=true;
        response.body.forEach(element=>{    
          if(element.time==el.val){
            renderOption.push(<option  disabled value={el.val}>{el.val}</option>)
            fl=false
          }
        })
        if(fl){
          renderOption.push(<option value={el.val}>{el.val}</option>)
        }
        console.log(el)
      })
      setFlagRender(true)
      console.log(renderOption)
    } else if (response.statusCode > 400) {
     props.setMessageError(response.body.error);
    }
    props.handleClose();
  }

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    setVin(query.get("vin"));
  }, []);

  return (
    <div className="d-flex   justify-content-center w-30 h-90 align-items-center ">
      <div className=" p-4   bg-dark text-white h-100 ">
        <div className="row mt-5">
          <h1 className="d-flex   justify-content-center align-items-center ">
            Post test drive
          </h1>
        </div>
        <div className="container mt-5 pt-5">
          <form onSubmit={submit}>
            <div className="form-group mb-2 ">
              <label>VIN:</label>
              <input
                className="w-100 shadow-lg  bg-white rounded"
                onChange={e => setVin(e.target.value)}
                value={vin}
                name="vin"
                type="text"
                placeholder="Enter your VIN..."
                disabled
              />
            </div>
            <div className=" row">
              <div className="col mb-2 ">
                <label>Date start:</label>
                <input
                  className="w-100 shadow-lg  bg-white rounded"
                  onChange={e => setDate(e.target.value)}
                  name="dateOfRealeseCar"
                  type="date"
                  min={getDate(new Date())}
                  placeholder="Enter your date of realese car..."
                  required
                />
              </div>
              <div className="col mb-2 ">
                <label>Hour start:</label>
                <select
                  size="0"
                  className="form-select "
                  aria-label="Default select example"
                  onChange={e => setHourStart(e.target.value)}
                  required
                >
                  <option value="" />
                  {flagRender&&renderOption}
                </select>
              </div>
            </div>
            <div className="d-flex justify-content-center form-outline mt-3 mb-3">
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
          {redirect && <Navigate to={"/home"} />}
      </div>
    </div>
  );
};

export default PostTestDrive;
