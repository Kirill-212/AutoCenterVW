import React from "react";
import ListClientCar from "./ClientCarListForUser";
import Footer from "../Footer";
const ClietnCarForUser = () => {
  const [MessageError, setMessageError] = React.useState("");

  return (
    <div className="container-md">
      <div className="row mt-5 pt-5 align-items-center">
        <ListClientCar />
      </div>
      <div className="row">
        <Footer />
      </div>
    </div>
  );
};

export default ClietnCarForUser;
