import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import {
  UpdateStateCarRepairForStartWorkDto,
  CarRepairsApi
} from "../../ImportExportGenClient";
import Context from "../../context";
import GetJwtToken from "../../Services/Jwt/GetJwtToken";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const PostService = () => {
  const { user } = useContext(Context);
  const [vin, setVin] = React.useState("");
  const [startWork, setStartWork] = React.useState("");
  const [endWork, setEndWork] = React.useState("");
  const [MessageError, setMessageError] = React.useState("");
  const [redirect, setRedirect] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  async function submitCar(event) {
    event.preventDefault();
    handleToggle();
    setMessageError("");
    if (user === undefined) {
      setMessageError("Unauthorized");
      handleClose();
      return;
    }
    new CarRepairsApi().apiCarrepairsStartWorkPut(
      GetJwtToken(),
      {
        body: new UpdateStateCarRepairForStartWorkDto(
          JSON.parse(user).email,
          vin,
          startWork,
          endWork
        )
      },
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
          errorResult +=  errorsJson[key] + " | ";
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
    handleClose();
  }

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    setVin(query.get("vin"));
  }, []);

  let style = { width: "30rem" };

  return (
    <div className="d-flex   justify-content-center w-40 align-items-center ">
      <div className="p-4  bg-dark text-white h-100">
        <div className="row mt-5">
          <h1 className="d-flex   justify-content-center align-items-center ">
            Start repair car
          </h1>
        </div>
        <div className="container mt-5 pt-5">
          <form onSubmit={submitCar}>
            <div className="form-group mb-2 ">
              <label>VIN:</label>
              <input
                value={vin}
                className="w-100 shadow-lg  bg-white rounded"
                onChange={e => setVin(e.target.value)}
                name="vin"
                type="text"
                placeholder="Enter your VIN..."
                disabled
              />
            </div>
            <div className="row">
              <div className="col mb-2 ">
                <label>Start work:</label>
                <input
                  className="w-100 shadow-lg  bg-white rounded"
                  onChange={e => setStartWork(e.target.value)}
                  type="date"
                  placeholder="Enter your date of start work..."
                  required
                />
              </div>
              <div className="col mb-2 ">
                <label>End work:</label>
                <input
                  className="w-100 shadow-lg  bg-white rounded"
                  onChange={e => setEndWork(e.target.value)}
                  type="date"
                  placeholder="Enter your date of end work..."
                  required
                />
              </div>
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
          {redirect && <Navigate to={"/home"} />}
          <Backdrop
            sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <div style={style} class="text-wrap  text-reset text-white">
            {MessageError}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostService;