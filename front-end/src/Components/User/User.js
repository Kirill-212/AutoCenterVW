import React, { useContext, useEffect } from "react";
import { UsersApi } from "../../api/UsersApi";
import GetJwtToken from "../../Services/Jwt/GetJwtToken";
import { GetUserDto } from "../../model/GetUserDto";
import UserListView from "../../SetListView/UserListView";
import UserItem from "./ListUsers";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Context from "../../context";
const User = () => {
  const { user } = useContext(Context);
  const [MessageError, setMessageError] = React.useState("");
  const [listUsers, setListUsers] = React.useState([]);
  const [viewList, setViewList] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };
  async function GetUsersList() {
    handleToggle();
    setViewList(false);
    new UsersApi().apiUsersGet(GetJwtToken(), CallbackRequest);
  }
  async function DeleteUser(e) {
    handleToggle();
    new UsersApi().apiUsersDelete(
      GetJwtToken(),
      { email: e.currentTarget.value },
      CallbackRequestDeleteOrUpdateStatus
    );
  }
  async function UpdateStatusUser(e) {
    handleToggle();
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
    } else if (response.statusCode == 403) {
      setMessageError("Forbidden");
    } else if (response.statusCode == 401) {
      setMessageError("Unauthorized");
    } else if (response.statusCode === 200 || response.statusCode === 204) {
      GetUsersList();
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
    } else if (response.statusCode === 403) {
      setMessageError("Forbidden");
    } else if (response.statusCode === 401) {
      setMessageError("Unauthorized");
    } else if (response.statusCode === 200 || response.statusCode === 204) {
      setListUsers(
        data.map(e => {
          return GetUserDto.constructFromObject(e);
        })
      );
      setViewList(true);
    } else if (response.statusCode > 400) {
      setMessageError(JSON.parse(error.message)["error"]);
    }
    handleClose();
  }

  useEffect(() => {
    GetUsersList();
  }, []);
  let style = { width: "30rem" };
  return (
    <div className="container">
      <div className="row align-items-center">
        <p style={style} class="text-wrap  text-reset text-white">
          <Backdrop
            sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          {MessageError}
        </p>
      </div>
      <div className="row align-items-center">
        <div className="col-12 mt-5 pt-5  align-items-center">
          {viewList &&
            <UserItem
              head={UserListView()}
              rows={listUsers}
              email={JSON.parse(user).email}
              deleteUser={DeleteUser}
              getUsersList={GetUsersList}
              updateStatusUser={UpdateStatusUser}
            />}
        </div>
      </div>
    </div>
  );
};

export default User;
