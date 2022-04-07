import React, { useContext, useEffect } from "react";
import { Car, CarsApi, ClientCarsApi } from "../../ImportExportGenClient";
import ClientCarListView from "../../SetListView/ClientCarListView";
import GetJwtToken from "../../Services/Jwt/GetJwtToken";
import ListClientCars from "./ClientCarList";
const ClientCars = () => {
  const [MessageError, setMessageError] = React.useState("");
  const [listClientCars, setListClientCars] = React.useState([]);
  const [viewList, setViewList] = React.useState(false);

  async function GetClientCarList() {
    setViewList(false);
    new ClientCarsApi().apiClientcarsGet(GetJwtToken(), CallbackRequest);
  }
  async function DeleteClientCar(e) {
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
      GetClientCarList();
    } else if (response.statusCode > 400) {
      setMessageError(JSON.parse(error.message)["error"]);
    }
  }
  async function UpdateClientCar(e) {
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
      GetClientCarList();
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
      setListClientCars(response.body);
      setViewList(true);
    } else if (response.statusCode > 400) {
      setMessageError(JSON.parse(error.message)["error"]);
    }
  }

  useEffect(() => {
    GetClientCarList();
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
          <ListClientCars
            head={ClientCarListView()}
            rows={listClientCars}
            updateClientCar={UpdateClientCar}
            deleteClientCar={DeleteClientCar}
          />}
      </div>
    </div>
  );
};

export default ClientCars;
