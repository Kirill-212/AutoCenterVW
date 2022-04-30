import React, { useEffect, useContext } from "react";
import { CarsApi } from "../../ImportExportGenClient";
import { GetPagedCarDto } from "../../model/GetPagedCarDto";
import GetJwtToken from "../../Services/Jwt/GetJwtToken";
import { GetCarDto } from "../../model/GetCarDto";
import { getDate } from "../ViewLists/SupportFunction";
import Context from "../../context";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";

export default function EnhancedTable(props) {
  const { user } = useContext(Context);
  const [list, setList] = React.useState([]);
  const [currentPages, setCurrentPages] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const [blockFlag, setBlockFlag] = React.useState(false);
  const [load, setLoad] = React.useState(true);
  const [flag, setFlag] = React.useState(true);

  async function DeleteClientCar(e) {
    if (user === undefined) {
      props.setMessageError("Error:Unauthorized");
      return;
    }
    new CarsApi().apiCarsClientcarDelete(
      GetJwtToken(),
      { vin: e.currentTarget.value, email: JSON.parse(user).email },
      CallbackReq
    );
  }

  function CallbackReq(error, data, response) {
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
      setBlockFlag(true);
    } else if (response.statusCode > 400) {
     props.setMessageError(response.body.error);
    }
    setBlockFlag(true);
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
      let rs = GetPagedCarDto.constructFromObject(response.body);
      setCurrentPages(rs.currentPage + 1);
      setTotalPages(rs.totalPages);
      console.log(response.body,'car')
      let ListCars = GetPagedCarDto.constructFromObject(
        response.body
      ).getCarDto.map(e => {
        return GetCarDto.constructFromObject(e);
      });
      if (list.length == 0) {
        setList(ListCars);
      } else {
        if (blockFlag) setList(ListCars);
        setList([...list, ...ListCars]);
      }
    } else if (response.statusCode > 400) {
     props.setMessageError(response.body.error);
    }
    setBlockFlag(false);
    setLoad(false);
  }
  function CallbackRequestBlock(error, data, response) {
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
      console.log(response.body,'car')
      let rs = GetPagedCarDto.constructFromObject(response.body);
      setCurrentPages(rs.currentPage + 1);
      setTotalPages(rs.totalPages);

      let ListCars = GetPagedCarDto.constructFromObject(
        response.body
      ).getCarDto.map(e => {
        return GetCarDto.constructFromObject(e);
      });

      setList(ListCars);
    } else if (response.statusCode > 400) {
     props.setMessageError(response.body.error);
    }
    setBlockFlag(false);
    setLoad(false);
  }

  useEffect(
    () => {
      if (user === undefined) {
        props.setMessageError("Error:Unauthorized");
      } else if (load && (flag || (!flag && currentPages <= totalPages))) {
        new CarsApi().emailPagedGet(
          GetJwtToken(),
          {
            pageNumber: currentPages,
            pageSize: 3,
            email: JSON.parse(user).email
          },
          CallbackRequest
        );
        setFlag(false);
      } else if (blockFlag) {
        new CarsApi().emailPagedGet(
          GetJwtToken(),
          {
            pageNumber: 1,
            pageSize: 3,
            email: JSON.parse(user).email
          },
          CallbackRequestBlock
        );
        setFlag(false);
      }
    },
    [load, blockFlag]
  );

  useEffect(() => {
    document.addEventListener("scroll", ScrollHandler);

    return function() {
      document.removeEventListener("scroll", ScrollHandler);
    };
  }, []);

  const ScrollHandler = e => {
    if (
      e.target.documentElement.scrollHeight -
        (window.pageYOffset + window.innerHeight) <
      100
    ) {
      setLoad(true);
    }
  };
  let styleHeaderCard={padding: "4px 10px 1px 10px"}
  return (
    <div className="container ">
      <div className="row align-items-center d-flex flex-column">
        {list.map(e => {
          return (
            <div className="col  w-75 text-center">
              <div className="card mt-5 mb-5 text-white bg-black">
                <div className="row card-header " style={styleHeaderCard}>
                <div className="d-grid gap-2 d-md-block text-left">
                  {!e.car.isActive &&
                   
                       <Tooltip
                                  disableFocusListener
                                  disableTouchListener
                                  title="Create car repair"
                                  arrow
                                  className="mr-1 ml-1"
                                >
                      <Link
                        className="btn btn-primary-sm btn-sm ml-1 text-reset "
                        to={`/service/post?vin=${e.car.vin}
                          `}
                      >
                        <i className="fa-solid fa-screwdriver-wrench" />
                      </Link></Tooltip>
                    }
                 
                  <Tooltip
                                  disableFocusListener
                                  disableTouchListener
                                  title="Delete car"
                                  arrow
                                  className="mr-1 ml-1"
                                >
                    <button
                      className="btn btn-primary-sm btn-sm mr-1"
                      value={e.car.vin}
                      onClick={DeleteClientCar}
                      type="button"
                    >
                      <i className="fas fa-trash text-white" />
                    </button></Tooltip>
                 
                  <Tooltip
                                  disableFocusListener
                                  disableTouchListener
                                  title="Get more information about car"
                                  arrow
                                  className="mr-1 ml-1"
                                >
                    <Link
                      className="btn btn-primary-sm btn-sm ml-1 text-reset "
                      to={`/clientcar/info?vin=${e.car.vin}
                          `}
                    >
                      <i className="fa-solid fa-info" />
                    </Link></Tooltip>
                  
                  <Tooltip
                                  disableFocusListener
                                  disableTouchListener
                                  title="Update car"
                                  arrow
                                  className="mr-1 ml-1"
                                >
                    <Link
                      className="btn btn-primary-sm btn-sm ml-1 text-reset"
                      to={`/clientcar/put/user?vin=${e.car.vin}
                          `}
                    >
                      <i className="fa fa-wrench" aria-hidden="true" />
                    </Link></Tooltip>
                 </div>
                </div>
                <div className="card-body row ">
                  <div className="col">
                  <img src={e.car.imgsCar[0].url} width={400} height={400} />
               </div>
                <div className="col">
                <div className="row ">
               
               <div className="col"> <h4 className="card-title text-center">
                  Information about car
                </h4></div>
                </div>

                 <div className="row text-left">
                  <div className="col"><i className="fa-solid fa-angle-right text white mr-1" /> For saler</div>
                <div className="col mr-5">
                     <p>{e.car.isActive === true && "True"}
                    {e.car.isActive !== true && "False"}</p></div>
                </div>
                <div className="row text-left">
                  <div className="col">
                     <i className="fa-solid fa-angle-right text white mr-1" />Car mileage(km)
                     </div>
                <div className="col mr-5">
                    <p>{e.car.carMileage}</p></div>
                </div>

                  <div className="row text-left">
                  <div className="col"><i className="fa-solid fa-angle-right text white mr-1" />Cost(<i className="fa-solid fa-dollar-sign" />)</div>
                <div className="col mr-5"> 
                     <p>{e.car.cost}</p></div>
                </div>
                <div className="row text-left">
                  <div className="col"><i className="fa-solid fa-angle-right text white mr-1" /> Date of realese car</div>
                <div className="col mr-5">
                     <p>{getDate(e.car.dateOfRealeseCar)}</p></div>
                </div>
                <div className="row text-left">
                  <div className="col"><i className="fa-solid fa-angle-right text white mr-1" />Total cost(<i className="fa-solid fa-dollar-sign" />)</div>
                <div className="col mr-5">
                     <p>{e.totalCost}</p>
                     </div>
                </div>
                <div className="row text-left">
                  <div className="col"><i className="fa-solid fa-angle-right text white mr-1" />VIN</div>
                <div className="col mr-5">
                     <p>{e.car.vin}</p>
                     </div>
                </div>
                </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
