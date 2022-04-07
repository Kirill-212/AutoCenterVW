import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import {
  CarEquipmentApi,
  PostCarEquipmentDto,
  CarEquipmentFormItemDto,
  ValueCarEquipmentDto
} from "../../ImportExportGenClient";
import ImgService from "../../Services/ImgServices/ImgService";
import Context from "../../context";
import GetJwtToken from "../../Services/Jwt/GetJwtToken";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
const PostCarEquipment = () => {
  const { user } = useContext(Context);
  const [name, setName] = React.useState("");
  const [MessageError, setMessageError] = React.useState("");
  const [redirect, setRedirect] = React.useState(false);
  const [flag, setFlag] = React.useState(false);
  const [carEquipmentList, setCarEquipmentList] = React.useState([]);
  const [key, setKey] = React.useState([]);
  const [carEquipment, setCarEquipment] = React.useState([]);

  async function GetFormCarEquipment() {
    setMessageError("");
    new CarEquipmentApi().apiCarequipmentsFormGet(
      GetJwtToken(),
      CallbackRequest
    );
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
      setCarEquipmentList(response.body);
      setFlag(true);
    } else if (response.statusCode > 400) {
      setMessageError(JSON.parse(error.message)["error"]);
    }
  }

  function RenderRadioButton(input, name, nameEquipment) {
    let returnButtons = [];

    for (let j in input) {
      returnButtons.push(
        <div className="form-check">
          <label>
            Value: {input[j].value} Cost: {input[j].cost}
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
    // console.log(carEquipmentList);
    for (let i in carEquipmentList) {
      //  console.log();
      if (!key.includes(carEquipmentList[i].equipmentItems))
        key.push(carEquipmentList[i].equipmentItems);
      radioButtonsCarEuipment.push(
        <div>
          <label>
            {carEquipmentList[i].name}
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
    setMessageError("");
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
      setRedirect(true);
    } else if (response.statusCode > 400) {
      setMessageError(JSON.parse(error.message)["error"]);
    }
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
    console.log(carEquipment);
  }

  const styles = {
    maxWidth: "700px",
    border: "none"
  };

  useEffect(() => {
    GetFormCarEquipment();
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed className="text-white">
        <Box sx={{ bgcolor: "black" }}>
          <div className="d-flex   justify-content-center align-items-center ">
            <div className="p-4  w-100" style={styles}>
              <div className="row mt-5">
                <h1 className="d-flex   justify-content-center align-items-center ">
                  Post car equipment
                </h1>
              </div>
              <div className="container mt-5">
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
              <div className="row text-center">
                <div className="col">
                  <a className="text-reset text-white" href={"/" + JSON.parse(user).roleName.toLowerCase()}>
                    Home
                  </a>
                </div>
              </div>
              <div>
                {redirect &&
                  <Navigate
                    to={"/" + JSON.parse(user).roleName.toLowerCase()}
                  />}
                <p className="text-reset text-white">
                  {MessageError}
                </p>
              </div>
            </div>
          </div>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default PostCarEquipment;
