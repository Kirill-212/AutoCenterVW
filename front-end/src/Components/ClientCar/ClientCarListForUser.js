import React, { useEffect, useContext } from "react";
import { CarsApi } from "../../ImportExportGenClient";
import { GetPagedCarDto } from "../../model/GetPagedCarDto";
import GetJwtToken from "../../Services/Jwt/GetJwtToken";
import { GetCarDto } from "../../model/GetCarDto";
import { getDate } from "../ViewLists/SupportFunction";
import Context from "../../context";

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
  return (
    <div className="container ">
      <div className="row align-items-center d-flex flex-column">
        {list.map(e => {
          return (
            <div className="col  w-50 text-center">
              <div className="card mt-5 mb-5 text-white bg-black">
                <div className="row card-header">
                  {!e.car.isActive &&
                    <div className="col-1">
                      <a
                        className="btn btn-primary-sm btn-sm ml-1 text-reset "
                        href={`/service/post?vin=${e.car.vin}
                          `}
                      >
                        <i className="fa-solid fa-screwdriver-wrench" />
                      </a>
                    </div>}
                  <div className="col-1">
                    <button
                      className="btn btn-primary-sm btn-sm mr-1"
                      value={e.car.vin}
                      onClick={DeleteClientCar}
                      type="button"
                    >
                      <i className="fas fa-trash" />
                    </button>
                  </div>
                  <div className="col-1">
                    <a
                      className="btn btn-primary-sm btn-sm ml-1 text-reset "
                      href={`/clientcar/info?vin=${e.car.vin}
                          `}
                    >
                      <i className="fa-solid fa-info" />
                    </a>
                  </div>
                  <div className="col-1">
                    <a
                      className="btn btn-primary-sm btn-sm ml-1 text-reset"
                      href={`/clientcar/put/user?vin=${e.car.vin}
                          `}
                    >
                      <i className="fa fa-wrench" aria-hidden="true" />
                    </a>
                  </div>
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
                    <div className="col text-right">Cell</div>
                    <div className="col-1 text-center">
                      <i className="fa-solid fa-arrow-right" />
                    </div>
                    <div className="col text-left">
                      {e.car.isActive === true && "True"}
                      {e.car.isActive !== true && "False"}
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
