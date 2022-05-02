import React, { useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";
import {
  EmployeesApi,
  CarRepairsApi,
  PostCarRepairDto
} from "../../ImportExportGenClient";
import GetJwtToken from "../../Services/Jwt/GetJwtToken";
import Context from "../../context";

const PostService = (props) => {
  const { user } = useContext(Context);
  const [description, setDescription] = React.useState("");
  const [vin, setVin] = React.useState("");
  const [emp, setEmp] = React.useState("");
  const [redirect, setRedirect] = React.useState(false);
  const [empList, setEmpList] = React.useState([]);
  const [flag, setFlag] = React.useState(false);

  async function submitCar(event) {
    event.preventDefault();
    props.handleToggle();
    if (user === undefined) {
      props.setMessageError("Error:Unauthorized");
      props.handleClose();
      return;
    }
    new CarRepairsApi().apiCarrepairsPost(
      GetJwtToken(),
      {
        body: new PostCarRepairDto(
          description,
          vin,
          emp,
          JSON.parse(user).email
        )
      },
      CallbackRequestPost
    );
  }
  function CallbackRequestPost(error, data, response) {
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

  async function GetEmp() {
    props.handleToggle();
    new EmployeesApi().apiEmployeesCarrepairGet(GetJwtToken(), CallbackRequest);
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
      setEmpList(response.body);
      setFlag(true);
    } else if (response.statusCode > 400) {
      props.setMessageError(response.body.error);
    }
    props.handleClose();
  }

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    setVin(query.get("vin"));
    GetEmp();
  }, []);

  return (
    <div className="d-flex   justify-content-center w-40 align-items-center ">
      <div className="p-4  bg-dark text-white h-100">
        <div className="row mt-5">
          <h1 className="d-flex   justify-content-center align-items-center ">
            Post service
          </h1>
        </div>
        <div className="container  mt-5 pt-5">
          <form onSubmit={submitCar}>
            <div className="row">
              <div className="col mb-2 ">
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
              <div className="col mb-2 ">
                <label>Employee:</label>
                <select
                  size="0"
                  className="form-select "
                  aria-label="Default select example"
                  onChange={e => setEmp(e.target.value)}
                  required
                >
                  <option value="" />
                  {flag &&
                    empList.map(element => {
                      return (
                        <option value={element.getUserDto.email}>
                          {element.getUserDto.email}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
            <div className="col mb-2 ">
              <label>Description:</label>
              <textarea
                className="form-control w-100 shadow-lg  bg-white rounded"
                onChange={e => setDescription(e.target.value)}
                type="text"
                placeholder="Enter your description..."
                required
                id="exampleFormControlTextarea1"
                rows="3"
              />
              <small id="passwordHelpInline" className="text-muted">
                Description length must be between 3 and 100 characters.
              </small>
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
        {redirect && <Navigate to={"/service/user"} />}
      </div>
    </div>
  );
};

export default PostService;
