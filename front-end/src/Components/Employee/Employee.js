import React, { useEffect } from "react";
import { EmployeesApi } from "../../api/EmployeesApi";
import GetJwtToken from "../../Services/Jwt/GetJwtToken";
import EmployeeListView from "../../SetListView/EmployeeListView";
import ListEmployee from "./ListEmployee";
import { GetEmployeeDto } from "../../model/GetEmployeeDto";
const Employee = () => {
  const [MessageError, setMessageError] = React.useState("");
  const [listEmployees, setListEmployees] = React.useState([]);
  const [viewList, setViewList] = React.useState(false);

  async function GetEmployeeList() {
    setViewList(false)
    new EmployeesApi().apiEmployeesGet(GetJwtToken(), CallbackRequest);
  }
  async function DeleteEmployee(e) {
    console.log('email',e.currentTarget.value)
    new EmployeesApi().apiEmployeesDelete(
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
    } else if (response.statusCode == 401) {
      setMessageError("Unauthorized");
    } else if (response.statusCode === 200 || response.statusCode === 204) {
        GetEmployeeList()
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
        console.log(data)
      setListEmployees(
        data.map(e => {
          return GetEmployeeDto.constructFromObject(e);
        })
      );
      setViewList(true);
    } else if (response.statusCode > 400) {
      setMessageError(JSON.parse(error.message)["error"]);
    }
  }

  useEffect(() => {
    GetEmployeeList()
  }, []);

  return (
    <div className="row mt-5">
      <div className="row">
        <h1 className="d-flex justify-content-center align-items-center ">
          Employee List
        </h1>
      </div>
      <div className="row">
        <p>
          {MessageError}
        </p>
      </div>
      <div className="row mt-5">
        {viewList && <ListEmployee head={EmployeeListView()} rows={listEmployees} deleteEmployee={DeleteEmployee} />}
      </div>
    </div>
  );
};

export default Employee;
