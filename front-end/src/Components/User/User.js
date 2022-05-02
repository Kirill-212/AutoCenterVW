import React, { useContext, useEffect } from "react";
import { UsersApi } from "../../api/UsersApi";
import GetJwtToken from "../../Services/Jwt/GetJwtToken";
import { GetUserDto } from "../../model/GetUserDto";
import UserListView from "../../SetListView/UserListView";
import UserItem from "./ListUsers";
import Context from "../../context";

const User = (props) => {
  const { user } = useContext(Context);
  const [listUsers, setListUsers] = React.useState([]);
  const [viewList, setViewList] = React.useState(false);

  async function GetUsersList() {
    props.handleToggle();
    setViewList(false);
    new UsersApi().apiUsersGet(GetJwtToken(), CallbackRequest);
  }

  async function DeleteUser(e) {
    props.handleToggle();
    new UsersApi().apiUsersDelete(
      GetJwtToken(),
      { email: e.currentTarget.value },
      CallbackRequestDeleteOrUpdateStatus
    );
  }

  async function UpdateStatusUser(e) {
    props.handleToggle();
    new UsersApi().apiUsersUpdateStatusPut(
      GetJwtToken(),
      { email: e.currentTarget.value },
      CallbackRequestDeleteOrUpdateStatus
    );
  }

  function CallbackRequestDeleteOrUpdateStatus(error, data, response) {
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
      GetUsersList();
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
    } else if (response.statusCode === 403) {
      props.setMessageError("Error:Forbidden");
    } else if (response.statusCode === 401) {
      props.setMessageError("Error:Unauthorized");
    } else if (response.statusCode === 200 || response.statusCode === 204) {
      setListUsers(
        data.map(e => {
          return GetUserDto.constructFromObject(e);
        })
      );
      setViewList(true);
    } else if (response.statusCode > 400) {
      props.setMessageError(response.body.error);
    }
    props.handleClose();
  }

  useEffect(() => {
    GetUsersList();
  }, []);

  return (
    <div className="container-md">
      <div className="row align-items-center">
        <div className="col-12 mt-5 pt-5  align-items-center">
          {viewList &&
            <UserItem
              head={UserListView()}
              rows={listUsers}
              email={user}
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
