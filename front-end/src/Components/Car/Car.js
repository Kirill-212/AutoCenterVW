import React, { useEffect } from "react";
import { Car, CarsApi } from "../../ImportExportGenClient";
import CarListView from "../../SetListView/CarListView";
import GetJwtToken from "../../Services/Jwt/GetJwtToken";
import ListCars from "./CarList";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Cars = () => {
  const [MessageError, setMessageError] = React.useState("");
  const [listCars, setListCars] = React.useState([]);
  const [viewList, setViewList] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  async function GetCarList() {
    handleToggle();
    setViewList(false);
    new CarsApi().apiCarsWithoutClientCarGet(GetJwtToken(), CallbackRequest);
  }

  async function DeleteCar(e) {
    handleToggle();
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
    handleClose();
  }

  async function UpdateCar(e) {
    handleToggle();
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
    handleClose();
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
    handleClose();
  }

  useEffect(() => {
    GetCarList();
  }, []);

  return (
    <div className="container">
      <div className="row align-items-center">
        <p className="text-reset text-white">
          {MessageError}
          <Backdrop
            sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </p>
      </div>

      <div className="row pt-5 mt-5 align-items-center">
        <div className="col-12 mt-5 pt-5  align-items-center">
          {viewList &&
            <ListCars
              head={CarListView()}
              rows={listCars}
              updateCar={UpdateCar}
              deleteCar={DeleteCar}
            />}
        </div>
      </div>
    </div>
  );
};

export default Cars;
