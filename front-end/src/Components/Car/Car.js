import React, { useContext, useEffect } from "react";
import { Car, CarsApi } from "../../ImportExportGenClient";
import Context from "../../context";
import CarListView from "../../SetListView/CarListView";
import GetJwtToken from "../../Services/Jwt/GetJwtToken";
import ListCars from "./CarList";
const Cars = () => {
  const [MessageError, setMessageError] = React.useState("");
  const [listCars, setListCars] = React.useState([]);
  const [viewList, setViewList] = React.useState(false);

  async function GetCarList() {
    setViewList(false);
    new CarsApi().apiCarsWithoutClientCarGet(GetJwtToken(), CallbackRequest);
  }
  async function DeleteCar(e) {
    console.log("email", e.currentTarget.value);
    new CarsApi().apiCarsDelete(
      GetJwtToken(),
      { vin: e.currentTarget.value },
      CallbackRequestDeleteOrUpdate
    );
  }

  function CallbackRequestDeleteOrUpdate(error, data, response) {
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
      GetCarList();
    } else if (response.statusCode > 400) {
      setMessageError(JSON.parse(error.message)["error"]);
    }
  }
  async function UpdateCar(e) {
    console.log("email", e.currentTarget.value);
    new CarsApi().updateStatusGet(
      GetJwtToken(),
      { vin: e.currentTarget.value },
      CallbackRequestDeleteOrUpdate
    );
  }

  function CallbackRequestDeleteOrUpdate(error, data, response) {
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
      GetCarList();
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
      setListCars(
        data.map(e => {
          return Car.constructFromObject(e);
        })
      );
      setViewList(true);
    } else if (response.statusCode > 400) {
      setMessageError(JSON.parse(error.message)["error"]);
    }
  }

  useEffect(() => {
    GetCarList();
  }, []);

  return (
    <div className="container-md">
      <div className="row align-items-center">
        <p className="text-reset text-white">
          {MessageError}
        </p>
      </div>

      <div className="row mt-5 pt-5 align-items-center">
        {viewList &&
          <ListCars
            head={CarListView()}
            rows={listCars}
            updateCar={UpdateCar}
            deleteCar={DeleteCar}
          />}
      </div>
    </div>
  );
};

export default Cars;
