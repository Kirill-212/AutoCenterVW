import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { EmployeesApi } from "../../api/EmployeesApi";
import { Role } from "../../model/Role";
import { RolesApi } from "../../api/RolesApi";
import { UsersApi } from "../../api/UsersApi";
import GetJwtToken from "../../Services/Jwt/GetJwtToken";
import { GetUserDto } from "../../model/GetUserDto";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const PostEmployee = () => {
  const [address, setAddress] = React.useState("");
  const [role, setRole] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [MessageError, setMessageError] = React.useState("");
  const [redirect, setRedirect] = React.useState(false);
  const [roleList, setRoleList] = React.useState([]);
  const [emailList, setEmailList] = React.useState([]);
  const [flag, setFlag] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  async function submitEmployee(event) {
    event.preventDefault();
    handleToggle();
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
          errorResult +=  errorsJson[key] + " | ";
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
    handleClose();
  }

  async function GetRoleList() {
    handleToggle();
    new RolesApi().apiRolesGetWithoutUser(GetJwtToken(), CallbackRequest);
  }

  async function GetUsersList() {
    handleToggle();
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
          errorResult +=  errorsJson[key] + " | ";
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
    handleClose();
  }

  let style = { width: "30rem" };

  useEffect(() => {
    GetRoleList();
    GetUsersList();
  }, []);

  return (
    <div className="d-flex   justify-content-center w-40  align-items-center ">
      <div className="p-4  bg-dark text-white h-100">
        <div className="row mt-5">
          <h1 className="d-flex   justify-content-center align-items-center ">
            Post employee
          </h1>
        </div>
        <div className="container mt-5 pt-5">
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
                  Post
                </button>
              </div>
            </div>
          </form>
        </div>

        <div>
          {redirect && <Navigate to={"/home"} />}
          <Backdrop
            sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <div style={style} className="text-wrap  text-reset text-white">
            {MessageError}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostEmployee;
