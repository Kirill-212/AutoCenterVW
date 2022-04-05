function CallbackRequest(error, data, response) {
  //console.log(error);
 // console.log(response);
  if (response == undefined) {
    return "Error:server is not available";
  } else if (response.statusCode == 400) {
    if (JSON.parse(error.message)["error"] == undefined) {
      return JSON.parse(error.message)["errors"];
    }
    return JSON.parse(error.message)["error"];
  } else if (response.statusCode === 200) {
    console.log(data);
    console.log(response);
  } else if (response.statusCode > 400) {
    return JSON.parse(error.message)["error"];
  }
}

export default CallbackRequest;
