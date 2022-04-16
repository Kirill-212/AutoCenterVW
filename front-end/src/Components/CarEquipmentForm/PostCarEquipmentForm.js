import React from "react";
import { Navigate } from "react-router-dom";
import {
  CarEquipmentApi,
  PostCarEquipmentFormDto,
  ValueCarEquipmentDto
} from "../../ImportExportGenClient";
import GetJwtToken from "../../Services/Jwt/GetJwtToken";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const PostCarEquipmentForm = () => {
  const [name, setName] = React.useState("");
  const [MessageError, setMessageError] = React.useState("");
  const [redirect, setRedirect] = React.useState(false);
  const [carEquipment, setCarEquipment] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  async function submitCarEquipment(event) {
    event.preventDefault();
    setMessageError("");
    handleToggle();
    new CarEquipmentApi().apiCarequipmentsPost(
      GetJwtToken(),
      {
        body: new PostCarEquipmentFormDto(
          name,
          carEquipment.map(r => {
            return new ValueCarEquipmentDto(r.value, r.cost);
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
      if (response.body.errors !== undefined) {
        let errorResult = "";
        let errorsJson = response.body.errors;
        for (let key in response.body.errors) {
          errorResult += errorsJson[key] + " | ";
        }
        setMessageError(errorResult);
      } else {
        setMessageError(response.body.error);
      }
    } else if (response.statusCode == 403) {
      setMessageError("Forbidden");
    } else if (response.statusCode == 401) {
      setMessageError("Unauthorized");
    } else if (response.statusCode === 200 || response.statusCode === 204) {
      setRedirect(true);
    } else if (response.statusCode > 400) {
      setMessageError(response.body.error);
    }
    handleClose();
  }

  function AddField() {
    setCarEquipment([...carEquipment, {}]);
  }

  function renderInput() {
    let imgs = carEquipment;
    let rows = [];
    for (let i = 0; i < imgs.length; i++) {
      rows.push(
        <div className="row">
          <div className="col">
            <label>Value:</label>
            <div className="custom-file">
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
            <div className="custom-file">
              <input
                type="number"
                min="0" max="1000000"
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

  let style = { width: "30rem" };

  return (
    <div className="d-flex   justify-content-center w-40 align-items-center ">
      <div className="p-4  bg-dark text-white h-100">
        <div className="row mt-5">
          <h1 className="d-flex   justify-content-center align-items-center ">
            Post car equipment form item
          </h1>
        </div>
        <div className="container mt-5 pt-5">
          <form onSubmit={submitCarEquipment}>
            <div className="form-group mb-2 ">
              <label>Name:</label>
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
              <label>Equipment items:</label>
              {carEquipment !== undefined && renderInput(carEquipment)}
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
                  Post
                </button>
              </div>
            </div>
          </form>
        </div>

        <div>
          <Backdrop
            sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          {redirect && <Navigate to={"/home"} />}
          <div style={style} className="text-wrap  text-reset text-white">
            {MessageError}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostCarEquipmentForm;
