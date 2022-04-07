import React, { useEffect, useContext } from "react";
import Context from "../../context";
import { UsersApi } from "../../api/UsersApi";
import { Navigate } from "react-router-dom";
import { getDate } from "../ViewLists/SupportFunction";
import ImgService from "../../Services/ImgServices/ImgService";
import GetJwtToken from "../../Services/Jwt/GetJwtToken";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
const PutUser = () => {
  const { user } = useContext(Context);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [dBay, setDBay] = React.useState("");
  const [passwordNew, setPasswordNew] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [emailNew, setEmailNew] = React.useState("");
  const [img, setImg] = React.useState("");
  const [imgNew, setImgNew] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [MessageError, setMessageError] = React.useState("");
  const [redirect, setredirect] = React.useState(false);

  async function submitUser(event) {
    event.preventDefault();
    let url;
    console.log(user);
    if (imgNew.length !== 0) {
      if (!imgNew) {
        setMessageError("Wrong file type!");
        return;
      }
      if (img.type.split("/")[0] !== "image") {
        setMessageError("Wrong file type!");
      }
      url = await ImgService.uploadImage(imgNew);
      if (url == undefined) {
        setMessageError("Error:upload img is not valid.");
        return;
      }
      if (url.height !== 200 || url.width !== 200) {
        setMessageError("Error:size min 200x200:File name:" + imgNew.name);
        return;
      }
      url = url.url;
    } else {
      url = null;
    }
    new UsersApi().apiUsersPut(
      GetJwtToken(),
      {
        body: {
          PhoneNumber: phoneNumber,
          Email: email,
          DBay: dBay,
          Surname: surname,
          UrlPhoto: img,
          NewUrlPhoto: url,
          LastName: lastName,
          FirstName: firstName,
          NewPassword: passwordNew.length === 0 ? null : passwordNew,
          NewEmail: emailNew.length === 0 ? null : emailNew
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
      setredirect(true);
    } else if (response.statusCode > 400) {
      setMessageError(JSON.parse(error.message)["error"]);
    }
  }

  const styles = {
    maxWidth: "700px",
    border: "none"
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    setFirstName(query.get("firstName"));
    setLastName(query.get("lastName"));
    setSurname(query.get("surname"));
    setDBay(getDate(query.get("dBay")));
    setEmail(query.get("email"));
    setPhoneNumber(query.get("phoneNumber"));
    setImg(query.get("urlPhoto"));
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed className="text-white">
        <Box sx={{ bgcolor: "black" }}>
          <div className="d-flex   justify-content-center align-items-center ">
            <div className="    mt-2   w-100" style={styles}>
              <div className="row mt-2">
                <h1 className="d-flex   justify-content-center align-items-center ">
                  Put user
                </h1>
              </div>
              <div className="container  mt-2">
                <form onSubmit={submitUser}>
                  <div className="row">
                    <div className="col mb-2 ">
                      <label>First name:</label>
                      <input
                        className="w-100 shadow-lg  bg-white rounded"
                        onChange={e => setFirstName(e.target.value)}
                        value={firstName}
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
                        value={lastName}
                        name="lastName"
                        type="text"
                        placeholder="Enter your last name..."
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col mb-1">
                      <label>Surname:</label>
                      <input
                        className="w-100 shadow-lg  bg-white rounded"
                        onChange={e => setSurname(e.target.value)}
                        value={surname}
                        name="surname"
                        type="text"
                        placeholder="Enter your surname..."
                        required
                      />
                    </div>
                    <div className="col mb-1">
                      <label>Phone number:</label>
                      <input
                        className="w-100 shadow-lg  bg-white rounded"
                        type="text"
                        value={phoneNumber}
                        name="phoneNumber"
                        placeholder="Example 375297699506"
                        onChange={e => setPhoneNumber(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col mb-2">
                      <label>Old email:</label>
                      <input
                        className="w-100 shadow-lg  bg-white rounded"
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        name="email"
                        type="text"
                        placeholder="Enter your email..."
                        required
                        disabled
                      />
                    </div>
                    <div className="col mb-2">
                      <label>Birthday:</label>
                      <input
                        aria-label="Default select example"
                        className="shadow-lg  bg-white rounded ml-1 w-100"
                        type="date"
                        name="dBay"
                        value={dBay}
                        onChange={e => setDBay(e.target.value)}
                        placeholder="Enter your birthday.."
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group mb-2">
                    <label>New email:</label>
                    <input
                      className="w-100 shadow-lg  bg-white rounded"
                      onChange={e => setEmailNew(e.target.value)}
                      name="email"
                      type="text"
                      placeholder="If you don't want to change your email address, leave the field blank...."
                    />
                  </div>
                  <div className="form-group mb-2">
                    <label>New Password:</label>
                    <input
                      className="w-100 shadow-lg  bg-white rounded"
                      onChange={e => setPasswordNew(e.target.value)}
                      name="password"
                      type="password"
                      placeholder="If you don't want to change your password, leave the field blank..."
                    />
                  </div>
                  <div className="row mb-2">
                    <div className="col">
                      <label>Old image profile:</label>
                      <img
                        src={img}
                        className="rounded-circle"
                        width="200"
                        height="200"
                        alt="Your old image profile"
                      />
                    </div>
                    <div className="col ">
                      <label>New image profile</label>
                      <div className="custom-file ">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={e => setImgNew(e.target.files[0])}
                          className="custom-file-input h-100"
                          id="inputGroupFile01"
                        />
                        <label
                          className="custom-file-label"
                          for="inputGroupFile01"
                        >
                          Choose file
                        </label>
                      </div>
                      <label className="mt-2">
                        If you don't want to change your image profile, leave
                        the field blank
                      </label>
                    </div>
                  </div>
                  <div className="d-flex justify-content-center form-outline mb-3">
                    <div className="flex-fill">
                      <button
                        type="submit"
                        className="btn btn-secondary btn-rounded  w-100 "
                      >
                        Put
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="row text-center">
                <div className="col">
                  <a
                    className="text-reset text-white"
                    href={"/" + JSON.parse(user).roleName.toLowerCase()}
                  >
                    Home
                  </a>
                </div>
              </div>
              <div>
                {redirect &&
                  <Navigate
                    to={"/" + JSON.parse(user).roleName.toLowerCase()}
                  />}
                <p className="text-reset text-white">
                  {MessageError}
                </p>
              </div>
            </div>
          </div>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default PutUser;