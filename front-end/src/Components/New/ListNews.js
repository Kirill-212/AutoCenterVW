import React, { useEffect, useContext } from "react";
import { GetNewDto, NewApi } from "../../ImportExportGenClient";
import { GetPagedNewDto } from "../../model/GetPagedNewDto";
import GetJwtToken from "../../Services/Jwt/GetJwtToken";
import { getDate } from "../ViewLists/SupportFunction";
import Context from "../../context";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";

export default function EnhancedTable(props) {
  const { user } = useContext(Context);
  const [listNew, setListNew] = React.useState([]);
  const [currentPages, setCurrentPages] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
  const [blockFlag, setBlockFlag] = React.useState(false);
  const [load, setLoad] = React.useState(true);
  const [flag, setFlag] = React.useState(true);

  async function DeleteNew(e) {
    new NewApi().apiNewsDelete(
      GetJwtToken(),
      { title: e.currentTarget.value },
      CallbackRequestDelete
    );
  }

  function CallbackRequestDelete(error, data, response) {
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
      setBlockFlag(true);
    } else if (response.statusCode > 400) {
      props.setMessageError(response.body.error);
    }
    setBlockFlag(true);
  }

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
      let rs = GetPagedNewDto.constructFromObject(response.body);
      setCurrentPages(rs.currentPage + 1);
      setTotalPages(rs.totalPages);
      let newss = GetPagedNewDto.constructFromObject(
        response.body
      ).getNewDto.map(e => {
        return GetNewDto.constructFromObject(e);
      });
      if (listNew.length == 0) {
        setListNew(newss);
      } else {
        if (blockFlag) setListNew(newss);
        setListNew([...listNew, ...newss]);
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
      let rs = GetPagedNewDto.constructFromObject(response.body);
      setCurrentPages(rs.currentPage + 1);
      setTotalPages(rs.totalPages);
      let newss = GetPagedNewDto.constructFromObject(
        response.body
      ).getNewDto.map(e => {
        return GetNewDto.constructFromObject(e);
      });
      setListNew(newss);
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
        new NewApi().apiNewsPagedGet(
          GetJwtToken(),
          {
            pageNumber: currentPages,
            pageSize: 3
          },
          CallbackRequest
        );
        setFlag(false);
      } else if (blockFlag) {
        new NewApi().apiNewsPagedGet(
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

  let styleDescription = { width: "50rem" };
  let styleHeaderCard = { padding: "4px 10px 1px 10px" }

  return (
    <div className="container">
      {listNew.map(e => {
        let flag = true;
        return (
          <div className="card mt-5 mb-5 text-white bg-black">
            <div className="card-header" style={styleHeaderCard}>
              <div className="row justify-content-center">
                {(JSON.parse(user).roleName === "ADMIN" ||
                  JSON.parse(user).roleName === "SUPER_ADMIN" ||
                  JSON.parse(user).roleName === "EMPLOYEE") &&
                  <div className="col ">
                    <Tooltip
                      disableFocusListener
                      disableTouchListener
                      title="Update new"
                      arrow
                    >
                      <Link
                        className="text-reset btn btn-primary-sm btn-sm mr-1"
                        to={`/new/put?title=${e.title}`}
                      >
                        <i className="fa-solid fa-screwdriver-wrench" />
                      </Link></Tooltip>
                    <Tooltip
                      disableFocusListener
                      disableTouchListener
                      title="Delete new"
                      arrow
                    >
                      <button
                        color="purple"
                        size="sm"
                        className="btn btn-primary-sm btn-sm mr-1 text-white"
                        value={e.title}
                        onClick={DeleteNew}
                      >
                        <i className="fa-solid fa-trash" />
                      </button></Tooltip>
                  </div>}
              </div>
              <div className="row justify-content-center">
                <div className="col text-center">
                  <h2>
                    {e.title}
                  </h2>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col text-left">
                  <p>
                    Author: {e.firstName} {e.lastName}
                  </p>
                </div>
                <div className="col text-right">
                  Created {getDate(e.createdDate)}
                </div>
              </div>
            </div>
            <div style={styleHeaderCard} className="card-body row ">
              <div className="col" />
              <div
                id={"slider" + e.title.replaceAll(" ", "")}
                className="col carousel slide carousel-fade carousel-dark row justify-content-center align-self-center p-2 w-100 "
                data-mdb-ride="carousel"
              >
                <div className="carousel-inner">
                  {e.imgs.map(r => {
                    if (flag) {
                      flag = !flag;
                      return (
                        <div className="carousel-item active ">
                          <img
                            src={r.url}
                            alt="..."
                            width="1000"
                            heigth="700"
                            className=""
                          />
                        </div>
                      );
                    } else {
                      return (
                        <div className="carousel-item">
                          <img
                            src={r.url}
                            alt="..."
                            width="1000"
                            heigth="700"
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
                  data-mdb-target={"#slider" + e.title.replaceAll(" ", "")}
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
                  data-mdb-target={"#slider" + e.title.replaceAll(" ", "")}
                  data-mdb-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  />
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
              <div className="col" />
            </div>
            <div className="card-footer">
              <div className="row">
                <div className="col text-reght justify-content-right">
                  <p style={styleDescription} className="text-wrap  text-reset text-white">
                    Description:
                    {e.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
