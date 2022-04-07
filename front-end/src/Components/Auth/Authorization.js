import React from "react";
import { AuthApi } from "../../api/AuthApi";
import { Navigate } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
const Authorization = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [MessageError, setMessageError] = React.useState("");
  const [redirect, setRedirect] = React.useState(false);
  const [role, setRole] = React.useState("");

  function ClearField() {
    setEmail("");
    setPassword("");
    setMessageError("");
  }

  function SendAuthRequest(event) {
    event.preventDefault();
    new AuthApi().apiAuthsPost(
      { body: { email: email, password: password } },
      CallbackRequest
    );
  }

  function CallbackRequest(error, data, response) {
    console.log(error);
    console.log(response);
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
    } else if (response.statusCode === 200) {
      localStorage.setItem("user", response.text);
      setRole(JSON.parse(response.text).roleName.toLowerCase());
      setRedirect(true);
    } else if (response.statusCode > 400) {
      setMessageError(JSON.parse(error.message)["error"]);
    }
  }

  const styles = {
    maxWidth: "700px",
    border: "none"
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed className="text-white">
        <Box sx={{ bgcolor: "black" }}>
          <div className="d-flex   justify-content-center align-items-center ">
            <div className="   mt-5 pt-5  w-100" style={styles}>
              <form onSubmit={SendAuthRequest}>
                <h1 className="d-flex   justify-content-center align-items-center ">
                  Authorization
                </h1>
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
              <div className="row">
                <p className="text-reset text-white">
                  {MessageError}
                </p>
              </div>
            </div>
          </div>
          {redirect && <Navigate to={"/" + role} />}
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default Authorization;
