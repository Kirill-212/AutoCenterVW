import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import {
  CarEquipmentApi,
  PutCarEquipmentFormDto,
  PutValueCarEquipmentDto
} from "../../ImportExportGenClient";
import GetJwtToken from "../../Services/Jwt/GetJwtToken";
const PutCarEquipmentForm = () => {
  const [name, setName] = React.useState("");
  const [nameNew, setNameNew] = React.useState("");
  const [MessageError, setMessageError] = React.useState("");
  const [redirect, setRedirect] = React.useState(false);
  const [flag, setFlag] = React.useState(false);
  const [carEquipment, setCarEquipment] = React.useState([]);
  const [length, setLength] = React.useState(0);
  async function submitCarEquipment(event) {
    event.preventDefault();
    setMessageError("");
    console.log({
      body: new PutCarEquipmentFormDto(
        nameNew.length === 0 ? null : nameNew,
        name,
        carEquipment.map(r => {
          return new PutValueCarEquipmentDto(r.value, r.isDeleted, r.cost);
        })
      )
    });
    new CarEquipmentApi().apiCarequipmentsPut(
      GetJwtToken(),
      {
        body: new PutCarEquipmentFormDto(
          nameNew.length === 0 ? null : nameNew,
          name,
          carEquipment.map(r => {
            return new PutValueCarEquipmentDto(r.value, r.isDeleted, r.cost);
          })
        )
      },
      CallbackRequestPut
    );
  }
  function CallbackRequestPut(error, data, response) {
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

  async function GetCarEquipmentItemByName(name) {
    setMessageError("");
    new CarEquipmentApi().apiCarequipmentsNameGet(
      GetJwtToken(),
      { name: name },
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
      // console.log(response.body);
      setLength(response.body.equipmentItems.length);
      setName(response.body.name);
      setCarEquipment(
        response.body.equipmentItems.map(r => {
          return { value: r.value, cost: r.cost, isDeleted: false };
        })
      );
      setFlag(true);
    } else if (response.statusCode > 400) {
      setMessageError(JSON.parse(error.message)["error"]);
    }
  }

  function AddField() {
    setCarEquipment([...carEquipment, {}]);
  }

  function UpdateState(i) {
    carEquipment[i].isDeleted = !carEquipment[i].isDeleted;
  }

  function renderInput() {
    let imgs = carEquipment;
    let rows = [];
    console.log(imgs);
    for (let i = 0; i < imgs.length; i++) {
      console.log(imgs[i]);
      if (
        imgs[i].value !== undefined &&
        imgs[i].cost !== undefined &&
        i < length
      ) {
        rows.push(
          <div className="row">
            <div className="col">
              <label>Value:</label>
              <div>
                <input
                  value={imgs[i].value}
                  type="text"
                  onChange={e => Add(e.target.value, i, null)}
                  className="w-100 shadow-lg  bg-white rounded"
                  required
                  placeholder="Enter your value..."
                />
              </div>
            </div>
            <div className="col">
              <label>Cost($):</label>
              <div>
                <input
                  type="number"
                  value={imgs[i].cost}
                  onChange={e => Add(null, i, e.target.value)}
                  className="w-100 shadow-lg  bg-white rounded"
                  required
                  placeholder="Enter your cost..."
                />
              </div>
            </div>

            <div className="form-check col mt-5">
              <input
                class="form-check-input"
                type="checkbox"
                value={i}
                id={i + "flexCheckDefault"}
                onChange={e => UpdateState(e.target.value)}
              />
              <label class="form-check-label" for="flexCheckDefault">
                Delete
              </label>
            </div>
          </div>
        );
      } else {
        rows.push(
          <div className="row">
            <div className="col">
              <label>Value:</label>
              <div>
                <input
                  type="text"
                  onChange={e => Add(e.target.value, i, null)}
                  className="w-100 shadow-lg  bg-white rounded"
                  required
                  placeholder="Enter your value..."
                />
              </div>
            </div>
            <div className="col">
              <label>Cost($):</label>
              <div>
                <input
                  type="number"
                  onChange={e => Add(null, i, e.target.value)}
                  className="w-100 shadow-lg  bg-white rounded"
                  required
                  placeholder="Enter your cost..."
                />
              </div>
            </div>
          </div>
        );
      }
    }
    return rows;
  }

  function Add(value = null, i, cost = null) {
    if (value !== null) {
      carEquipment[i].value = value;
    } else if (cost !== null) {
      carEquipment[i].cost = cost;
    }
    console.log(carEquipment);
  }
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    GetCarEquipmentItemByName(query.get("name"));
  }, []);
  let style = { width: "30rem" };
  return (
    <div className="d-flex   justify-content-center align-items-center ">
      <div className="p-4  bg-dark text-white w-40">
        <div className="row mt-5">
          <h1 className="d-flex   justify-content-center align-items-center ">
            Put car equipment item
          </h1>
        </div>
        <div className="container mt-5">
          <form onSubmit={submitCarEquipment}>
            <div className="form-group mb-2 ">
              <label>Name:</label>
              <input
                className="w-100 shadow-lg  bg-white rounded"
                onChange={e => setName(e.target.value)}
                value={name}
                name="name"
                type="text"
                placeholder="Enter your name car equipment..."
                disabled
              />
            </div>
            <div className="form-group mb-2 ">
              <label>New name:</label>
              <input
                className="w-100 shadow-lg  bg-white rounded"
                onChange={e => setNameNew(e.target.value)}
                name="name"
                type="text"
                placeholder=" If you don't want to change name, leave the field blank...."
              />
            </div>
            <div className="form-group mb-2 ">
              <label>Equipment items:</label>
              {carEquipment !== undefined && flag && renderInput(carEquipment)}
            </div>
            <div>
              <button
                className="btn btn-dark btn-rounded m-2"
                type="button"
                onClick={AddField}
              >
                Add input files
              </button>
            </div>
            <div className="d-flex justify-content-center form-outline mb-3">
              <div className="flex-fill">
                <button
                  type="submit"
                  className="btn btn-secondary btn-rounded w-100 "
                >
                  Put
                </button>
              </div>
            </div>
          </form>
          <div>
            {redirect && <Navigate to={"/home"} />}
            <div style={style} class="text-wrap  text-reset text-white">
              {MessageError}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PutCarEquipmentForm;
