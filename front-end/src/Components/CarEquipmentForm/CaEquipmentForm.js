import React, { useEffect } from "react";
import { CarEquipmentApi } from "../../ImportExportGenClient";
import GetJwtToken from "../../Services/Jwt/GetJwtToken";
import DisplayDataCarEquipmentForm from "./DetailCarEquipmentForm";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const CarEquipmentForm = () => {
  const [MessageError, setMessageError] = React.useState("");
  const [listCarEquipmentForm, setListCarEquipmentForm] = React.useState({});
  const [viewList, setViewList] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  async function GetCarEquipmentForm() {
    handleToggle();
    setViewList(false);
    new CarEquipmentApi().apiCarequipmentsFormGet(
      GetJwtToken(),
      CallbackRequest
    );
  }

  async function DeleteCarEquipmentForm(e) {
    e.preventDefault();
    handleToggle();
    new CarEquipmentApi().apiCarequipmentsDelete(
      GetJwtToken(),
      { name: e.currentTarget.value },
      CallbackRequestDelete
    );
  }

  function CallbackRequestDelete(error, data, response) {
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
      GetCarEquipmentForm();
    } else if (response.statusCode > 400) {
      setMessageError(response.body.error);
    }
    handleClose();
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
      setListCarEquipmentForm(response.body);
      setViewList(true);
    } else if (response.statusCode > 400) {
      setMessageError(response.body.error);
    }
    handleClose();
  }

  useEffect(() => {
    GetCarEquipmentForm();
  }, []);

  let style = { width: "30rem" };

  return (
    <div className="container-md">
      <div style={style} className=" row text-wrap  text-reset text-white">
        <Backdrop
          sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }}
          open={open}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        {MessageError}
      </div>

      <div className="row mt-5 pt-5 align-items-center">
        {viewList &&
          <DisplayDataCarEquipmentForm
            data={listCarEquipmentForm}
            deleteCarEquipmentForm={DeleteCarEquipmentForm}
          />}
      </div>
    </div>
  );
};

export default CarEquipmentForm;
