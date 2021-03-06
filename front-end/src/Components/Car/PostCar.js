import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import {
  PostCarDto,
  CarsApi,
  ImgDto,
  CarEquipmentApi
} from "../../ImportExportGenClient";
import ImgService from "../../Services/ImgServices/ImgService";
import GetJwtToken from "../../Services/Jwt/GetJwtToken";
import { validate_date } from "../ViewLists/SupportFunction";

const PostCar = (props) => {
  const [nameCarEquipment, setNameCarEquipment] = React.useState("");
  const [cost, setCost] = React.useState(0);
  const [vin, setVin] = React.useState("");
  const [dateOfRealeseCar, setDateOfRealeseCar] = React.useState("");
  const [carMileage, setCarMileage] = React.useState(0);
  const [sharePercentage, setSharePercentage] = React.useState(0);
  const [redirect, setRedirect] = React.useState(false);
  const [carEquipmentList, setCarEquipmentList] = React.useState([]);
  const [flag, setFlag] = React.useState(false);
  const [imgs, setImgs] = React.useState([]);

  async function GetCarEquipment() {
    props.handleToggle();
    new CarEquipmentApi().apiCarequipmentsEquipmentGet(
      GetJwtToken(),
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
      setCarEquipmentList(response.body);
      setFlag(true);
    } else if (response.statusCode > 400) {
      props.setMessageError(response.body.error);
    }
    props.handleClose();
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
    for (let i = 0; i < imgs.length; i++) {
      if (!imgs[i]) {
        props.setMessageError("Error:Wrong file type!");
        props.handleClose();
        return;
      }
      if (imgs[i].type.split("/")[0] !== "image") {
        props.setMessageError("Error:Wrong file type!");
        props.handleClose();
        return;
      }
      let url = await ImgService.uploadImage(imgs[i]);
      if (url == undefined) {
        props.setMessageError("Error:Upload img is not valid.");
        props.handleClose();
        return;
      }
      if (url.height !== 600 || url.width !== 800) {
        props.setMessageError("Error:Valid size 800x600:File name:" + imgs[i].name);
        props.handleClose();
        return;
      }
      urls.push(new ImgDto(url.url));
    }
    new CarsApi().apiCarsPost(
      GetJwtToken(),
      {
        body: new PostCarDto(
          sharePercentage == 0 ? undefined : sharePercentage,
          vin,
          nameCarEquipment,
          cost,
          carMileage,
          dateOfRealeseCar,
          urls
        )
      },
      CallbackRequestPost
    );
  }

  function CallbackRequestPost(error, data, response) {
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
    GetCarEquipment();
  }, []);

  return (
    <div className="d-flex   justify-content-center w-40 align-items-center ">
      <div className="p-4 w-25 bg-dark text-white h-100">
        <div className="row mt-5">
          <h1 className="d-flex   justify-content-center align-items-center ">
            Post car
          </h1>
        </div>
        <div className="container  mt-5 pt-5">
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
                  min="1"
                  max="1000000"
                  placeholder="Enter your cost..."
                  required
                />
              </div>
              <div className="col mb-2 ">
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
            </div>
            <div className="form-group mb-2 ">
              <label>Share percentage(%):</label>
              <input
                className="w-100 shadow-lg  bg-white rounded"
                onChange={e => setSharePercentage(e.target.value)}
                name="sharePercentage"
                type="number"
                min="0"
                max="100"
                placeholder="Enter your share percentage..."
              />
            </div>
            <div className="form-group mb-2 ">
              <label>Car mileage(km):</label>
              <input
                className="w-100 shadow-lg  bg-white rounded"
                onChange={e => setCarMileage(e.target.value)}
                name="carMileage"
                type="number"
                min="1"
                max="1000000"
                placeholder="Enter your car mileage..."
                required
              />
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
        {redirect && <Navigate to={"/car"} />}
      </div>
    </div>
  );
};

export default PostCar;
