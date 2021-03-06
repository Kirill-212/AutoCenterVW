import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import {
  PutCarDto,
  CarsApi,
  ImgDto,
  CarEquipmentApi
} from "../../ImportExportGenClient";
import ImgService from "../../Services/ImgServices/ImgService";
import GetJwtToken from "../../Services/Jwt/GetJwtToken";
import { getDate, validate_date } from "../ViewLists/SupportFunction";

const PutCar = (props) => {
  const [nameCarEquipment, setNameCarEquipment] = React.useState("");
  const [cost, setCost] = React.useState(0);
  const [vin, setVin] = React.useState("");
  const [vinNew, setVinNew] = React.useState("");
  const [dateOfRealeseCar, setDateOfRealeseCar] = React.useState("");
  const [carMileage, setCarMileage] = React.useState(0);
  const [sharePercentage, setSharePercentage] = React.useState(0);
  const [redirect, setRedirect] = React.useState(false);
  const [carEquipmentList, setCarEquipmentList] = React.useState([]);
  const [idCarEquipment, setIdCarEquipment] = React.useState("");
  const [flag, setFlag] = React.useState(false);
  const [imgsCar, setImgsCar] = React.useState([]);
  const fileInput = React.useRef(null);
  const [flagGet, setFlagGet] = React.useState(false);
  let checkCarEquipment = "";

  async function GetCarByVin(vin) {
    props.handleToggle();
    new CarsApi().apiCarsByVinGet(GetJwtToken(), { vin: vin }, CallbackRequest);
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
      if (response.statusCode === 204) {
        props.handleClose();
        props.setMessageError("Error:Car with this vin not found.");
        return;
      }
      setVin(response.body.vin);
      setCarMileage(response.body.carMileage);
      setCost(response.body.cost);
      setImgsCar(response.body.imgsCar);
      setIdCarEquipment(response.body.idCarEquipment);
      new CarEquipmentApi().apiCarequipmentsEquipmentIdDetailGet(
        GetJwtToken(),
        response.body.idCarEquipment,
        CallbackRequestGetById
      );
      setDateOfRealeseCar(getDate(response.body.dateOfRealeseCar));
      if (response.body.actionCar !== null)
        setSharePercentage(response.body.actionCar.sharePercentage);
      GetCarEquipment();
    } else if (response.statusCode > 400) {
      props.setMessageError(response.body.error);
    }
    props.handleClose();
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
      response.body.forEach(el => {
        if (el.id === idCarEquipment) {
          setNameCarEquipment(el.name);
          checkCarEquipment = el.name;
        }
      });
      setCarEquipmentList(response.body);
    } else if (response.statusCode > 400) {
      props.setMessageError(response.body.error);
    }
    props.handleClose();
  }

  async function GetCarEquipment() {
    props.handleToggle();
    new CarEquipmentApi().apiCarequipmentsEquipmentGet(
      GetJwtToken(),
      CallbackRequestGet
    );
  }

  async function submitCar(event) {
    event.preventDefault();
    props.handleToggle();
    let date = validate_date(dateOfRealeseCar);
    if (date !== null) {
      props.setMessageError(date);
      props.handleClose();
      return;
    }
    let urls = [];
    for (let i = 0; i < imgsCar.length; i++) {
      if (imgsCar[i].name !== undefined) {
        let url = await ImgService.uploadImage(imgsCar[i]);
        if (url == undefined) {
          props.setMessageError("Error:Upload img is not valid.");
          props.handleClose();
          return;
        }
        if (url.height !== 600 || url.width !== 800) {
          props.setMessageError(
            "Error:Valid size 800x600:File name:" +
              imgsCar[i].name +
              "|Line" +
              i
          );
          props.handleClose();
          return;
        }
        urls.push(new ImgDto(url.url));
      } else {
        if (imgsCar[i].url !== undefined) urls.push(new ImgDto(imgsCar[i].url));
      }
    }

    new CarsApi().apiCarsPut(
      GetJwtToken(),
      {
        body: new PutCarDto(
          vin,
          vinNew.length === 0 ? undefined : vinNew,
          nameCarEquipment,
          sharePercentage == 0 ? undefined : sharePercentage,
          cost,
          carMileage,
          dateOfRealeseCar,
          urls
        )
      },
      CallbackRequestPut
    );
  }

  function CallbackRequestPut(error, data, response) {
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
      setRedirect(true);
    } else if (response.statusCode > 400) {
      props.setMessageError(response.body.error);
    }
    props.handleClose();
  }

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    GetCarByVin(query.get("vin"));
  }, []);

  function CallbackRequestGetById(error, data, response) {
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
        props.setMessageError("Error:Car equipment with this name not found.");
        return;
      }
      setFlagGet(response.body.isDeleted);
      setNameCarEquipment(response.body.name);
      setFlag(true);
    } else if (response.statusCode > 400) {
      props.setMessageError(response.body.error);
    }
    props.handleClose();
  }

  async function AddImgs(value, i) {
    if (!value) {
      props.setMessageError("Error:Wrong file type!Input number:" + i);
      return;
    }
    if (value.type.split("/")[0] !== "image") {
      props.setMessageError(
        "Error:Wrong file type!File name:" + value.name + "|Line:" + i
      );
    } else {
      let url = await ImgService.uploadImage(value);
      if (url == undefined) {
        props.setMessageError("Error:Upload img is not valid.");
        return;
      }
      if (url.height !== 600 || url.width !== 800) {
        props.setMessageError(
          "Error:Valid size 800x600:File name:" + value.name + "|Line" + i
        );
        return;
      }
      imgsCar[i] = new ImgDto(url.url);
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
                  Choose file(800x600)
                </label>
              </div>
            </div>}
          {imgs[i].url !== undefined &&
            <div className="form-group mb-3">
              <label>Car image:</label>
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
                  Choose file(800x600)
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

  return (
    <div className="d-flex   justify-content-center w-40 align-items-center ">
      <div className="p-4 w-50 bg-dark text-white h-100">
        <div className="row mt-5">
          <h1 className="d-flex   justify-content-center align-items-center ">
            Put car
          </h1>
        </div>
        <div className="container mt-3">
          <form onSubmit={submitCar}>
            <div className="form-group mb-2 ">
              <label>VIN:</label>
              <input
                disabled
                value={vin}
                className="w-100 shadow-lg  bg-white rounded"
                onChange={e => setVin(e.target.value)}
                name="vin"
                type="text"
                placeholder="Enter your VIN..."
              />
            </div>
            <div className="form-group mb-2 ">
              <label>New VIN:</label>
              <input
                className="w-100 shadow-lg  bg-white rounded"
                onChange={e => setVinNew(e.target.value)}
                name="vin"
                type="text"
                placeholder="If you don't want to change  vin, leave the field blank...."
              />
            </div>
            <div className="row">
              <div className="col mb-2 ">
                <label>Date of realese car:</label>
                <input
                  value={dateOfRealeseCar}
                  className="w-100 shadow-lg  bg-white rounded"
                  onChange={e => setDateOfRealeseCar(e.target.value)}
                  name="dateOfRealeseCar"
                  type="date"
                  placeholder="Enter your date of realese car..."
                  required
                />
              </div>
              <div className="col mb-2 ">
                <label>Cost($):</label>
                <input
                  value={cost}
                  className="w-100 shadow-lg  bg-white rounded"
                  onChange={e => setCost(e.target.value)}
                  min="1"
                  max="1000000"
                  name="cost"
                  type="number"
                  placeholder="Enter your cost..."
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col mb-2 ">
                <label>Car mileage(km):</label>
                <input
                  required
                  value={carMileage}
                  min="1"
                  max="1000000"
                  className="w-100 shadow-lg  bg-white rounded"
                  onChange={e => setCarMileage(e.target.value)}
                  name="carMileage"
                  type="number"
                  placeholder="Enter your car mileage..."
                />
              </div>
              <div className="col mb-2 ">
                <label>Share percentage(%):</label>
                <input
                  value={sharePercentage}
                  min="0"
                  max="100"
                  className="w-100 shadow-lg  bg-white rounded"
                  onChange={e => setSharePercentage(e.target.value)}
                  name="sharePercentage"
                  type="number"
                  placeholder="Enter your share percentage..."
                />
              </div>
            </div>
            <div className="form-group mb-2 ">
              <label>Car equipment:</label>
              <select
                size="1"
                className="form-select "
                aria-label="Default select example"
                onChange={e => setNameCarEquipment(e.target.value)}
                required
              >
                {flagGet && <option value="" />}
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
            <div className="d-flex justify-content-center form-outline mt-3">
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
        {redirect && <Navigate to={"/car"} />}
      </div>
    </div>
  );
};

export default PutCar;
