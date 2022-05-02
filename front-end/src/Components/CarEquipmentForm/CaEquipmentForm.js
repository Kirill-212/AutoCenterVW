import React, { useEffect } from "react";
import { CarEquipmentApi } from "../../ImportExportGenClient";
import GetJwtToken from "../../Services/Jwt/GetJwtToken";
import DisplayDataCarEquipmentForm from "./DetailCarEquipmentForm";

const CarEquipmentForm = (props) => {
  const [listCarEquipmentForm, setListCarEquipmentForm] = React.useState({});
  const [viewList, setViewList] = React.useState(false);

  async function GetCarEquipmentForm() {
    props.handleToggle();
    setViewList(false);
    new CarEquipmentApi().apiCarequipmentsFormGet(
      GetJwtToken(),
      CallbackRequest
    );
  }

  async function DeleteCarEquipmentForm(e) {
    e.preventDefault();
    props.handleToggle();
    new CarEquipmentApi().apiCarequipmentsDelete(
      GetJwtToken(),
      { name: e.currentTarget.value },
      CallbackRequestDelete
    );
  }

  function CallbackRequestDelete(error, data, response) {
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
      GetCarEquipmentForm();
    } else if (response.statusCode > 400) {
      props.setMessageError(response.body.error);
    }
    props.handleClose();
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
      setListCarEquipmentForm(response.body);
      setViewList(true);
    } else if (response.statusCode > 400) {
      props.setMessageError(response.body.error);
    }
    props.handleClose();
  }

  useEffect(() => {
    GetCarEquipmentForm();
  }, []);


  return (
    <div className="container-md">     
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
