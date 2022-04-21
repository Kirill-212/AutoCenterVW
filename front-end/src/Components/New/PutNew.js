import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import {
  PutNewDtoNewWrapperDto,
  ImgDto,
  PutNewDto,
  NewApi
} from "../../ImportExportGenClient";
import ImgService from "../../Services/ImgServices/ImgService";
import GetJwtToken from "../../Services/Jwt/GetJwtToken";

const PutNew = (props) => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [titleNew, setTitleNew] = React.useState("");
  const [redirect, setRedirect] = React.useState(false);
  const [news, setNews] = React.useState({});
  const fileInput = React.useRef(null);

  async function GetNew(title) {
    props.handleToggle();
    new NewApi().apiNewsByTitleGet(
      GetJwtToken(),
      { title: title },
      CallbackRequest
    );
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
      if (response.statusCode === 204) {
        props.handleClose();
        props.setMessageError("Error: new with this title not found.");
        return;
      }
      setDescription(response.body.description);
      setNews(response.body.imgs);
    } else if (response.statusCode > 400) {
      props.setMessageError(response.body.error);
    }
    props.handleClose();
  }

  async function submitNew(event) {
    event.preventDefault();
    props.handleToggle();
    let urls = [];
    for (let i = 0; i < news.length; i++) {
      if (news[i].name !== undefined) {
        let url = await ImgService.uploadImage(news[i]);
        if (url == undefined) {
          props.setMessageError("Error:upload img is not valid.");
          props.handleClose();
          return;
        }
        if (url.height !== 700 || url.width !== 1000) {
          props.setMessageError(
            "Error:size is valid 1000x700:File name:" +
              news[i].name +
              "|Line" +
              i
          );
          props.handleClose();
          return;
        }
        urls.push(new ImgDto(url.url));
      } else {
        if (news[i].url !== undefined) urls.push(new ImgDto(news[i].url));
      }
    }
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

  async function AddImgs(value, i) {
    if (!value) {
      props.setMessageError("Error:Wrong file type!Input number:" + i);
      return;
    }
    if (value.type.split("/")[0] !== "image") {
      props.setMessageError(
        "Error:Wrong file type!File name:" + value.name + "|Line:" + i
      );
    } else {
      let url = await ImgService.uploadImage(value);
      if (url == undefined) {
        props.setMessageError("Error:upload img is not valid.");

        return;
      }
      if (url.height !== 700 || url.width !== 1000) {
        props.setMessageError(
          "Error:size is valid 1000x700:File name:" + value.name + "|Line" + i
        );

        return;
      }
      news[i] = new ImgDto(url.url);
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
                  Choose file(1000x700)
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
                  Choose file(1000x700)
                </label>
              </div>
              <div className=" mt-5 ">
                <img src={imgs[i].url} className="w-100 h-90" />
              </div>
            </div>}
        </div>
      );
    }
    return rows;
  }

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    GetNew(query.get("title"));
    setTitle(query.get("title"));
  }, []);

  return (
    <div className="d-flex   justify-content-center align-items-center ">
      <div className="p-4  bg-dark text-white w-40">
        <div className="row mt-5">
          <h1 className="d-flex   justify-content-center align-items-center ">
            Put new
          </h1>
        </div>
        <div className="container mt-5">
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
                className="btn btn-dark btn-rounded mt-5"
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
          {redirect && <Navigate to={"/home"} />}
      </div>
    </div>
  );
};

export default PutNew;
