import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import {
  PutClientCarDto,
  ClientCarsApi,
  PutCarDto,
  UsersApi,
  ImgDto,
  CarEquipmentApi
} from "../../ImportExportGenClient";
import ImgService from "../../Services/ImgServices/ImgService";
import Context from "../../context";
import GetJwtToken from "../../Services/Jwt/GetJwtToken";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { getDate } from "../ViewLists/SupportFunction";
const PutClientCar = () => {
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
  const [registerNumberNew, setRegisterNumberNew] = React.useState("");
  const [flag, setFlag] = React.useState(false);
  const [changeRegiterNumber, setChangeRegiterNumber] = React.useState("0");
  const [idCarEquipment, setIdCarEquipment] = React.useState("");
  const [imgsCar, setImgsCar] = React.useState([]);
  const [userList, setUserList] = React.useState([]);
  const fileInput = React.useRef(null);
  const [emailNew, setEmailNew] = React.useState("");
  const [vinNew, setVinNew] = React.useState("");
  let checkCarEquipment = "";

  async function submitCar(event) {
    event.preventDefault();
    let urls = [];
    for (let i = 0; i < imgsCar.length; i++) {
      if (imgsCar[i].name !== undefined) {
        let url = await ImgService.uploadImage(imgsCar[i]);
        if (url == undefined) {
          setMessageError("Error:upload img is not valid.");
          return;
        }
        if (url.height !== 600 || url.width !== 800) {
          setMessageError(
            "Error:size is valid 800x600:File name:" +
              imgsCar[i].name +
              "|Line" +
              i
          );
          return;
        }
        urls.push(new ImgDto(url.url));
      } else {
        if (imgsCar[i].id !== undefined) urls.push(new ImgDto(imgsCar[i].url));
      }
    }
    console.log(registerNumberNew, "new");
    console.log({
      body: new PutClientCarDto(
        emailNew.length === 0 ? undefined : emailNew,
        registerNumber,
        registerNumberNew.length === 0 ? undefined : registerNumberNew,
        new PutCarDto(
          vin,
          vinNew.length === 0 ? undefined : vinNew,
          nameCarEquipment,
          sharePercentage == 0 ? undefined : sharePercentage,
          cost,
          carMileage,
          dateOfRealeseCar,
          urls
        ),
        JSON.parse(user).email,
        changeRegiterNumber === "1" ? true : false
      )
    });
    new ClientCarsApi().apiClientcarsPut(
      GetJwtToken(),
      {
        body: new PutClientCarDto(
          emailNew.length === 0 ? undefined : emailNew,
          registerNumber,
          registerNumberNew.length === 0 ? undefined : registerNumberNew,
          new PutCarDto(
            vin,
            vinNew.length === 0 ? undefined : vinNew,
            nameCarEquipment,
            sharePercentage == 0 ? undefined : sharePercentage,
            cost,
            carMileage,
            dateOfRealeseCar,
            urls
          ),
          JSON.parse(user).email,
          changeRegiterNumber === "1" ? true : false
        )
      },
      CallbackRequestPut
    );
  }

  async function GetCarEquipment() {
    setMessageError("");
    new CarEquipmentApi().apiCarequipmentsEquipmentGet(
      GetJwtToken(),
      CallbackRequestGet
    );
  }

  async function GetCarByVin(vin) {
    setMessageError("");
    new ClientCarsApi().emailWithVinGet(
      GetJwtToken(),
      { vin: vin, email: JSON.parse(user).email },
      CallbackRequest
    );
  }

  async function GetUsersList() {
    new UsersApi().apiUsersGet(GetJwtToken(), CallbackRequestUserList);
  }

  function CallbackRequestPut(error, data, response) {
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
    } else if (response.statusCode === 200 || response.statusCode === 204) {
      setRedirect(true);
    } else if (response.statusCode > 400) {
      setMessageError(JSON.parse(error.message)["error"]);
    }
  }

  function CallbackRequestGet(error, data, response) {
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
      response.body.forEach(el => {
        if (el.id === idCarEquipment) {
          setNameCarEquipment(el.name);
          checkCarEquipment = el.name;
        }
      });
      setCarEquipmentList(response.body);
      setFlag(true);
    } else if (response.statusCode > 400) {
      setMessageError(JSON.parse(error.message)["error"]);
    }
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
      console.log(response.body);
      setRegisterNumber(response.body.registerNumber);
      setVin(response.body.car.vin);
      setCarMileage(response.body.car.carMileage);
      setCost(response.body.car.cost);
      setImgsCar(response.body.car.imgsCar);
      setIdCarEquipment(response.body.car.idCarEquipment);
      new CarEquipmentApi().apiCarequipmentsEquipmentIdGet(
        GetJwtToken(),
        response.body.car.idCarEquipment,
        CallbackRequestGetById
      );
      setDateOfRealeseCar(getDate(response.body.car.dateOfRealeseCar));
      if (response.body.car.actionCar !== null)
        setSharePercentage(response.body.car.actionCar.sharePercentage);
      GetCarEquipment();
      GetUsersList();
    } else if (response.statusCode > 400) {
      setMessageError(JSON.parse(error.message)["error"]);
    }
  }

  function CallbackRequestGetById(error, data, response) {
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
      setNameCarEquipment(response.body.name);
    } else if (response.statusCode > 400) {
      setMessageError(JSON.parse(error.message)["error"]);
    }
  }

  function CallbackRequestUserList(error, data, response) {
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
      setUserList(response.body);
    } else if (response.statusCode > 400) {
      setMessageError(JSON.parse(error.message)["error"]);
    }
  }

  function AddImgs(value, i) {
    if (!value) {
      setMessageError("Wrong file type!Input number:" + i);
      return;
    }
    if (value.type.split("/")[0] !== "image") {
      setMessageError("Wrong file type!File name:" + value.name + "|Line:" + i);
    } else {
      imgsCar[i] = value;
    }
  }

  function AddField() {
    setImgsCar([...imgsCar, {}]);
  }

  function renderInput() {
    let imgs = imgsCar;
    let rows = [];
    for (let i = 0; i < imgs.length; i++) {
      rows.push(
        <div className="row">
          {imgs[i].url === undefined &&
            <div className="col">
              <label>Car image(800x600):</label>
              <div className="custom-file">
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInput}
                  onChange={e => AddImgs(e.target.files[0], i)}
                  className="custom-file-input"
                  id="inputGroupFile01"
                />
                <label className="custom-file-label" for="inputGroupFile01">
                  Choose file
                </label>
              </div>
            </div>}
          {imgs[i].url !== undefined &&
            <div className="form-group mb-3">
              <label>Car image(800x600):</label>
              <div className="custom-file">
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInput}
                  onChange={e => AddImgs(e.target.files[0], i)}
                  className="custom-file-input w"
                  id="inputGroupFile01"
                />
                <label className="custom-file-label" for="inputGroupFile01">
                  Choose file
                </label>
              </div>
              <div className=" mt-2 ">
                <img src={imgs[i].url} className="w-100 h-90" />
              </div>
            </div>}
        </div>
      );
    }
    return rows;
  }

  const styles = {
    maxWidth: "700px",
    border: "none"
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    GetCarByVin(query.get("vin"));
  }, []);

  function SetValueChangeRegisterNumber(event) {
    setChangeRegiterNumber(event.target.value);
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed className="text-white">
        <Box sx={{ bgcolor: "black" }}>
          <div className="d-flex   justify-content-center align-items-center ">
            <div className="   p-4  w-100" style={styles}>
              <div className="row mt-5">
                <h1 className="d-flex   justify-content-center align-items-center ">
                  Put client car
                </h1>
              </div>
              <div className="container mt-5">
                <form onSubmit={submitCar}>
                  <div className="row">
                    <div className="col mb-2 ">
                      <label>VIN:</label>
                      <input
                        className="w-100 shadow-lg  bg-white rounded"
                        onChange={e => setVin(e.target.value)}
                        value={vin}
                        name="vin"
                        type="text"
                        placeholder="Enter your VIN..."
                        disabled
                      />
                    </div>
                    <div className="col mb-2 ">
                      <label>Date of realese car:</label>
                      <input
                        className="w-100 shadow-lg  bg-white rounded"
                        value={dateOfRealeseCar}
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
                        value={cost}
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
                        value={carMileage}
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
                      value={sharePercentage}
                      type="number"
                      placeholder="Enter your share percentage..."
                    />
                  </div>
                  <div className="row">
                    <div className="col mb-2 ">
                      <label>Register number:</label>
                      <input
                        className="w-100 shadow-lg  bg-white rounded"
                        onChange={e => setRegisterNumber(e.target.value)}
                        name="registerNumber"
                        type="text"
                        value={registerNumber}
                        placeholder="Your register number...."
                        disabled
                      />
                    </div>
                    <div className="col mb-2 ">
                      <label>Change register number ?</label>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault1"
                          checked={changeRegiterNumber == "1" ? true : false}
                          onChange={e => SetValueChangeRegisterNumber(e)}
                          value="1"
                        />
                        <label
                          className="form-check-label"
                          for="flexRadioDefault1"
                        >
                          True
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name="flexRadioDefault"
                          id="flexRadioDefault2"
                          checked={changeRegiterNumber == "0" ? true : false}
                          onChange={e => SetValueChangeRegisterNumber(e)}
                          value="0"
                        />
                        <label
                          className="form-check-label"
                          for="flexRadioDefault2"
                        >
                          False
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="form-group mb-2 ">
                    <label>New register number:</label>
                    <input
                      className="w-100 shadow-lg  bg-white rounded"
                      onChange={e => setRegisterNumberNew(e.target.value)}
                      name="registerNumber"
                      type="text"
                      placeholder="If you don't want to change  register number, leave the field blank...."
                    />
                  </div>
                  <div className="row">
                    <div className="col mb-2 ">
                      <label>Car equipment:</label>
                      <select
                        size="1"
                        className="form-select "
                        aria-label="Default select example"
                        onChange={e => setNameCarEquipment(e.target.value)}
                      >
                        <option value="">
                          {nameCarEquipment}
                        </option>
                        {flag &&
                          carEquipmentList.map(element => {
                            if (nameCarEquipment !== element.name)
                              return (
                                <option value={element.name}>
                                  {element.name}
                                </option>
                              );
                          })}
                      </select>
                    </div>
                    <div className="col mb-2 ">
                      <label>New owner:</label>
                      <select
                        size="1"
                        className="form-select "
                        aria-label="Default select example"
                        placeholder="xxx"
                        onChange={e => setEmailNew(e.target.value)}
                      >
                        <option value="" />
                        {flag &&
                          userList.map(element => {
                            if (JSON.parse(user).email !== element.email)
                              return (
                                <option value={element.email}>
                                  {element.email}
                                </option>
                              );
                          })}
                      </select>
                    </div>
                  </div>
                  <div className="form-group mb-2 ">
                    <label>New VIN:</label>
                    <input
                      className="w-100 shadow-lg  bg-white rounded"
                      onChange={e => setVinNew(e.target.value)}
                      name="vin"
                      type="text"
                      placeholder="If you don't want to change vin, leave the field blank...."
                    />
                  </div>
                  <div className="form-group mb-2 ">
                    <label>
                      If you don't want to change img, leave the field blank....
                    </label>
                    <br />
                    {imgsCar !== undefined && renderInput(imgsCar)}
                  </div>
                  <div>
                    <button
                      className="btn btn-dark btn-rounded"
                      type="button"
                      onClick={AddField}
                    >
                      Add input file
                    </button>
                  </div>
                  <div className="d-flex mt-2 justify-content-center form-outline mb-3">
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
              <div className="row text center">
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

export default PutClientCar;