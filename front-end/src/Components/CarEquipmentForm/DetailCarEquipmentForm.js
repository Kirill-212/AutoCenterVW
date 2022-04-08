import React from "react";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
const DetailCarEquipmentForm = props => {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  console.log(props);
  return (
    <div>
      {props.data.map(r => {
        if (r.name === props.data[0].name)
          return (
            <Accordion
              expanded={expanded === "panel1"}
              onChange={handleChange("panel1")}
            >
              <AccordionSummary
                aria-controls="panel1d-content"
                id="panel1d-header"
              >
                <Typography>
                  <div className="row">
                    <div className="col">
                      <p>
                        {r.name}
                      </p>
                    </div>
                  </div>
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  <div className="row d-grid gap-2 d-md-block">
                    <div className="col">
                      <button
                        class="btn btn-primary-sm btn-sm m-2 "
                        value={r.name}
                        onClick={props.deleteCarEquipmentForm}
                        type="button"
                      >
                        <i class="fas fa-trash" />
                      </button>
                      <a
                        className="btn btn-primary-sm btn-sm m-2 text-reset"
                        href={`/carequipmentform/put?name=${r.name}
                          `}
                      >
                        <i class="fa-solid fa-screwdriver-wrench" />
                      </a>
                    </div>
                  </div>
                  {r.equipmentItems.map(element => {
                    return (
                      <div className="row d-flex flex-row justify-content-center">
                        <div className="col">
                          <p>
                            Value:{element.value}
                          </p>
                        </div>
                        <div className="col">
                          <p>
                            Cost(<i class="fa-solid fa-dollar-sign" />):{element.cost}
                          </p>
                        </div>
                        <div className="col" />
                        <div className="col" />
                      </div>
                    );
                  })}
                </Typography>
              </AccordionDetails>
            </Accordion>
          );
        return (
          <Accordion
            expanded={expanded === r.name}
            onChange={handleChange(r.name)}
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <Typography>
                <div className="row">
                  <div className="col">
                    <p>
                      {r.name}
                    </p>
                  </div>
                </div>
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <div className="row d-grid gap-2 d-md-block">
                  <div className="col">
                    <button
                      class="btn btn-primary-sm btn-sm m-2 "
                      value={r.name}
                      onClick={props.deleteCarEquipmentForm}
                      type="button"
                    >
                      <i class="fas fa-trash" />
                    </button>
                    <a
                      className="btn btn-primary-sm btn-sm m-2 text-reset"
                      href={`/carequipmentform/put?name=${r.name}
                          `}
                    >
                      <i class="fa-solid fa-screwdriver-wrench" />
                    </a>
                  </div>
                </div>
                {r.equipmentItems.map(element => {
                  return (
                    <div className="row d-flex flex-row justify-content-center">
                      <div className="col">
                        <p>
                          Value:{element.value}
                        </p>
                      </div>
                      <div className="col">
                        <p>
                          Cost(<i class="fa-solid fa-dollar-sign" />):{element.cost}
                        </p>
                      </div>
                      <div className="col" />
                      <div className="col" />
                    </div>
                  );
                })}
              </Typography>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </div>
  );
};

export default DetailCarEquipmentForm;
