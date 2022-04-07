import React, { useContext, useEffect } from "react";
import { CarEquipmentApi } from "../../ImportExportGenClient";
import GetJwtToken from "../../Services/Jwt/GetJwtToken";
import ListCarEquipments from "./ListCarEquipment";

const CarEquipments = () => {
  const [MessageError, setMessageError] = React.useState("");
  const [listCarEquipments, setListCarEquipments] = React.useState([]);
  const [viewList, setViewList] = React.useState(false);

  async function GetCarEquipmentsList() {
    setViewList(false);
    new CarEquipmentApi().apiCarequipmentsEquipmentGet(
      GetJwtToken(),
      CallbackRequest
    );
  }
  async function DeleteCarEquipments(e) {
    e.preventDefault();
    new CarEquipmentApi().apiCarequipmentsEquipmentDelete(
      GetJwtToken(),
      { name: e.currentTarget.value },
      CallbackRequestDelete
    );
  }

  function CallbackRequestDelete(error, data, response) {
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
      GetCarEquipmentsList();
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
      setListCarEquipments(response.body);
      setViewList(true);
    } else if (response.statusCode > 400) {
      setMessageError(JSON.parse(error.message)["error"]);
    }
  }

  useEffect(() => {
    GetCarEquipmentsList();
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
          <ListCarEquipments
            data={listCarEquipments}
            deleteCarEquipment={DeleteCarEquipments}
          />}
      </div>
    </div>
  );
};

export default CarEquipments;
