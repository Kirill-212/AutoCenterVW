import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import * as React from "react";

export default function CustomizedAccordions(props) {
   const[data,setData]=React.useState(props.data)
  const [expanded, setExpanded] = React.useState("panel1");
 if(props.data.lenght===0)return <></>
  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  const requestSearch = searchedVal => {
    const filteredRows = data.filter(row => {
      return row.name.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setData(filteredRows);
  };

  const search = e => {
    if (e.length === 0) {
      setData(props.data);
    } else {
      requestSearch(e);
    }
  };
  
  return (
    <div>
      <div className="row mt-2  bg-white text-white">
        <div className="input-group rounded w-25 pt-2">
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
      <div className="row ">
        {data.map(r=>{
            if(r.name===data[0].name)return(<Accordion
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
              >
                <AccordionSummary aria-controls='panel1d-content' id='panel1d-header'>
                  <Typography>
                      <div className="row">
                          <div className="col">Name: {r.name}</div>
   
                      </div>
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    {r.equipments.map(element=>{
                        return <div className="row d-flex flex-row justify-content-center">
                            
                                <div className="col">
                                <i class="fa-solid fa-arrow-right"></i>
                                Name:{element.name}
                                   
                                    </div>
                                <div className="col"> <p>Value:{element.equipmentItem.value}</p></div>
                                <div className="col"> <p>Cost(<i class="fa-solid fa-dollar-sign"></i>):{element.equipmentItem.cost}</p></div>
                                <div className="col"></div>
                                <div className="col"></div>
                        </div>
                    })}{(JSON.parse(props.roleName).roleName==="ADMIN"||JSON.parse(props.roleName).roleName==="EMPLOYEE")&&<div className="row"><div className="col"><button
                    class="btn btn-primary-sm btn-sm mr-1"
                    value={r.name}
                    onClick={props.deleteCarEquipment}
                    type="button"
                  >
                    <i class="fas fa-trash" />
                  </button></div><div className="col"></div><div className="col"></div> </div>}
                  </Typography>
                </AccordionDetails>
              </Accordion>)
           return <Accordion
            expanded={expanded === r.name}
            onChange={handleChange(r.name)}
          >
            <AccordionSummary aria-controls={r.name+'d-content'} id={r.name+'d-header'}>
            <Typography>
                      <div className="row">
                          <div className="col">Name: {r.name}</div>
   
                      </div>
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    {r.equipments.map(element=>{
                        return <div className="row d-flex flex-row justify-content-center">
                            
                                <div className="col">
                               <i class="fa-solid fa-arrow-right"></i>
                                Name:{element.name}
                                   
                                    </div>
                                <div className="col"> <p>Value:{element.equipmentItem.value}</p></div>
                                <div className="col"> <p>Cost(<i class="fa-solid fa-dollar-sign"></i>):{element.equipmentItem.cost}</p></div>
                                <div className="col"></div>
                                <div className="col"></div>
                        </div>
                    })}{(JSON.parse(props.roleName).roleName==="ADMIN"||JSON.parse(props.roleName).roleName==="EMPLOYEE")&&<div className="row"><div className="col"><button
                    class="btn btn-primary-sm btn-sm mr-1"
                    value={r.name}
                    onClick={props.deleteCarEquipment}
                    type="button"
                  >
                    <i class="fas fa-trash" />
                  </button></div><div className="col"></div><div className="col"></div> </div>}
                  </Typography>
                </AccordionDetails>
              </Accordion>
        })}
     </div>
      
      
    </div>
  );
}
