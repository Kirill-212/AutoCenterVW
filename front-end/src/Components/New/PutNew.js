import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import {
  PutNewDtoNewWrapperDto,
  ImgDto,
  PutNewDto,
  NewApi
} from "../../ImportExportGenClient";
import ImgService from "../../Services/ImgServices/ImgService";
import Context from "../../context";
import GetJwtToken from "../../Services/Jwt/GetJwtToken";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
const PutNew = () => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [titleNew, setTitleNew] = React.useState("");
  const [MessageError, setMessageError] = React.useState("");
  const [redirect, setRedirect] = React.useState(false);
  const [news, setNews] = React.useState({});
  const fileInput = React.useRef(null);
  const { user } = useContext(Context);

  async function GetNew(title) {
    new NewApi().apiNewsByTitleGet(
      GetJwtToken(),
      { title: title },
      CallbackRequest
    );
  }
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
    } else if (response.statusCode == 403) {
      setMessageError("Forbidden");
    } else if (response.statusCode == 401) {
      setMessageError("Unauthorized");
    } else if (response.statusCode === 200 || response.statusCode === 204) {
      console.log(response.body);
      setDescription(response.body.description);
      setNews(response.body.imgs);
    } else if (response.statusCode > 400) {
      setMessageError(JSON.parse(error.message)["error"]);
    }
  }
  async function submitNew(event) {
    event.preventDefault();
    console.log(news);
    let urls = [];
    for (let i = 0; i < news.length; i++) {
      if (news[i].name !== undefined) {
        let url = await ImgService.uploadImage(news[i]);
        if (url == undefined) {
          setMessageError("Error:upload img is not valid.");
          return;
        }
        if (url.height !== 700 || url.width !== 1000) {
          setMessageError(
            "Error:size is valid 100x700:File name:" +
              news[i].name +
              "|Line" +
              i
          );
          return;
        }
        console.log(url);
        urls.push(new ImgDto(url.url));
      } else {
        if (news[i].id !== undefined) urls.push(new ImgDto(news[i].url));
      }
    }
    console.log({
      body: new PutNewDtoNewWrapperDto(
        new PutNewDto(
          title,
          titleNew.length === 0 ? undefined : titleNew,
          description
        ),
        urls
      )
    });
    new NewApi().apiNewsPut(
      GetJwtToken(),
      {
        body: new PutNewDtoNewWrapperDto(
          new PutNewDto(
            title,
            titleNew.length === 0 ? undefined : titleNew,
            description
          ),
          urls
        )
      },
      CallbackRequestPut
    );
  }
  function CallbackRequestPut(error, data, response) {
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

  function AddImgs(value, i) {
    if (!value) {
      setMessageError("Wrong file type!Input number:" + i);
      return;
    }
    if (value.type.split("/")[0] !== "image") {
      setMessageError("Wrong file type!File name:" + value.name + "|Line:" + i);
    } else {
      news[i] = value;
    }
  }

  function AddField() {
    setNews([...news, {}]);
  }

  function renderInput() {
    let imgs = news;
    let rows = [];
    for (let i = 0; i < imgs.length; i++) {
      rows.push(
        <div className="row">
          {imgs[i].url === undefined &&
            <div className="col">
              <label>Image profile:</label>
              <div className="custom-file">
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInput}
                  onChange={e => AddImgs(e.target.files[0], i)}
                  className="custom-file-input"
                  id="inputGroupFile01"
                />
                <label className="custom-file-label" for="inputGroupFile01">
                  Choose file
                </label>
              </div>
            </div>}
          {imgs[i].url !== undefined &&
            <div className="form-group mb-3">
              <label>Image profile:</label>
              <div className="custom-file">
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInput}
                  onChange={e => AddImgs(e.target.files[0], i)}
                  className="custom-file-input w"
                  id="inputGroupFile01"
                />
                <label className="custom-file-label" for="inputGroupFile01">
                  Choose file
                </label>
              </div>
              <div className=" mt-2 ">
                <img src={imgs[i].url} className="w-100 h-90" />
              </div>
            </div>}
        </div>
      );
    }
    return rows;
  }
  const styles = {
    maxWidth: "700px",
    border: "none"
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    GetNew(query.get("title"));
    setTitle(query.get("title"));
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container fixed className="text-white">
        <Box sx={{ bgcolor: "black" }}>
          <div className="d-flex   justify-content-center align-items-center ">
            <div className="   mt-5 pt-5  w-100" style={styles}>
              <div className="row mt-5">
                <h1 className="d-flex   justify-content-center align-items-center ">
                  Put New
                </h1>
              </div>
              <div className="container mt-1">
                <form onSubmit={submitNew}>
                  <div className="form-group mb-2 ">
                    <label>Title:</label>
                    <input
                      disabled
                      value={title}
                      className="w-100 shadow-lg  bg-white rounded"
                      onChange={e => setTitle(e.target.value)}
                      name="title"
                      type="text"
                      placeholder="Enter your title..."
                    />
                  </div>
                  <div className="form-group mb-2 ">
                    <label>New title:</label>
                    <input
                      value={titleNew}
                      className="w-100 shadow-lg  bg-white rounded"
                      onChange={e => setTitleNew(e.target.value)}
                      name="title"
                      type="text"
                      placeholder="If you don't want to change your title, leave the field blank...."
                    />
                  </div>
                  <div className="form-group mb-2 ">
                    <label>Description:</label>
                    <input
                      value={description}
                      className="w-100 shadow-lg  bg-white rounded"
                      onChange={e => setDescription(e.target.value)}
                      name="description"
                      type="text"
                      placeholder="Enter your description..."
                      required
                    />
                  </div>
                  <div className="form-group mb-2 ">
                    <label>
                      If you don't want to change img, leave the field blank....
                    </label>
                    <br />
                    {news !== undefined && renderInput(news)}
                  </div>
                  <div>
                    <button
                      className="btn btn-dark btn-rounded"
                      type="button"
                      onClick={AddField}
                    >
                      Add input file
                    </button>
                  </div>
                  <div className="d-flex justify-content-center form-outline mb-3 p-5">
                    <div className="flex-fill">
                      <button
                        type="submit"
                        className="btn btn-secondary btn-rounded w-100 "
                      >
                        Put
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              
              <div>
                {redirect && <Navigate to={"/home"} />}
                <p className="text-reset text-white">
                  {MessageError}
                </p>
              </div>
            </div>
          </div>
        </Box>
      </Container>
    </React.Fragment>
  );
};

export default PutNew;
