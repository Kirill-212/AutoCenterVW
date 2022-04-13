import React, { useEffect, useContext } from "react";
import { EmployeesApi } from "../../api/EmployeesApi";
import GetJwtToken from "../../Services/Jwt/GetJwtToken";
import EmployeeListView from "../../SetListView/EmployeeListView";
import ListEmployee from "./ListEmployee";
import { GetEmployeeDto } from "../../model/GetEmployeeDto";
import { UsersApi } from "../../ImportExportGenClient";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Context from "../../context";

const Employee = () => {
  const { user } = useContext(Context);
  const [MessageError, setMessageError] = React.useState("");
  const [listEmployees, setListEmployees] = React.useState([]);
  const [viewList, setViewList] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  async function GetEmployeeList() {
    handleToggle();
    setViewList(false);
    new EmployeesApi().apiEmployeesGet(GetJwtToken(), CallbackRequest);
  }

  async function DeleteEmployee(e) {
    handleToggle();
    new UsersApi().apiUsersDelete(
      GetJwtToken(),
      { email: e.currentTarget.value },
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
      GetEmployeeList();
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
      setListEmployees(
        data.map(e => {
          return GetEmployeeDto.constructFromObject(e);
        })
      );
      setViewList(true);
    } else if (response.statusCode > 400) {
      setMessageError(JSON.parse(error.message)["error"]);
    }
    handleClose();
  }

  useEffect(() => {
    GetEmployeeList();
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
            <ListEmployee
              head={EmployeeListView()}
              rows={listEmployees}
              getList={GetEmployeeList}
              email={JSON.parse(user).email}
              deleteEmployee={DeleteEmployee}
            />}
        </div>
      </div>
    </div>
  );
};

export default Employee;
