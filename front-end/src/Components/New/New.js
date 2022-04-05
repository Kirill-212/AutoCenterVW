import React, { useEffect } from "react";
import { GetNewDto, NewApi } from "../../ImportExportGenClient";
import GetJwtToken from "../../Services/Jwt/GetJwtToken";
import ListNews from "./ListNews";

const New = () => {
  const [MessageError, setMessageError] = React.useState("");
  const [listNew, setListNew] = React.useState([]);
  const [viewList, setViewList] = React.useState(false);

  async function GetNewList() {
    setViewList(false);
    new NewApi().apiNewsGet(GetJwtToken(), CallbackRequest);
  }
  async function DeleteNew(e) {
    console.log("email", e.currentTarget.value);
    new NewApi().apiNewsDelete(
      GetJwtToken(),
      { title: e.currentTarget.value },
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
    } else if (response.statusCode == 401) {
      setMessageError("Unauthorized");
    } else if (response.statusCode === 200 || response.statusCode === 204) {
      GetNewList();
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
    } else if (response.statusCode == 401) {
      setMessageError("Unauthorized");
    } else if (response.statusCode === 200 || response.statusCode === 204) {
      console.log(data);
      setListNew(
        data.map(e => {
          return GetNewDto.constructFromObject(e);
        })
      );
      setViewList(true);
    } else if (response.statusCode > 400) {
      setMessageError(JSON.parse(error.message)["error"]);
    }
  }

  useEffect(() => {
    GetNewList();
  }, []);

  return (
    <div className="row mt-5">
      <div className="row">
        <h1 className="d-flex justify-content-center align-items-center ">
          New List
        </h1>
      </div>
      <div className="row">
        <p>
          {MessageError}
        </p>
      </div>
      <div className="row mt-5">
        {viewList && <ListNews rows={listNew} deleteNew={DeleteNew} />}
      </div>
    </div>
  );
};

export default New;
