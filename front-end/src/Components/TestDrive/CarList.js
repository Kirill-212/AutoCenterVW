import React, { useEffect } from "react";
import { CarsApi } from "../../ImportExportGenClient";
import { GetPagedCarDto } from "../../model/GetPagedCarDto";
import GetJwtToken from "../../Services/Jwt/GetJwtToken";
import { GetCarDto } from "../../model/GetCarDto";
import { getDate } from "../ViewLists/SupportFunction";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";

export default function EnhancedTable(props) {
  const [list, setList] = React.useState([]);
  const [currentPages, setCurrentPages] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const [blockFlag, setBlockFlag] = React.useState(false);
  const [load, setLoad] = React.useState(true);
  const [flag, setFlag] = React.useState(true);

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
      let rs = GetPagedCarDto.constructFromObject(response.body);
      setCurrentPages(rs.currentPage + 1);
      setTotalPages(rs.totalPages);

      let ListCars = GetPagedCarDto.constructFromObject(
        response.body
      ).GetCarDto.map(e => {
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
      if (load && (flag || (!flag && currentPages <= totalPages))) {
        new CarsApi().apiCarsPagedGet(
          GetJwtToken(),
          {
            pageNumber: currentPages,
            pageSize: 3
          },
          CallbackRequest
        );
        setFlag(false);
      } else if (blockFlag) {
        new CarsApi().apiCarsPagedGet(
          GetJwtToken(),
          {
            pageNumber: 1,
            pageSize: 3
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


  return (
    <div className="container">
      <div className="row align-items-center d-flex flex-column">
        {list.map(e => {
          return (
            <div className="col  w-50 text-center">
              <div className="card mt-5 mb-5 text-white bg-black">
                <div className="row card-header">
                  {e.car.isActive === true &&
                    <div className="col-1">
                      <Tooltip
                                 disableFocusListener
                                 disableTouchListener
                                 title="Buy car"
                                 arrow
                                 className="mr-1"
                               >
                      <Link
                        className="btn btn-primary-sm btn-sm ml-1 text-reset "
                        to={`/order/post?vin=${e.car
                          .vin}&emailOwner=${e.user === undefined
                          ? null
                          : e.user.email}
                          `}
                      >
                        <i className="fa-solid fa-sack-dollar" />
                      </Link>
                      </Tooltip>
                    </div>}
                  {e.car.isActive === false &&
                    <div className="col-1">
                      <Tooltip
                                 disableFocusListener
                                 disableTouchListener
                                 title="Test drive car"
                                 arrow
                                 className="mr-1"
                               >
                      <Link
                        className="btn btn-primary-sm btn-sm ml-1 text-reset "
                        to={`/testdrive/post?vin=${e.car.vin}
                          `}
                      >
                        <i className="fa-solid fa-car" />
                      </Link>
                      </Tooltip>
                    </div>}
                  {e.user === undefined &&
                    <div className="col-1">
                      <Tooltip
                                 disableFocusListener
                                 disableTouchListener
                                 title="Get more information about car"
                                 arrow
                                 className="mr-1"
                               >
                      <Link
                        className="btn btn-primary-sm btn-sm ml-1 text-reset "
                        to={`/car/info?vin=${e.car.vin}
                          `}
                      >
                        <i className="fa-solid fa-info" />
                      </Link></Tooltip>
                    </div>}
                  {e.user !== undefined &&
                    <div className="col-1">
                      <Tooltip
                                 disableFocusListener
                                 disableTouchListener
                                 title="Get more information about car"
                                 arrow
                                 className="mr-1"
                               >
                      <Link
                        className="btn btn-primary-sm btn-sm ml-1 text-reset "
                       to={`/clientcar/info?vin=${e.car.vin}
                          `}
                      >
                        <i className="fa-solid fa-info" />
                      </Link></Tooltip>
                    </div>}
                </div>
                <div className="card-body row ">
                  <img src={e.car.imgsCar[0].url} width={400} height={400} />
                </div>
                <div className="row card-footer">
                  <div className="row d-flex flex-column">
                    <div className="col text-center">
                      <h4> Information about car </h4>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col text-right">Car mileage(km)</div>
                    <div className="col-1 text-center">
                      <i className="fa-solid fa-arrow-right" />
                    </div>
                    <div className="col text-left">
                      {e.car.carMileage}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col text-right">
                      Cost(<i className="fa-solid fa-dollar-sign" />)
                    </div>
                    <div className="col-1 text-center">
                      <i className="fa-solid fa-arrow-right" />
                    </div>
                    <div className="col text-left">
                      {e.car.cost}
                    </div>
                  </div>
                  <div className="row">
                    <div className="col text-right">Date of realese car</div>
                    <div className="col-1 text-center">
                      <i className="fa-solid fa-arrow-right" />
                    </div>
                    <div className="col text-left">
                      {getDate(e.car.dateOfRealeseCar)}
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
