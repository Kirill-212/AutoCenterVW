import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { CarsApi, OrdersApi, PostOrderDto } from "../../ImportExportGenClient";
import Context from "../../context";
import GetJwtToken from "../../Services/Jwt/GetJwtToken";
import { UpdateStateOrderForPaidDto } from "../../model/UpdateStateOrderForPaidDto";
const UpdateOrderBuyer = () => {
  const { user } = useContext(Context);
  const [vin, setVin] = React.useState("");
  const [MessageError, setMessageError] = React.useState("");
  const [redirect, setRedirect] = React.useState(false);
  const [totalCost, setTotalCost] = React.useState(0);
  const [cardOwnerName, setCardOwnerName] = React.useState("");
  const [month, setMonth] = React.useState(0);
  const [year, setYear] = React.useState(0);
  const [cvc, setCVC] = React.useState(0);
  const [cardNumber, setCardNumber] = React.useState("");

  async function submit(e) {
    e.preventDefault();
    console.log(new Date().getFullYear() % 100, cvc.length);
    if (cardNumber.length !== 16) {
      setMessageError(
        "Error: Card number is not valid.Valid is Visa Electron or Maestro"
      );
      return;
    } else if (cardOwnerName.length === 0) {
      setMessageError("Error: Card owner is not valid value.");
      return;
    } else if (month < 0 || month > 12) {
      setMessageError("Error: Month is not valid value.");
      return;
    } else if (year < new Date().getFullYear() % 100 || year > 100) {
      setMessageError("Error: Year is not valid value.");
      return;
    } else if (cvc.length !== 3) {
      setMessageError("Error: CVC is not valid value.");
      return;
    }
    new OrdersApi().apiOrdersPaidPut(
      GetJwtToken(),
      {
        body: new UpdateStateOrderForPaidDto(
          vin,
          JSON.parse(user).email,
          Number(totalCost),
          cardNumber,
          month,
          year,
          cvc,
          cardOwnerName
        )
      },
      Callback
    );
  }

  function Callback(error, data, response) {
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

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    setVin(query.get("vin"));
    setTotalCost(query.get("totalCost"));
    console.log(query.get("totalCost"));
  }, []);
  let style = { width: "30rem" };
  return (
    <div className="d-flex   justify-content-center  align-items-center ">
      <div className="     bg-dark text-white   ">
        <div className="row mt-5">
          <h1 className="d-flex   justify-content-center align-items-center ">
            Buy car
          </h1>
        </div>
        <div className="container w-50 mt-5 pt-5">
          <form onSubmit={submit}>
            <div className="row">
              <div className="col mb-2 ">
                <label>VIN:</label>
                <input
                  className="w-100 shadow-lg  bg-white rounded"
                  onChange={e => setVin(e.target.value)}
                  value={vin}
                  name="vin"
                  type="text"
                  disabled
                />
              </div>

              <div className="col mb-2 ">
                <label>Total cost($):</label>
                <input
                  className="w-100 shadow-lg  bg-white rounded"
                  onChange={e => setTotalCost(e.target.value)}
                  value={totalCost}
                  name="totalCost"
                  type="text"
                  disabled
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col">
                <label>Car number:</label>
                <input
                  className="w-100 shadow-lg  bg-white rounded"
                  onChange={e => setCardNumber(e.target.value)}
                  type="text"
                  required
                  placeholder="Enter card number"
                />
              </div>
            </div>
            <div className="row mt-2 align-items-center">
              <div className="col ">
                <label>Month:</label>
                <input
                  className="w-100 shadow-lg  bg-white rounded"
                  onChange={e => setMonth(e.target.value)}
                  type="number"
                  required
                  placeholder="MM"
                />
              </div>
              <div className="col">
                <label>Year:</label>
                <input
                  className="w-100 shadow-lg  bg-white rounded"
                  onChange={e => setYear(e.target.value)}
                  type="number"
                  required
                  placeholder="YY"
                />
              </div>
              <div className="col">
                <label>CVC:</label>
                <input
                  className="w-100 shadow-lg  bg-white rounded"
                  onChange={e => setCVC(e.target.value)}
                  type="number"
                  required
                  placeholder="CVC"
                />
              </div>
            </div>
            <div className="row mt-2">
              <div className="col">
                <label>Card owner:</label>
                <input
                  className="w-100 shadow-lg  bg-white rounded"
                  onChange={e => setCardOwnerName(e.target.value)}
                  type="text"
                  required
                  placeholder="Enter card owner name"
                />
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
          <div style={style} class="text-wrap  text-reset text-white">
            {MessageError}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateOrderBuyer;
