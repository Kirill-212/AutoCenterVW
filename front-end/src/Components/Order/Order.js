import React, { useContext, useEffect } from "react";
import { CarsApi, OrdersApi, PostOrderDto } from "../../ImportExportGenClient";
import OrderListView from "../../SetListView/OrderListView";
import GetJwtToken from "../../Services/Jwt/GetJwtToken";
import CarList from "./CarList";
import Context from "../../context";
const ClientCars = () => {
  const { user } = useContext(Context);
  const [MessageError, setMessageError] = React.useState("");
  const [listCars, setListCars] = React.useState([]);
  const [viewList, setViewList] = React.useState(false);

  async function GetCarList() {
    setViewList(false);
    new CarsApi().activeGet(GetJwtToken(), CallbackRequest);
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
      setListCars(response.body);
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
      <div className="row mt-5 pt-5 align-items-center">
        {viewList && <CarList head={OrderListView()} rows={listCars} />}
      </div>
      <div className="row align-items-center">
        <p className="text-reset text-white  mt-5">
          {MessageError}
        </p>
      </div>
    </div>
  );
};

export default ClientCars;
