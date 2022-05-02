import React from "react";
import { UsersApi } from "../../api/UsersApi";
import { Navigate,Link } from "react-router-dom";
import ImgService from "../../Services/ImgServices/ImgService";
import { validate_dateAge } from "../ViewLists/SupportFunction";
import { getDate } from "../ViewLists/SupportFunction";
function Registration(props) {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [surname, setSurname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [dBay, setDBay] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [img, setImg] = React.useState("");
  const [redirectLogin, setRedirectLogin] = React.useState(false);

  function ClearField(e) {
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
    props.handleToggle();
    let date = validate_dateAge(dBay);
    if (date !== null) {
      props.setMessageError(date);
      props.handleClose();
      return;
    }
    if (!img) {
      props.setMessageError("Error:Wrong file type!");
      props.handleClose();
      return;
    }
    if (img.type.split("/")[0] !== "image") {
      props.handleClose();
      props.setMessageError("Error:Wrong file type!");
      return;
    }
    let url = await ImgService.uploadImage(img);
    if (url == undefined) {
      props.setMessageError("Error:Upload img is not valid.");
      props.handleClose();
      return;
    }
    if (url.height !== 200 || url.width !== 200) {
      props.setMessageError("Error:Valid size  200x200:File name:" + img.name);
      props.handleClose();
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
      setRedirectLogin(true);
    } else if (response.statusCode > 400) {
      props.setMessageError(response.body.error);
    }
    props.handleClose();
  }

  return (
    <div className="d-flex justify-content-center  align-items-center ">
      <div className="p-4  w-25 bg-dark text-white h-100">
        <div className="row mt-3">
          <h1 className="d-flex   justify-content-center  ">Registration</h1>
        </div>
        <div className="container  mt-2">
          <form onSubmit={submitUser}>
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
            <div className="row">
              <div className="col mb-2">
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
              <div className="col mb-2">
                <label>Phone number:</label>
                <input
                  className="w-100 shadow-lg  bg-white rounded"
                  type="text"
                  name="phoneNumber"
                  placeholder="+111 (11) 111-11-11"
                  onChange={e => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col mb-2">
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
              <div className="col mb-2">
                <label>Birthday:</label>
                <input
                  aria-label="Default select example"
                  className="shadow-lg  bg-white rounded ml-1 w-100"
                  type="date"
                  name="dBay"
                  max={getDate(new Date((new Date()).getFullYear()-18,(new Date()).getMonth(),(new Date()).getDate()))}
                  onChange={e => setDBay(e.target.value)}
                  placeholder="Enter your birthday.."
                  required
                />
              </div>
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
              <small className="form-text text-muted">
                1 number. 1 upper letter.1 lower letter and one '-' min 8
                lenght.
              </small>
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
            <div className="row mt-2 d-flex justify-content-center form-outline mb-3">
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
              <Link to="/login" className="text-reset text-white">
                Authorization
              </Link>
            </div>
          </div>
            {redirectLogin && <Navigate to="/login" />}
        </div>
      </div>
    </div>
  );
}

export default Registration;
