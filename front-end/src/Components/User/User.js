import React, { useEffect } from "react";
import { UsersApi } from "../../api/UsersApi";
import GetJwtToken from "../../Services/Jwt/GetJwtToken";
import { GetUserDto } from "../../model/GetUserDto";
import UserListView from "../../SetListView/UserListView";
import UserItem from "./ListUsers";

const User = () => {
  const [MessageError, setMessageError] = React.useState("");
  const [listUsers, setListUsers] = React.useState([]);
  const [viewList, setViewList] = React.useState(false);

  async function GetUsersList() {
    setViewList(false)
    new UsersApi().apiUsersGet(GetJwtToken(), CallbackRequest);
  }
  async function DeleteUser(e) {
    console.log('email',e.currentTarget.value)
    new UsersApi().apiUsersDelete(
      GetJwtToken(),
      { email: e.currentTarget.value },
      CallbackRequestDeleteOrUpdateStatus
    );
  }
  async function UpdateStatusUser(e) {
    console.log('email',e.currentTarget.value)
    new UsersApi().apiUsersUpdateStatusPut(
      GetJwtToken(),
      { email: e.currentTarget.value },
      CallbackRequestDeleteOrUpdateStatus
    );
  }

  function CallbackRequestDeleteOrUpdateStatus(error, data, response) {
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
      GetUsersList();
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
      // console.log(data);
      setListUsers(
        data.map(e => {
          return GetUserDto.constructFromObject(e);
        })
      );
      setViewList(true);
    } else if (response.statusCode > 400) {
      setMessageError(JSON.parse(error.message)["error"]);
    }
  }

  useEffect(() => {
    GetUsersList();
  }, []);

  return (
    <div className="row mt-5">
      <div className="row">
        <h1 className="d-flex justify-content-center align-items-center ">
          User List
        </h1>
      </div>
      <div className="row">
        <p>
          {MessageError}
        </p>
      </div>
      <div className="row mt-5">
        {viewList && <UserItem head={UserListView()} rows={listUsers} deleteUser={DeleteUser} updateStatusUser={UpdateStatusUser}/>}
      </div>
    </div>
  );
};

export default User;
