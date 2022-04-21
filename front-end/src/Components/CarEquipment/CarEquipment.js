import React, { useEffect, useContext } from "react";
import { CarEquipmentApi } from "../../ImportExportGenClient";
import GetJwtToken from "../../Services/Jwt/GetJwtToken";
import ListCarEquipments from "./ListCarEquipment";
import Context from "../../context";

const CarEquipments = (props) => {
  const { user } = useContext(Context);
  const [listCarEquipments, setListCarEquipments] = React.useState([]);
  const [viewList, setViewList] = React.useState(false);

  async function GetCarEquipmentsList() {
    setViewList(false);
    props.handleToggle();
    new CarEquipmentApi().apiCarequipmentsEquipmentGet(
      GetJwtToken(),
      CallbackRequest
    );
  }

  async function DeleteCarEquipments(e) {
    e.preventDefault();
    props.handleToggle();
    new CarEquipmentApi().apiCarequipmentsEquipmentDelete(
      GetJwtToken(),
      { name: e.currentTarget.value },
      CallbackRequestDelete
    );
  }

  function CallbackRequestDelete(error, data, response) {
    if (response == undefined) {
      props.setMessageError("Error:server is not available");
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
      GetCarEquipmentsList();
    } else if (response.statusCode > 400) {
      props.setMessageError(response.body.error);
    }
    props.handleClose();
  }

  function CallbackRequest(error, data, response) {
    if (response == undefined) {
      props.setMessageError("Error:server is not available");
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
      setListCarEquipments(response.body);
      setViewList(true);
    } else if (response.statusCode > 400) {
      props.setMessageError(response.body.error);
    }
    props.handleClose();
  }

  useEffect(() => {
    GetCarEquipmentsList();
  }, []);


  return (
    <div className="container-md">
      <div className="row mt-5 pt-5 align-items-center">
        {viewList &&
          <ListCarEquipments
            data={listCarEquipments}
            roleName={user}
            deleteCarEquipment={DeleteCarEquipments}
          />}
      </div>
    </div>
  );
};

export default CarEquipments;
