import React, { useEffect } from "react";
import { GetNewDto, NewApi} from "../../ImportExportGenClient";
import { GetPagedNewDto } from "../../model/GetPagedNewDto";
import GetJwtToken from "../../Services/Jwt/GetJwtToken";
import { getDate } from "../ViewLists/SupportFunction";
export default function EnhancedTable(props) {
  const [listNew, setListNew] = React.useState([]);
  const [currentPages, setCurrentPages] = React.useState(1);
  const [totalPages, setTotalPages] = React.useState(0);
 
  const [load, setLoad] = React.useState(true);
  const [MessageError, setMessageError] = React.useState("");
  const [flag, setFlag] = React.useState(true);

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
    }else if (response.statusCode == 403) {
      setMessageError("Forbidden");
    }
     else if (response.statusCode == 401) {
      setMessageError("Unauthorized");
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
        setListNew([...listNew, ...newss]);
      }
    } else if (response.statusCode > 400) {
      setMessageError(JSON.parse(error.message)["error"]);
    }
    setLoad(false);
  }

  useEffect(
    () => {
      if (load && (flag || (!flag && currentPages <= totalPages))) {
        new NewApi().apiNewsPagedGet(
          GetJwtToken(),
          {
            pageNumber: currentPages,
            pageSize: 3
          },
          CallbackRequest
        );
        setFlag(false);
      }
    },
    [load]
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
    <div className="row">
      <p>
        {MessageError}
      </p>
      {listNew.map(e => {
        // console.log(e);
        let flag = true;
        return (
          <div className="row">
            <div className="col" />
            <div className="col" />
            <div className="col" />
            <div className="col">
              {e.title}
            </div>
            <div className="col" />
            <div className="col">
              Created {getDate(e.createdDate)}
            </div>
            <div className="col" />
            <div className="col" />
            <div className="col" />
            <div className="row">
              <div className="col" />
              <div
                id={"slider" + e.title}
                className="col carousel slide carousel-fade carousel-dark row justify-content-center align-self-center p-4 w-100 border"
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
                  data-mdb-target={"#slider" + e.title}
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
                  data-mdb-target={"#slider" + e.title}
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
            <div className="row">
              <div className="col" />
              <div className="col" />
              <div className="col">
                Created {e.firstName} {e.lastName}
              </div>
              <div className="col">
                {e.description}
              </div>
              <div className="col" />
              <div className="col" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
