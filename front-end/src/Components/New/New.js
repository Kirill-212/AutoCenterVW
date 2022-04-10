import React from "react";
import ListNews from "./ListNews";
import Footer from "../Footer";
const New = () => {
  const [MessageError, setMessageError] = React.useState("");

  return (
    <div className="container-md">
      <div className="row align-items-center">
        <p className="text-reset text-white">
          {MessageError}
        </p>
      </div>

      <div className="row mt-5 pt-5 align-items-center">
        <ListNews />
      </div>
      <div className="row">
        <Footer />
      </div>
    </div>
  );
};

export default New;
