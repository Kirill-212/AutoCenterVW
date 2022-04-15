import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import {
  PostClientCarDto,
  ClientCarsApi,
  PostCarDto,
  ImgDto,
  CarEquipmentApi
} from "../../ImportExportGenClient";
import ImgService from "../../Services/ImgServices/ImgService";
import Context from "../../context";
import GetJwtToken from "../../Services/Jwt/GetJwtToken";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { validate_date } from "../ViewLists/SupportFunction";

const PostClientCar = () => {
  const { user } = useContext(Context);
  const [nameCarEquipment, setNameCarEquipment] = React.useState("");
  const [cost, setCost] = React.useState(0);
  const [vin, setVin] = React.useState("");
  const [dateOfRealeseCar, setDateOfRealeseCar] = React.useState("");
  const [carMileage, setCarMileage] = React.useState(0);
  const [sharePercentage, setSharePercentage] = React.useState(0);
  const [MessageError, setMessageError] = React.useState("");
  const [redirect, setRedirect] = React.useState(false);
  const [carEquipmentList, setCarEquipmentList] = React.useState([]);
  const [registerNumber, setRegisterNumber] = React.useState("");
  const [flag, setFlag] = React.useState(false);
  const [imgs, setImgs] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  async function GetCarEquipment() {
    setMessageError("");
    handleToggle();
    new CarEquipmentApi().apiCarequipmentsEquipmentGet(
      GetJwtToken(),
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
    } else if (response.statusCode === 200 || response.statusCode === 204) {
      setCarEquipmentList(response.body);
      setFlag(true);
    } else if (response.statusCode > 400) {
     setMessageError(response.body.error);
    }
    handleClose();
  }

  async function submitCar(event) {
    event.preventDefault();
    handleToggle();
    setMessageError("");
    let date = validate_date(dateOfRealeseCar);
    if (date !== null) {
      setMessageError(date);
      handleClose();
      return;
    }
    let urls = [];
    for (let i = 0; i < imgs.length; i++) {
      if (!imgs[i]) {
        setMessageError("Error:Wrong file type!");
        handleClose();
        return;
      }
      if (imgs[i].type.split("/")[0] !== "image") {
        setMessageError("Error:Wrong file type!");
        handleClose();
        return;
      }
      let url = await ImgService.uploadImage(imgs[i]);
      if (url == undefined) {
        setMessageError("Error:upload img is not valid.");
        handleClose();
        return;
      }
      if (url.height !== 600 || url.width !== 800) {
        setMessageError("Error:valid size 800x600:File name:" + imgs[i].name);
        handleClose();
        return;
      }
      urls.push(new ImgDto(url.url));
    }
    if (user === undefined) {
      setMessageError("Unauthorized");
      handleClose();
      return;
    }
    new ClientCarsApi().apiClientcarsPost(
      GetJwtToken(),
      {
        body: new PostClientCarDto(
          registerNumber.length == 0 ? undefined : registerNumber,
          new PostCarDto(
            sharePercentage == 0 ? undefined : sharePercentage,
            vin,
            nameCarEquipment,
            cost,
            carMileage,
            dateOfRealeseCar,
            urls
          ),
          JSON.parse(user).email
        )
      },
      CallbackRequestPost
    );
  }

  function CallbackRequestPost(error, data, response) {
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
    } else if (response.statusCode === 200 || response.statusCode === 204) {
      setRedirect(true);
    } else if (response.statusCode > 400) {
     setMessageError(response.body.error);
    }
    handleClose();
  }

  useEffect(() => {
    GetCarEquipment();
  }, []);

  let style = { width: "30rem" };

  return (
    <div className="d-flex   justify-content-center w-30  align-items-center ">
      <div className=" p-4   bg-dark text-white h-100 ">
        <div className="row mt-5">
          <h1 className="d-flex   justify-content-center align-items-center ">
            Post client car
          </h1>
        </div>
        <div className="container w-75 mt-5 pt-2">
          <form onSubmit={submitCar}>
            <div className="row">
              <div className="col mb-2 ">
                <label>VIN:</label>
                <input
                  className="w-100 shadow-lg  bg-white rounded"
                  onChange={e => setVin(e.target.value)}
                  name="vin"
                  type="text"
                  placeholder="Enter your VIN..."
                  required
                />
              </div>
              <div className="col mb-2 ">
                <label>Date of realese car:</label>
                <input
                  className="w-100 shadow-lg  bg-white rounded"
                  onChange={e => setDateOfRealeseCar(e.target.value)}
                  name="dateOfRealeseCar"
                  type="date"
                  placeholder="Enter your date of realese car..."
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col mb-2 ">
                <label>Cost($):</label>
                <input
                  className="w-100 shadow-lg  bg-white rounded"
                  onChange={e => setCost(e.target.value)}
                  name="cost"
                  type="number"
                  placeholder="Enter your cost..."
                  required
                />
              </div>
              <div className="col mb-2 ">
                <label>Car mileage(km):</label>
                <input
                  className="w-100 shadow-lg  bg-white rounded"
                  onChange={e => setCarMileage(e.target.value)}
                  name="carMileage"
                  type="number"
                  placeholder="Enter your car mileage..."
                  required
                />
              </div>
            </div>
            <div className="form-group mb-2 ">
              <label>Share percentage(%):</label>
              <input
                className="w-100 shadow-lg  bg-white rounded"
                onChange={e => setSharePercentage(e.target.value)}
                name="sharePercentage"
                type="number"
                placeholder="Enter your share percentage..."
              />
            </div>
            <div className="form-group mb-2 ">
              <label>Register number:</label>
              <input
                className="w-100 shadow-lg  bg-white rounded"
                onChange={e => setRegisterNumber(e.target.value)}
                name="registerNumber"
                type="text"
              />
              <small className="form-text text-muted">
                If you don't want to add register number, leave the field blank.
                Use English letter.
              </small>
            </div>
            <div className="form-group mb-2 ">
              <label>Car equipment:</label>
              <select
                size="0"
                className="form-select "
                aria-label="Default select example"
                onChange={e => setNameCarEquipment(e.target.value)}
                required
              >
                <option value="" />
                {flag &&
                  carEquipmentList.map(element => {
                    return (
                      <option value={element.name}>
                        {element.name}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="form-group mb-3">
              <label>Car images:</label>
              <div className="custom-file">
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => setImgs(e.target.files)}
                  className="custom-file-input"
                  id="inputGroupFile01"
                  multiple
                  required
                />
                <label className="custom-file-label" for="inputGroupFile01">
                  Choose file/files(800x600)
                </label>
              </div>
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
          <Backdrop
            sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          {redirect && <Navigate to={"/home"} />}
          <div style={style} className="text-wrap  text-reset text-white">
            {MessageError}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostClientCar;
