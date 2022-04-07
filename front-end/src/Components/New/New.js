import React, { useEffect } from "react";
import ListNews from "./ListNews";

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
    </div>
  );
};

export default New;
