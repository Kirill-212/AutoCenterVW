import React, { useEffect, useContext } from "react";
import { EmployeesApi } from "../../api/EmployeesApi";
import GetJwtToken from "../../Services/Jwt/GetJwtToken";
import EmployeeListView from "../../SetListView/EmployeeListView";
import ListEmployee from "./ListEmployee";
import { GetEmployeeDto } from "../../model/GetEmployeeDto";
import { UsersApi } from "../../ImportExportGenClient";
import Context from "../../context";

const Employee = (props) => {
  const { user } = useContext(Context);
  const [listEmployees, setListEmployees] = React.useState([]);
  const [viewList, setViewList] = React.useState(false);

  async function GetEmployeeList() {
    props.handleToggle();
    setViewList(false);
    new EmployeesApi().apiEmployeesGet(GetJwtToken(), CallbackRequest);
  }

  async function DeleteEmployee(e) {
    props.handleToggle();
    new UsersApi().apiUsersDelete(
      GetJwtToken(),
      { email: e.currentTarget.value },
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
      GetEmployeeList();
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
      setListEmployees(
        data.map(e => {
          return GetEmployeeDto.constructFromObject(e);
        })
      );
      setViewList(true);
    } else if (response.statusCode > 400) {
      props.setMessageError(response.body.error);
    }
    props.handleClose();
  }

  useEffect(() => {
    GetEmployeeList();
  }, []);


  return (
    <div className="container">
      <div className="row align-items-center">
        <div className="col-12 mt-5 pt-5  align-items-center">
          {viewList &&
            <ListEmployee
              head={EmployeeListView()}
              rows={listEmployees}
              getList={GetEmployeeList}
              email={user}
              deleteEmployee={DeleteEmployee}
            />}
        </div>
      </div>
    </div>
  );
};

export default Employee;
