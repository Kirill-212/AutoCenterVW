import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { TestDrivesApi, TestDriveDto } from "../../ImportExportGenClient";
import Context from "../../context";
import GetJwtToken from "../../Services/Jwt/GetJwtToken";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const PostTestDrive = () => {
  const { user } = useContext(Context);
  const [vin, setVin] = React.useState("");
  const [dateStart, setDateStart] = React.useState("");
  const [MessageError, setMessageError] = React.useState("");
  const [redirect, setRedirect] = React.useState(false);
  const [hourStart, setHourStart] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  async function submit(e) {
    e.preventDefault();
    handleToggle();
    if (user === undefined) {
      setMessageError("Unauthorized");
      handleClose();
      return;
    }
    new TestDrivesApi().apiTestdrivesPost(
      GetJwtToken(),
      {
        body: new TestDriveDto(
          dateStart,
          hourStart,
          JSON.parse(user).email,
          vin
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
    handleClose();
  }

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    setVin(query.get("vin"));
  }, []);

  let style = { width: "30rem" };

  return (
    <div className="d-flex   justify-content-center w-30 h-90 align-items-center ">
      <div className=" p-4   bg-dark text-white h-100 ">
        <div className="row mt-5">
          <h1 className="d-flex   justify-content-center align-items-center ">
            Post test drive
          </h1>
        </div>
        <div className="container mt-5 pt-5">
          <form onSubmit={submit}>
            <div className="form-group mb-2 ">
              <label>VIN:</label>
              <input
                className="w-100 shadow-lg  bg-white rounded"
                onChange={e => setVin(e.target.value)}
                value={vin}
                name="vin"
                type="text"
                placeholder="Enter your VIN..."
                disabled
              />
            </div>
            <div className=" row">
              <div className="col mb-2 ">
                <label>Date start:</label>
                <input
                  className="w-100 shadow-lg  bg-white rounded"
                  onChange={e => setDateStart(e.target.value)}
                  name="dateOfRealeseCar"
                  type="date"
                  placeholder="Enter your date of realese car..."
                  required
                />
              </div>
              <div className="col mb-2 ">
                <label>Hour start:</label>
                <select
                  size="0"
                  className="form-select "
                  aria-label="Default select example"
                  onChange={e => setHourStart(e.target.value)}
                  required
                >
                  <option value="" />
                  <option value={9}>9</option>
                  <option value={10}>10</option>
                  <option value={11}>11</option>
                  <option value={12}>12</option>
                  <option value={13}>13</option>
                  <option value={14}>14</option>
                  <option value={15}>15</option>
                  <option value={16}>16</option>
                  <option value={17}>17</option>
                </select>
              </div>
            </div>
            <div className="d-flex justify-content-center form-outline mt-3 mb-3">
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

export default PostTestDrive;
