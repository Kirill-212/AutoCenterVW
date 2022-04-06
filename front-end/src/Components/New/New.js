import React, { useEffect } from "react";
import ListNews from "./ListNews";

const New = () => {
  const [MessageError, setMessageError] = React.useState("");

  return (
    <div className="row mt-2">
      <div className="row">
        <p>
          {MessageError}
        </p>
      </div>
      <div className="row mt-2">
        <ListNews />
      </div>
    </div>
  );
};

export default New;
