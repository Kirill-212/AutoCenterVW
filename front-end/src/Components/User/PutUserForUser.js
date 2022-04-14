import React, { useEffect, useContext } from "react";
import Context from "../../context";
import { UsersApi } from "../../api/UsersApi";
import { Navigate } from "react-router-dom";
import { getDate } from "../ViewLists/SupportFunction";
import ImgService from "../../Services/ImgServices/ImgService";
import GetJwtToken from "../../Services/Jwt/GetJwtToken";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

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
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  async function submitUser(event) {
    event.preventDefault();
    handleToggle();
    setMessageError("");
    let url;
    if (imgNew.length !== 0) {
      if (!imgNew) {
        setMessageError("Error:Wrong file type!");
        handleClose();
        return;
      }
      if (imgNew.type.split("/")[0] !== "image") {
        setMessageError("Error:Wrong file type!");
        handleClose();
        return;
      }
      url = await ImgService.uploadImage(imgNew);
      if (url == undefined) {
        setMessageError("Error:upload img is not valid.");
        handleClose();
        return;
      }
      if (url.height !== 200 || url.width !== 200) {
        setMessageError("Error:valid size 200x200:File name:" + imgNew.name);
        handleClose();
        return;
      }
      url = url.url;
    } else {
      url = null;
    }
    if (user === undefined) {
      setMessageError("Unauthorized");
      handleClose();
      return;
    }
    new UsersApi().apiUsersUserPut(
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
        },
        email: JSON.parse(user).email
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
      setredirect(true);
    } else if (response.statusCode > 400) {
      setMessageError(JSON.parse(error.message)["error"]);
    }
    handleClose();
  }

  async function Get() {
    if (user === undefined) {
      setMessageError("Unauthorized");
      handleClose();
      return;
    }
    handleToggle();
    new UsersApi().apiUsersByEmailGet(
      GetJwtToken(),
      {
        email: JSON.parse(user).email
      },
      CallbackRequestGet
    );
  }

  function CallbackRequestGet(error, data, response) {
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
      if(response.statusCode === 204){
        handleClose();
        setMessageError("Error: user with this email not found.");
        return
      }
      setFirstName(response.body.firstName);
      setLastName(response.body.lastName);
      setSurname(response.body.surname);
      setDBay(getDate(response.body.dBay));
      setEmail(response.body.email);
      setPhoneNumber(response.body.phoneNumber);
      setImg(response.body.urlPhoto);
    } else if (response.statusCode > 400) {
      setMessageError(JSON.parse(error.message)["error"]);
    }
    handleClose();
  }

  useEffect(() => {
    Get();
  }, []);

  let style = { width: "30rem" };

  return (
    <div className="  d-flex   justify-content-center w-20  align-items-center ">
      <div className="d-flex  justify-content-center  align-items-center ">
        <div className="p-4 w-50 h-100 bg-dark text-white ">
          <div className="row mt-2">
            <h1 className="d-flex   justify-content-center align-items-center ">
              Put user
            </h1>
          </div>
          <div className="container  mt-3">
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
                    placeholder="Example +375 (29) 769-95-06"
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
                    <label className="custom-file-label" for="inputGroupFile01">
                      Choose file(200x200)
                    </label>
                  </div>
                  <label className="mt-2">
                    If you don't want to change your image profile, leave the
                    field blank
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
    </div>
  );
};

export default PutUser;
