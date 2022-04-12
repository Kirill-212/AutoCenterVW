import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
const DetailCarEquipmentForm = props => {
  const [expanded, setExpanded] = React.useState(false);
  const [row, setRow] = React.useState(props.data);
  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const requestSearch = searchedVal => {
    const filteredRows = row.filter(row => {
      return row.name.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRow(filteredRows);
  };
  const search = e => {
    if (e.length === 0) {
      setRow(props.data);
    } else {
      requestSearch(e);
    }
  };
  return (
    <div>
      <div className="row mt-2 bg-white text-white">
        <div className="input-group rounded w-25">
          <input
            type="search"
            className="form-control rounded"
            placeholder="Search"
            aria-label="Search"
            aria-describedby="search-addon"
            onChange={e => search(e.target.value)}
          />
          <span className="input-group-text border-0" id="search-addon">
            <i className="fas fa-search" />
          </span>
        </div>
      </div>
      <div className="row">
        {row.map(r => {
          if (r.name === row[0].name)
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
    </div>
  );
};

export default DetailCarEquipmentForm;
