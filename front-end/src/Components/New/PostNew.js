import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import {
  PostNewDtoNewWrapperDto,
  ImgDto,
  PostNewDto,
  NewApi
} from "../../ImportExportGenClient";
import ImgService from "../../Services/ImgServices/ImgService";
import Context from "../../context";
import GetJwtToken from "../../Services/Jwt/GetJwtToken";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const PostNew = () => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [imgs, setImgs] = React.useState([]);
  const [MessageError, setMessageError] = React.useState("");
  const [redirect, setRedirect] = React.useState(false);
  const { user } = useContext(Context);
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(!open);
  };

  async function submitNew(event) {
    event.preventDefault();
    handleToggle();
    setMessageError("");
    let urls = [];
    for (let i = 0; i < imgs.length; i++) {
      if (!imgs[i]) {
        setMessageError("Error:Wrong file type!");
        handleClose();
        return;
      }
      if (imgs[i].type.split("/")[0] !== "image") {
        setMessageError("Error:Wrong file type!");
        handleClose();
        return;
      }
      let url = await ImgService.uploadImage(imgs[i]);
      if (url == undefined) {
        setMessageError("Error:upload img is not valid.");
        handleClose();
        return;
      }
      if (url.height !== 700 || url.width !== 1000) {
        setMessageError(
          "Error:size is valid 1000x700:File name:" + imgs[i].name
        );
        handleClose();
        return;
      }

      urls.push(new ImgDto(url.url));
    }
    if (user === undefined) {
      setMessageError("Unauthorized");
      handleClose();
      return;
    }
    new NewApi().apiNewsPost(
      GetJwtToken(),
      {
        body: new PostNewDtoNewWrapperDto(
          new PostNewDto(title, description, JSON.parse(user).email),
          urls
        )
      },
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
      setRedirect(true);
    } else if (response.statusCode > 400) {
      setMessageError(JSON.parse(error.message)["error"]);
    }
    handleClose();
  }
  
  let style = { width: "30rem" };

  return (
    <div className="d-flex   justify-content-center w-40  align-items-center ">
      <div className="p-4  bg-dark text-white h-100">
        <div className="row mt-5">
          <h1 className="d-flex   justify-content-center align-items-center ">
            Post new
          </h1>
        </div>
        <div className="container mt-5 pt-5">
          <form onSubmit={submitNew}>
            <div className="form-group mb-2 ">
              <label>Title:</label>
              <input
                className="w-100 shadow-lg  bg-white rounded"
                onChange={e => setTitle(e.target.value)}
                name="title"
                type="text"
                placeholder="Enter your title..."
                required
              />
            </div>
            <div className="form-group mb-2 ">
              <label>Description:</label>
              <input
                className="w-100 shadow-lg  bg-white rounded"
                onChange={e => setDescription(e.target.value)}
                name="description"
                type="text"
                placeholder="Enter your description..."
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Images profile:</label>
              <div className="custom-file">
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => setImgs(e.target.files)}
                  className="custom-file-input"
                  id="inputGroupFile01"
                  multiple
                  required
                />
                <label className="custom-file-label" for="inputGroupFile01">
                  Choose file/files(1000x700)
                </label>
              </div>
            </div>
            <div className="d-flex justify-content-center form-outline mb-3 p-5">
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
        <div />

        <div>
          {redirect && <Navigate to={"/home"} />}
          <Backdrop
            sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <div style={style} class="text-wrap  text-reset text-white">
            {MessageError}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostNew;
