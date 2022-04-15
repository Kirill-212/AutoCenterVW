import React from "react";
import { AuthApi } from "../../api/AuthApi";
import { Navigate } from "react-router-dom";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Authorization = props => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [MessageError, setMessageError] = React.useState("");
  const [redirect, setRedirect] = React.useState(false);
  const [role, setRole] = React.useState("");
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  function ClearField() {
    setEmail("");
    setPassword("");
    setMessageError("");
  }

  function SendAuthRequest(event) {
    event.preventDefault();
    handleToggle();
    setMessageError("");
    new AuthApi().apiAuthsPost(
      { body: { email: email, password: password } },
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
    } else if (response.statusCode === 200) {
      props.set(response.text);
      localStorage.setItem("user", response.text);
      setRole(JSON.parse(response.text).roleName.toLowerCase());
      setRedirect(true);
    } else if (response.statusCode > 400) {
      setMessageError(response.body.error);
    }
    handleClose();
  }

  let style = { width: "30rem" };
  return (
    <div className="d-flex   justify-content-center w-40  align-items-center ">
      <div className=" p-4   bg-dark text-white h-100 ">
        <div className="row mt-5">
          <h1 className="d-flex   justify-content-center align-items-center ">
            Authorization
          </h1>
        </div>
        <div className="container mt-5 pt-5">
          <form onSubmit={SendAuthRequest}>
            <div className="form-group mb-2">
              <label>Email:</label>
              <input
                className="w-100 shadow-lg  bg-white rounded"
                onChange={e => setEmail(e.target.value)}
                name="email"
                type="text"
                placeholder="Enter your email..."
                required
              />
            </div>
            <div className="form-group mb-2">
              <label>Password:</label>
              <input
                className="w-100 shadow-lg  bg-white rounded"
                onChange={e => setPassword(e.target.value)}
                name="password"
                type="password"
                placeholder="Enter your password..."
                required
              />
            </div>
            <div className="row d-flex justify-content-center form-outline mb-3">
              <div className="col-5 flex-fill">
                <button
                  type="submit"
                  className="btn btn-secondary btn-rounded w-100 "
                >
                  Submit
                </button>
              </div>
              <div className="col-5 flex-fill">
                <button
                  type="reset"
                  className="btn btn-warning btn-rounded w-100 "
                  onClick={ClearField}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
          <div className="row">
            <a href="/" value="User" className="text-reset text-white">
              Register
            </a>
          </div>
        </div>
        <div>
          {redirect && <Navigate to={"/home"} />}
          <div style={style} className="text-wrap  text-reset text-white">
            <Backdrop
              sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }}
              open={open}
              onClick={handleClose}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
            {MessageError}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authorization;
