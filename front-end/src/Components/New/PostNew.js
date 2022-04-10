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

const PostNew = () => {
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [imgs, setImgs] = React.useState([]);
  const [MessageError, setMessageError] = React.useState("");
  const [redirect, setRedirect] = React.useState(false);

  const { user } = useContext(Context);

  async function submitNew(event) {
    event.preventDefault();
    setMessageError("");
    let urls = [];
    for (let i = 0; i < imgs.length; i++) {
      console.log("New", imgs[i]);
      if (!imgs[i]) {
        setMessageError("Wrong file type!");
        return;
      }
      if (imgs[i].type.split("/")[0] !== "image") {
        setMessageError("Wrong file type!");
        return;
      }
      let url = await ImgService.uploadImage(imgs[i]);
      if (url == undefined) {
        setMessageError("Error:upload img is not valid.");
        return;
      }
      if (url.height !== 700 || url.width !== 1000) {
        setMessageError(
          "Error:size is valid 1000x700:File name:" + imgs[i].name
        );
        return;
      }

      urls.push(new ImgDto(url.url));
    }
    new NewApi().apiNewsPost(
      GetJwtToken(),
      {
        body: new PostNewDtoNewWrapperDto(
          new PostNewDto(title, description, JSON.parse(user).email),
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
  let style = { width: "30rem" };

  return (
    <div className="opacity-90">
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
                    Choose file/files
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
            <div style={style} class="text-wrap  text-reset text-white">
              {MessageError}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostNew;
