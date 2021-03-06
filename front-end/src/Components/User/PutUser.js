import React, { useEffect } from "react";
import { UsersApi } from "../../api/UsersApi";
import { Navigate } from "react-router-dom";
import { getDate, validate_dateAge } from "../ViewLists/SupportFunction";
import ImgService from "../../Services/ImgServices/ImgService";
import GetJwtToken from "../../Services/Jwt/GetJwtToken";

const PutUser = (props) => {
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
  const [redirect, setredirect] = React.useState(false);

  async function submitUser(event) {
    event.preventDefault();
    props.handleToggle();
    let date = validate_dateAge(dBay);
    if (date !== null) {
      props.setMessageError(date);
      props.handleClose();
      return;
    }
    let url;
    if (imgNew !== undefined) {
      if (imgNew.length === 0) {
        url = null;
      } else {
        if (!imgNew) {
          props.setMessageError("Error:Wrong file type!");
          props.handleClose();
          return;
        }
        if (imgNew.type.split("/")[0] !== "image") {
          props.setMessageError("Error:Wrong file type!");
          props.handleClose();
          return;
        }
        url = await ImgService.uploadImage(imgNew);
        if (url == undefined) {
          props.setMessageError("Error:Upload img is not valid.");
          props.handleClose();
          return;
        }
        if (url.height !== 200 || url.width !== 200) {
          props.setMessageError("Error:Valid size 200x200:File name:" + imgNew.name);
          props.handleClose();
          return;
        }
        url = url.url;
      }
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
      props.setMessageError("Error:Server is not available");
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
      setredirect(true);
    } else if (response.statusCode > 400) {
      props.setMessageError(response.body.error);
    }
    props.handleClose();
  }

  async function Get(email) {
    props.handleToggle();
    new UsersApi().apiUsersByEmailGet(
      GetJwtToken(),
      {
        email: email
      },
      CallbackRequestGet
    );
  }

  function CallbackRequestGet(error, data, response) {
    if (response == undefined) {
      props.setMessageError("Error:Server is not available");
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
      if (response.statusCode === 204) {
        props.handleClose();
        props.setMessageError("Error:User with this email not found.");
        return;
      }
      setFirstName(response.body.firstName);
      setLastName(response.body.lastName);
      setSurname(response.body.surname);
      setDBay(getDate(response.body.dBay));
      setEmail(response.body.email);
      setPhoneNumber(response.body.phoneNumber);
      setImg(response.body.urlPhoto);
    } else if (response.statusCode > 400) {
      props.setMessageError(response.body.error);
    }
    props.handleClose();
  }

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    Get(query.get("email"));
  }, []);

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
                    placeholder="+111 (11) 111-11-11"
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
                    max={getDate(new Date((new Date()).getFullYear()-18,(new Date()).getMonth(),(new Date()).getDate()))}
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
            {redirect && <Navigate to={"/user"} />}
        </div>
      </div>
    </div>
  );
};

export default PutUser;
