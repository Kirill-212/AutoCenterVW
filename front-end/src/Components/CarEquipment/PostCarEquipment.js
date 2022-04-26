import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import {
  CarEquipmentApi,
  PostCarEquipmentDto,
  CarEquipmentFormItemDto,
  ValueCarEquipmentDto
} from "../../ImportExportGenClient";
import GetJwtToken from "../../Services/Jwt/GetJwtToken";

const PostCarEquipment = (props) => {
  const [name, setName] = React.useState("");
  const [redirect, setRedirect] = React.useState(false);
  const [flag, setFlag] = React.useState(false);
  const [carEquipmentList, setCarEquipmentList] = React.useState([]);
  const [key, setKey] = React.useState([]);
  const [carEquipment, setCarEquipment] = React.useState([]);

  async function GetFormCarEquipment() {
    props.handleToggle();
    new CarEquipmentApi().apiCarequipmentsFormGet(
      GetJwtToken(),
      CallbackRequest
    );
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
      setCarEquipmentList(response.body);
      setFlag(true);
    } else if (response.statusCode > 400) {
      props.setMessageError(response.body.error);
    }
    props.handleClose();
  }

  function RenderRadioButton(input, name, nameEquipment) {
    let returnButtons = [];

    for (let j in input) {
      returnButtons.push(
        <div className="form-check">
          <label>
            Value: {input[j].value} Cost(<i className="fa-solid fa-dollar-sign" />): {input[j].cost}
            <input
              className="form-check-input"
              type="radio"
              value={JSON.stringify({
                name: name,
                value: input[j].value,
                cost: input[j].cost,
                nameEquipment: nameEquipment
              })}
              name={name}
            />
          </label>
        </div>
      );
    }
    return returnButtons;
  }

  function RenderCarEquipment() {
    let radioButtonsCarEuipment = [];
    for (let i in carEquipmentList) {
      if (!key.includes(carEquipmentList[i].equipmentItems))
        key.push(carEquipmentList[i].equipmentItems);
      radioButtonsCarEuipment.push(
        <div>
          <label>
            Name: {carEquipmentList[i].name}
          </label>
          <div onChange={e => onChangeValue(e)}>
            {RenderRadioButton(
              carEquipmentList[i].equipmentItems,
              i,
              carEquipmentList[i].name
            )}
          </div>
        </div>
      );
    }
    return radioButtonsCarEuipment;
  }

  async function submitCarEquipment(event) {
    event.preventDefault();
    props.handleToggle();
    new CarEquipmentApi().apiCarequipmentsEquipmentPost(
      GetJwtToken(),
      {
        body: new PostCarEquipmentDto(
          name,
          carEquipment.map(r => {
            return new CarEquipmentFormItemDto(
              r.nameEquipment,
              new ValueCarEquipmentDto(r.value, r.cost)
            );
          })
        )
      },
      CallbackRequestPost
    );
  }

  function CallbackRequestPost(error, data, response) {
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
      setRedirect(true);
    } else if (response.statusCode > 400) {
      props.setMessageError(response.body.error);
    }
    props.handleClose();
  }

  function onChangeValue(event) {
    let valuePush = JSON.parse(event.target.value);
    let arr = carEquipment.map(r => {
      return r.name;
    });
    if (!arr.includes(valuePush.name)) {
      carEquipment.push(valuePush);
    } else {
      for (let variablqe in carEquipment) {
        if (carEquipment[variablqe].name === valuePush.name) {
          carEquipment[variablqe] = valuePush;
        }
      }
    }
  }

  useEffect(() => {
    GetFormCarEquipment();
  }, []);


  return (
    <div className="d-flex   justify-content-center w-40  align-items-center ">
      <div className="p-4  bg-dark text-white h-100">
        <div className="row mt-5">
          <h1 className="d-flex   justify-content-center align-items-center ">
            Post car equipment
          </h1>
        </div>
        <div className="container mt-5 pt-5">
          <form onSubmit={submitCarEquipment}>
            <div className="form-group mb-2 ">
              <label>Name car equipment:</label>
              <input
                className="w-100 shadow-lg  bg-white rounded"
                onChange={e => setName(e.target.value)}
                name="name"
                type="text"
                placeholder="Enter your name car equipment..."
                required
              />
            </div>

            <div className="form-group mb-2 ">
              <label>Car equipment:</label>
              {flag && RenderCarEquipment()}
            </div>
            <div className="d-flex justify-content-center form-outline mb-3">
              <div className="flex-fill">
                <button
                  type="submit"
                  className="btn btn-secondary btn-rounded w-100 "
                >
                  Post
                </button>
              </div>
            </div>
          </form>
        </div>
        {redirect && <Navigate to={"/home"} />}
      </div>
    </div>
  );
};

export default PostCarEquipment;
