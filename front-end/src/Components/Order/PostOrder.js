import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { OrdersApi, PostOrderDto } from "../../ImportExportGenClient";
import Context from "../../context";
import GetJwtToken from "../../Services/Jwt/GetJwtToken";

const PostOrder = (props) => {
  const { user } = useContext(Context);
  const [vin, setVin] = React.useState("");
  const [emailOwner, setEmailOwner] = React.useState("");
  const [redirect, setRedirect] = React.useState(false);

  const [flag, setFlag] = React.useState("0");

  async function submit(e) {
    e.preventDefault();
    props.handleToggle();
    if (user === undefined) {
      props.setMessageError("Error:Unauthorized");
      props.handleClose();
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

  function SetValueChangeRegisterNumber(event) {
    setFlag(event.target.value);
  }
  
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    setVin(query.get("vin"));
    setEmailOwner(query.get("emailOwner"));
  }, []);

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
          {redirect && <Navigate to={"/home"} />}
      </div>
    </div>
  );
};

export default PostOrder;
