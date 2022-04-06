import React, { useEffect, useContext } from "react";
import Context from "../../context";
import { Navigate } from "react-router-dom";
import { EmployeesApi } from "../../api/EmployeesApi";
import { Role } from "../../model/Role";
import { RolesApi } from "../../api/RolesApi";
import { UsersApi } from "../../api/UsersApi";
import GetJwtToken from "../../Services/Jwt/GetJwtToken";
import { GetUserDto } from "../../model/GetUserDto";
const PostEmployee = () => {
  const { user } = useContext(Context);
  const [address, setAddress] = React.useState("");
  const [role, setRole] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [MessageError, setMessageError] = React.useState("");
  const [redirect, setRedirect] = React.useState(false);
  const [roleList, setRoleList] = React.useState([]);
  const [emailList, setEmailList] = React.useState([]);
  const [flag, setFlag] = React.useState(false);

  async function submitEmployee(event) {
    event.preventDefault();
    setMessageError("");
    new EmployeesApi().apiEmployeesPost(
      GetJwtToken(),
      {
        body: {
          Address: address,
          Email: email,
          RoleName: role
        }
      },
      CallbackRequestPost
    );
  }

  function CallbackRequestPost(error, data, response) {
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
      setRedirect(true);
    } else if (response.statusCode > 400) {
      setMessageError(JSON.parse(error.message)["error"]);
    }
  }

  async function GetRoleList() {
    new RolesApi().apiRolesGetWithoutUser(GetJwtToken(), CallbackRequest);
  }

  async function GetUsersList() {
    new UsersApi().apiUsersNotAddedToEmployeeGet(
      GetJwtToken(),
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
      console.log(data);
      if (data[0] instanceof Role) {
        setRoleList(
          data.map(e => {
            return Role.constructFromObject(e);
          })
        );
      } else {
        setEmailList(
          data.map(e => {
            return GetUserDto.constructFromObject(e).email;
          })
        );
        setFlag(true);
      }
    } else if (response.statusCode > 400) {
      setMessageError(JSON.parse(error.message)["error"]);
    }
  }

  const styles = {
    maxWidth: "700px",
    border: "none"
  };

  useEffect(() => {
    GetRoleList();
    GetUsersList();
  }, []);

  return (
    <div className="container-fluid  " id="BackgroundImage">
      <div className="d-flex   justify-content-center align-items-center ">
        <div className="    p-4  w-100 h-50" style={styles}>
          <div className="row mt-5">
            <h1 className="d-flex   justify-content-center align-items-center">
              Post Employee
            </h1>
          </div>
          <div className="row mt-5">
            <form onSubmit={submitEmployee}>
              <div className="form-group mb-2 ">
                <label>Address:</label>
                <input
                  className="w-100 shadow-lg  bg-white rounded"
                  onChange={e => setAddress(e.target.value)}
                  name="address"
                  type="text"
                  placeholder="Enter your address..."
                  required
                />
              </div>
              <div className="form-group mb-2 ">
                <label>Role:</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  size="0"
                  onChange={e => setRole(e.target.value)}
                  required
                >
                  <option value="" />
                  {flag &&
                    roleList.map(element => {
                      return (
                        <option value={element.roleName}>
                          {element.roleName.replace("_", " ")}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="form-group mb-2 ">
                <label>Email:</label>
                <select
                  className="form-select"
                  aria-label="Default select example"
                  size="1"
                  onChange={e => setEmail(e.target.value)}
                  required
                >
                  <option value="" />
                  {flag &&
                    emailList.map(element =>
                      <option value={element}>
                        {element}
                      </option>
                    )}
                </select>
              </div>
              <div className="d-flex justify-content-center form-outline mb-3">
                <div className="flex-fill">
                  <button
                    type="submit"
                    className="btn btn-secondary btn-rounded w-100 "
                  >
                    Put
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="row ">
            <div className="col">
              <a href={"/" + JSON.parse(user).roleName.toLowerCase()}>Home</a>
            </div>
          </div>
          <div>
            {redirect &&
              <Navigate to={"/" + JSON.parse(user).roleName.toLowerCase()} />}
            <p>
              {MessageError}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostEmployee;
