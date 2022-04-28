import React, { useEffect } from "react";
import { ClientCarsApi, CarEquipmentApi } from "../../ImportExportGenClient";
import GetJwtToken from "../../Services/Jwt/GetJwtToken";
import { getDate } from "../ViewLists/SupportFunction";

const ClientCarDetail = (props) => {
  const [flag, setFlag] = React.useState(false);
  const [detailCar, setDetailCar] = React.useState(null);
  const [detailUser, setDetailUser] = React.useState(null);
  const [carEquipment, setCarEquipment] = React.useState({});
  const [registerNumber, setRegisterNumber] = React.useState("");

  async function GetCarByVin(vin) {
    props.handleToggle();

    new ClientCarsApi().apiClientcarsVinGet(
      GetJwtToken(),
      { vin: vin },
      CallbackRequest
    );
  }

  function CallbackRequest(error, data, response) {
    setDetailCar(null);
    if (response == undefined) {
      props.setMessageError("Error:server is not available");
      props.handleClose();
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
      props.handleClose();
      props.setMessageError("Error:Forbidden");
    } else if (response.statusCode == 401) {
      props.handleClose();
      props.setMessageError("Error:Unauthorized");
    } else if (response.statusCode === 200 || response.statusCode === 204) {
      if (response.statusCode === 204) {
        props.handleClose();
        props.setMessageError("Error:EMPTY");
        setDetailCar(null);
        return;
      }
      setRegisterNumber(response.body.registerNumber);
      setDetailCar(response.body.car);
      setDetailUser(response.body.user);
      new CarEquipmentApi().apiCarequipmentsEquipmentIdDetailGet(
        GetJwtToken(),
        response.body.car.idCarEquipment,
        CallbackRequestGetById
      );
    } else if (response.statusCode > 400) {
      props.handleClose();
     props.setMessageError(response.body.error);
    }
  }

  function CallbackRequestGetById(error, data, response) {
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
      setCarEquipment(response.body);
      setFlag(true);
    } else if (response.statusCode > 400) {
     props.setMessageError(response.body.error);
    }
    props.handleClose();
  }

  function ViewCarEquipment() {
    let totalCost = detailCar.cost;
    let equipment = [];
    
    console.log(carEquipment,'eq');
    equipment.push(
      <div className="row ">
        <div className="row ">
                  <div className="col-3">
                <i className="fa-solid fa-angle-right text white mr-1" />
          Name car equipment
          </div>
                <div className="col-1 mr-5">
                    <p>
          {carEquipment.name}</p></div>
                </div>
                </div>
    );
    carEquipment.equipments.forEach(el => {
      let i=0;i++;
       totalCost += el.equipmentItem.cost;
     
      equipment.push(
        
        <div className="col-3  mb-3">

          <div className="row ">
          <div className="col-4">
            <i className="fa-solid fa-angle-right text white mr-1" />
            Name
          </div>
          <div className="col-8  text-left text-white">
            {el.name}
          </div>
        </div>
          <div className="row ml-1">
            <div className="col-4">         
              Value
            </div>
            <div className="col-8 text-left text-white">
              {el.equipmentItem.value}
            </div>
          </div>

          <div className="row ml-1">
            <div className="col-4">
              
              Cost(<i className="fa-solid fa-dollar-sign" />)
            </div>
            <div className="col-8 text-left text-white">
              {el.equipmentItem.cost}
            </div>
          </div>
        </div>
      );
    });

    totalCost =
      detailCar.actionCar != null
        ? Number(totalCost * (100 - detailCar.actionCar.sharePercentage) / 100)
        : totalCost;
    equipment.push(
      <div className="row">
         <div className="row ">
                  <div className="col-2">
          <i className="fa-solid fa-angle-right text white mr-1" />
          Total cost(<i className="fa-solid fa-dollar-sign" />)
          </div>
                <div className="col-1 mr-5">
                    <p>
          {totalCost}
          </p></div>
                </div>
                </div>
    );
    return equipment;
  }

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    GetCarByVin(query.get("vin"));
  }, []);

  let fl = true;
  return (
    <div>
      <div className="container-md w-100 bg-dark text-white">
        {detailCar !== null &&
          <div className="row mt-5 pt-5 align-items-center ">
            <div
              id="slider"
              className="col carousel slide carousel-fade carousel-dark justify-content-center align-self-center p-5 w-100 "
              data-mdb-ride="carousel"
            >
              <div className="carousel-inner">
                {flag &&
                  detailCar.imgsCar.map(e => {
                    if (fl) {
                      fl = !fl;
                      return (
                        <div className="carousel-item active ">
                          <img
                            src={e.url}
                            alt="..."
                            width="800"
                            heigth="600"
                            className=""
                          />
                        </div>
                      );
                    } else {
                      return (
                        <div className="carousel-item">
                          <img
                            src={e.url}
                            alt="..."
                            width="800"
                            heigth="600"
                            className=""
                          />
                        </div>
                      );
                    }
                  })}
              </div>
              <button
                className="carousel-control-prev pt-5 pl-5 mt-5"
                type="button"
                data-mdb-target="#slider"
                data-mdb-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next pt-5 pr-5 mt-5"
                type="button"
                data-mdb-target="#slider"
                data-mdb-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                />
                <span className="visually-hidden">Next</span>
              </button>
            </div>
            <div className="col" >
            {flag &&
              <div className="row">
                <div className="col"> 
                <h4 className="card-title text-left">
                  Information about owner
                </h4>
                </div>

                <div className="row  d-flex flex-row justify-content-left">
                  <div className="col content-left">
                     <img
                      src={detailUser.urlPhoto}
                      className="rounded-circle "
                      width="200"
                      height="200"
                      alt="..."
                    />
                  </div>
                  <div className="row ">
                  <div className="col">
                <i className="fa-solid fa-angle-right text white mr-1" />First name 
                </div>
                <div className="col"> <p>{detailUser.firstName}</p></div>
                </div>
                <div className="row ">
                  <div className="col">
                <i className="fa-solid fa-angle-right text white mr-1" />Last name 
                </div>
                <div className="col"> <p>{detailUser.lastName}</p></div>
                </div>

                <div className="row ">
                  <div className="col">
                <i className="fa-solid fa-angle-right text white mr-1" />Phone number 
                </div>
                <div className="col"> <p>{detailUser.phoneNumber}</p></div>
                </div>
                <div className="row ">
                  <div className="col-3">
                <i className="fa-solid fa-angle-right text white mr-1" />Email
                </div>
                <div className="col "> <p>{detailUser.email}</p></div>
                </div>
                </div>
              </div>}
            </div>
            {flag &&
              <div className="card-body row">
                <div className="row">
                  <h4 className="card-title text-center">
                    Information about car
                  </h4>
                </div>
                <div className="row m-3">
                  <div className="col">
                        <div className="row ">
                        <div className="col">
                      <i className="fa-solid fa-angle-right text white mr-1" />
                          Register number
                          </div>
                      <div className="col mr-5"> <p>
                          {registerNumber === null && "None"}
                          {registerNumber !== null && registerNumber}</p></div>
                      </div>

                <div className="row ">
                  <div className="col">
                <i className="fa-solid fa-angle-right text white mr-1" />Vin 
                </div>
                <div className="col mr-5"> <p>{detailCar.vin}</p></div>
                </div>
                

                
              
                <div className="row ">
                  <div className="col">
                     <i className="fa-solid fa-angle-right text white mr-1" />Car mileage(km)
                     </div>
                <div className="col mr-5">
                    <p>{detailCar.carMileage}</p></div>
                </div>


                <div className="row ">
                  <div className="col"><i className="fa-solid fa-angle-right text white mr-1" />Cost(<i className="fa-solid fa-dollar-sign" />)</div>
                <div className="col mr-5"> 
                     <p>{detailCar.cost}</p></div>
                </div>
               </div>



               <div className="col">
               <div className="row ">
                  <div className="col"><i className="fa-solid fa-angle-right text white mr-1" /> Date of realese car</div>
                <div className="col mr-5">
                     <p>{getDate(detailCar.dateOfRealeseCar)}</p></div>
                </div>
                
                <div className="row ">
                  <div className="col"><i className="fa-solid fa-angle-right text white mr-1" /> For saler</div>
                <div className="col mr-5">
                     <p>{detailCar.isActive === true && "True"}
                    {detailCar.isActive !== true && "False"}</p></div>
                </div>
                <div className="row ">
                  <div className="col"><i className="fa-solid fa-angle-right text white mr-1" /> Share percentage(%)</div>
                <div className="col mr-5">
                     <p>{detailCar.actionCar !== null &&
                      detailCar.actionCar.sharePercentage}
                    {detailCar.actionCar === null && "None"}</p></div>
                </div>
               </div>
               </div>
                <h4 className="card-title text-center">
                  Information about equipment
                </h4>
                {ViewCarEquipment()}
              </div>}
          </div>}
      </div>
    </div>
  );
};

export default ClientCarDetail;
