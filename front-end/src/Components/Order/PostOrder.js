import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { OrdersApi, PostOrderDto } from "../../ImportExportGenClient";
import Context from "../../context";
import GetJwtToken from "../../Services/Jwt/GetJwtToken";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const PostOrder = () => {
  const { user } = useContext(Context);
  const [vin, setVin] = React.useState("");
  const [emailOwner, setEmailOwner] = React.useState("");
  const [MessageError, setMessageError] = React.useState("");
  const [redirect, setRedirect] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  const [flag, setFlag] = React.useState("0");

  async function submit(e) {
    e.preventDefault();
    setMessageError("");
    handleToggle();
    if (user === undefined) {
      setMessageError("Unauthorized");
      handleClose();
      return;
    }
    new OrdersApi().apiOrdersPost(
      GetJwtToken(),
      {
        body: new PostOrderDto(
          emailOwner,
          JSON.parse(user).email,
          flag === "1" ? true : false,
          vin
        )
      },
      CallbackRequestDeleteOrUpdate
    );
  }

  function CallbackRequestDeleteOrUpdate(error, data, response) {
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

  function SetValueChangeRegisterNumber(event) {
    setFlag(event.target.value);
  }
  
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    setVin(query.get("vin"));
    setEmailOwner(query.get("emailOwner"));
  }, []);

  let style = { width: "30rem" };

  return (
    <div className="d-flex   justify-content-center w-30 align-items-center ">
      <div className=" p-4   bg-dark text-white h-100 ">
        <div className="row mt-5">
          <h1 className="d-flex   justify-content-center align-items-center ">
            Post order
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
            <div className="form-group mb-2 ">
              <label>Change register number ?</label>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                  checked={flag == "1" ? true : false}
                  onChange={e => SetValueChangeRegisterNumber(e)}
                  value="1"
                />
                <label className="form-check-label" for="flexRadioDefault1">
                  True
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                  checked={flag == "0" ? true : false}
                  onChange={e => SetValueChangeRegisterNumber(e)}
                  value="0"
                />
                <label className="form-check-label" for="flexRadioDefault2">
                  False
                </label>
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

export default PostOrder;
