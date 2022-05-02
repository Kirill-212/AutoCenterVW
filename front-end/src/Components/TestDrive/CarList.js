import React, { useEffect } from "react";
import { CarsApi } from "../../ImportExportGenClient";
import { GetPagedCarDto } from "../../model/GetPagedCarDto";
import GetJwtToken from "../../Services/Jwt/GetJwtToken";
import { GetCarDto } from "../../model/GetCarDto";
import { getDate, Sort } from "../ViewLists/SupportFunction";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";

export default function EnhancedTable(props) {
  const [list, setList] = React.useState([]);
  const [currentPages, setCurrentPages] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const [blockFlag, setBlockFlag] = React.useState(false);
  const [load, setLoad] = React.useState(true);
  const [flag, setFlag] = React.useState(true);
  const [vin, setVin] = React.useState("");
  const [priceFrom, setPriceFrom] = React.useState("");
  const [priceBefore, setPriceBefore] = React.useState("");
  const [dateOfRealeseCarFrom, setDateOfRealeseCarFrom] = React.useState("");
  const [dateOfRealeseCarBefore, setDateOfRealeseCarBefore] = React.useState("");
  const [carMileageFrom, setCarMileageFrom] = React.useState("");
  const [carMileageBefore, setCarMileageBefore] = React.useState("");
  const [cell, setCell] = React.useState(0);
  const [sort, setSort] = React.useState("")
  const [flagFilters, setFlagFilters] = React.useState(true)
  const [getCar, setGetCar] = React.useState(0);

  function CallbackRequest(error, data, response) {
    if (response == undefined) {
      props.setMessageError("Error:Server is not available");
    } else if (response.statusCode == 400) {
      if (response.body.errors !== undefined) {
        let errorResult = [];
        let errorsJson = response.body.errors;
        for (let key in response.body.errors) {
          errorResult.push(<>{errorsJson[key]} <br></br> </>);
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
        setList(Sort(ListCars, sort));
      } else {
        if (blockFlag) { setList(Sort(ListCars, sort)) }
        else {
          setList(Sort([...list, ...ListCars], sort));
        }
      }
    } else if (response.statusCode > 400) {
      props.setMessageError(response.body.error);
    }
    setBlockFlag(false);
    setLoad(false);
  }

  function CallbackRequestBlock(error, data, response) {
    if (response == undefined) {
      props.setMessageError("Error:Server is not available");
    } else if (response.statusCode == 400) {
      if (response.body.errors !== undefined) {
        let errorResult = [];
        let errorsJson = response.body.errors;
        for (let key in response.body.errors) {
          errorResult.push(<>{errorsJson[key]} <br></br> </>);
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

      setList(Sort(ListCars, sort));
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
            pageSize: 3,
            filterCarVin: vin.length === 0 ? null : vin,
            filterCarTotalCostFrom: priceFrom.length === 0 ? null : priceFrom,
            filterCarTotalCostBefore: priceBefore.length === 0 ? null : priceBefore,
            filterCarDateOfRealeseCarFrom: dateOfRealeseCarFrom.length === 0 ? null : getDate(dateOfRealeseCarFrom),
            filterCarDateOfRealeseCarBefore: dateOfRealeseCarBefore.length === 0 ? null : getDate(dateOfRealeseCarBefore),
            filterCarCarMileageFrom: carMileageFrom.length === 0 ? null : carMileageFrom,
            filterCarCarMileageBefore: carMileageBefore.length === 0 ? null : carMileageBefore,
            filterCarCell: cell,
            filterCarFilterAllCar: getCar
          },
          CallbackRequest
        );
        setFlag(false);
      } else if (blockFlag) {
        new CarsApi().apiCarsPagedGet(
          GetJwtToken(),
          {
            pageNumber: 1,
            pageSize: 3,
            filterCarVin: vin.length === 0 ? null : vin,
            filterCarTotalCostFrom: priceFrom.length === 0 ? null : priceFrom,
            filterCarTotalCostBefore: priceBefore.length === 0 ? null : priceBefore,
            filterCarDateOfRealeseCarFrom: dateOfRealeseCarFrom.length === 0 ? null : getDate(dateOfRealeseCarFrom),
            filterCarDateOfRealeseCarBefore: dateOfRealeseCarBefore.length === 0 ? null : getDate(dateOfRealeseCarBefore),
            filterCarCarMileageFrom: carMileageFrom.length === 0 ? null : carMileageFrom,
            filterCarCarMileageBefore: carMileageBefore.length === 0 ? null : carMileageBefore,
            filterCarCell: cell,
            filterCarFilterAllCar: getCar
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

    return function () {
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

  let styleHeaderCard = { padding: "4px 10px 1px 10px" }

  function OpenFilters() {
    setFlagFilters(!flagFilters)
  }

  function Search() {
    setBlockFlag(!blockFlag);
  }

  function CancelSearch() {
    setSort("")
    setVin("")
    setPriceBefore(""
    )
    setCell(0);
    getCar(0);
    setCarMileageBefore("")
    setCarMileageFrom("")
    setPriceFrom("")
    setDateOfRealeseCarBefore("")
    setDateOfRealeseCarFrom("")
    setBlockFlag(!blockFlag);
  }

  return (
    <div className="container-md">
      <div className="row mt-5 pt-5 align-items-center">
        <div className="row-1">
          <button
            onClick={OpenFilters}
            className="btn btn-secondary btn-rounded"
          >
            Filters...
          </button>
        </div>
        <div className="row mt-1 pt-2 bg-black text-white" hidden={flagFilters}>
          <div className="row">
            <div className="input-group rounded col">
              <input
                type="search"
                className="form-control rounded"
                placeholder="Search by vin"
                aria-label="Search"
                value={vin}
                aria-describedby="search-addon"
                onChange={e => setVin(e.target.value)}
              />
              <span className="input-group-text border-0" id="search-addon">
                <i className="fas fa-search" />
              </span>
            </div>
            <div className="rounded col">
              <button
                className="btn btn-secondary btn-rounded m-2"
                onClick={Search}
                type="button"
              >
                Search
              </button>
              <button
                className="btn btn-secondary btn-rounded m-2"
                onClick={CancelSearch}
                type="button"
              >
                Cancel filters
              </button>
            </div>
          </div>
          <div className="row">
            <div className="rounded col">
              <label>Sort:</label>
              <select className="form-select" value={sort} onChange={e => setSort(e.target.value)} aria-label="Default select example">
                <option selected value=""></option>
                <option value="0">Price Asc</option>
                <option value="1">Price Desc</option>
                <option value="2">date of realese Asc</option>
                <option value="3">date of realese Desc</option>
                <option value="4">Car mileage Asc</option>
                <option value="5">Car mileage Desc</option>
              </select>
            </div>
            <div className="rounded col">
              <label>Get car:</label>
              <select className="form-select" value={getCar} onChange={e => setGetCar(e.target.value)} aria-label="Default select example">
                <option selected value={0}>All</option>
                <option value={1}>Client car</option>
                <option value={2}>Auto center car</option>
              </select>
            </div>
            <div className="rounded col">
              <label>Cell:</label>
              <select className="form-select" value={cell} onChange={e => setCell(e.target.value)} aria-label="Default select example">
                <option selected value={0}>All</option>
                <option value={1}>Cell</option>
                <option value={2}>not cell</option>
              </select>
            </div>
            <div className="col">
              <label>Cost from(<i className="fa-solid fa-dollar-sign" />):</label>
              <input
                className="w-100 shadow-lg  bg-white rounded"
                onChange={e => setPriceFrom(e.target.value)}
                value={priceFrom}
                type="number"
                min="0"
                max="1000000"
              />
            </div>
            <div className="col">
              <label>Cost before(<i className="fa-solid fa-dollar-sign" />):</label>
              <input
                className="w-100 shadow-lg  bg-white rounded"
                value={priceBefore}
                onChange={e => setPriceBefore(e.target.value)}
                type="number"
                min="0"
                max="1000000"
              />
            </div>
          </div>
          <div className="row mb-1">
            <div className="col">
              <label>Car mileage From(km):</label>
              <input
                className="w-100 shadow-lg  bg-white rounded"
                value={carMileageFrom}
                onChange={e => setCarMileageFrom(e.target.value)}
                type="number"
                min="0"
                max="1000000"
              />
            </div>
            <div className="col">
              <label>Car mileage Before(km):</label>
              <input
                className="w-100 shadow-lg  bg-white rounded"
                onChange={e => setCarMileageBefore(e.target.value)}
                value={carMileageBefore}
                type="number"
                min="0"
                max="1000000"
              />
            </div><div className="col">
              <label>Date of realese car from:</label>
              <input
                value={dateOfRealeseCarFrom}
                className="w-100 shadow-lg  bg-white rounded"
                onChange={e => setDateOfRealeseCarFrom(e.target.value)}
                type="date"
              />
            </div><div className="col">
              <label>Date of realese car before:</label>
              <input
                value={dateOfRealeseCarBefore}
                className="w-100 shadow-lg  bg-white rounded"
                onChange={e => setDateOfRealeseCarBefore(e.target.value)}
                type="date"
                max={new Date()}
              />
            </div></div>
        </div>
        <div className="row align-items-center d-flex flex-column">
          {list.map(e => {
            return (
              <div className="col  w-75 text-center">
                <div className="card mt-5 mb-5 text-white bg-black">
                  <div className="row card-header" style={styleHeaderCard}>
                    <div className="d-grid gap-2 d-md-block text-left">
                      {e.car.isActive === true &&
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
                      }
                      {e.car.isActive === false &&
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
                      }
                      {e.user === undefined &&
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
                      }
                      {e.user !== undefined &&
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
                      }
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
                        </h4>
                        </div>
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
    </div>
  );
}
