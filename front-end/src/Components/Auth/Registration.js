import React from "react";
import "./Registration.css";
import { UsersApi } from "../../api/UsersApi";
import { Navigate } from "react-router-dom";
import ImgService from "../../Services/ImgServices/ImgService";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
function Registration() {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [dBay, setDBay] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [MessageError, setMessageError] = React.useState("");
  const [img, setImg] = React.useState("");
  const [redirectLogin, setRedirectLogin] = React.useState(false);

  function ClearField(e) {
    setMessageError("");
    setFirstName("");
    setLastName("");
    setSurname("");
    setEmail("");
    setPassword("");
    setDBay("");
    setPhoneNumber("");
  }

  async function submitUser(event) {
    event.preventDefault();
    if (!img) {
      setMessageError("Wrong file type!");
      return;
    }
    if (img.type.split("/")[0] !== "image") {
      setMessageError("Wrong file type!");
    }
    let url = await ImgService.uploadImage(img);
    if (url == undefined) {
      setMessageError("Error:upload img is not valid.");
      return;
    }
    if (url.height !== 200 || url.width !== 200) {
      setMessageError("Error:size  200x200:File name:" + img.name);
      return;
    }

    new UsersApi().apiUsersPost(
      {
        body: {
          PhoneNumber: phoneNumber,
          Email: email,
          DBay: dBay,
          Surname: surname,
          UrlPhoto: url.url,
          LastName: lastName,
          FirstName: firstName,
          Password: password
        }
      },
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
      setRedirectLogin(true);
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
            <div className="  mt-5 pt-5 w-100" style={styles}>
              <form onSubmit={submitUser}>
                <h1 className="d-flex   justify-content-center align-items-center ">
                  Registration
                </h1>
                <div className="row">
                  <div className="col mb-2 ">
                    <label>First name:</label>
                    <input
                      className="w-100 shadow-lg  bg-white rounded"
                      onChange={e => setFirstName(e.target.value)}
                      name="firstName"
                      type="text"
                      placeholder="Enter your first name..."
                      required
                    />
                  </div>
                  <div className="col mb-2">
                    <label>Last name:</label>
                    <input
                      className="w-100 shadow-lg  bg-white rounded"
                      onChange={e => setLastName(e.target.value)}
                      name="lastName"
                      type="text"
                      placeholder="Enter your last name..."
                      required
                    />
                  </div>
                </div>
                <div className="form-group mb-2">
                  <label>Surname:</label>
                  <input
                    className="w-100 shadow-lg  bg-white rounded"
                    onChange={e => setSurname(e.target.value)}
                    name="surname"
                    type="text"
                    placeholder="Enter your surname..."
                    required
                  />
                </div>
                <div className="form-group mb-2">
                  <label>Phone number:</label>
                  <input
                    className="w-100 shadow-lg  bg-white rounded"
                    type="text"
                    name="phoneNumber"
                    placeholder="Example 375297699506"
                    onChange={e => setPhoneNumber(e.target.value)}
                    required
                  />
                </div>
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
                  <label>Birthday:</label>
                  <input
                    aria-label="Default select example"
                    className="shadow-lg  bg-white rounded ml-1 w-100"
                    type="date"
                    name="dBay"
                    onChange={e => setDBay(e.target.value)}
                    placeholder="Enter your birthday.."
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
                <div className="form-group mb-3">
                  <label>Image profile:</label>
                  <div className="custom-file">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={e => setImg(e.target.files[0])}
                      className="custom-file-input"
                      id="inputGroupFile01"
                      required
                    />
                    <label className="custom-file-label" for="inputGroupFile01">
                      Choose file(200x200)
                    </label>
                  </div>
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
                      className="btn btn-warning btn-rounded w-100"
                      onClick={ClearField}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
              <div className="row ">
                <div className="col">
                  <a href="/login" className="text-reset text-white">
                    Authorization
                  </a>
                </div>
              </div>
              <div>
                <p className="text-reset text-white">
                  {MessageError}
                </p>
                {redirectLogin && <Navigate to="/login" />}
              </div>
            </div>
          </div>
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default Registration;
