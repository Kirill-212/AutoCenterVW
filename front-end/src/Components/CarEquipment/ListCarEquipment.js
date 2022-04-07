import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import * as React from "react";

const Accordion = styled(props =>
  <MuiAccordion disableGutters elevation={0} square {...props} />
)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0
  },
  "&:before": {
    display: "none"
  }
}));

const AccordionSummary = styled(props =>
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)"
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1)
  }
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)"
}));

export default function CustomizedAccordions(props) {
   
  const [expanded, setExpanded] = React.useState("panel1");
 if(props.data.lenght===0)return <></>
  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  console.log(props.data);
  return (
    <div>
        {props.data.map(r=>{
            if(r.name===props.data[0].name)return(<Accordion
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
              >
                <AccordionSummary aria-controls='panel1d-content' id='panel1d-header'>
                  <Typography>
                      <div className="row">
                          <div className="col"> {r.name}</div>
                          <div className="col">
                          <button
                            class="btn btn-primary-sm btn-sm mr-1"
                            value={r.name}
                            onClick={props.deleteCarEquipment}
                            type="button"
                          >
                            <i class="fas fa-trash" />
                          </button>
                          </div>
                      </div>
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    {r.equipments.map(element=>{
                        return <div className="row d-flex flex-row justify-content-center">
                            
                                <div className="col">
                                <i class="fa-thin fa-square" ></i>
                                Name:{element.name}
                                   
                                    </div>
                                <div className="col"> <p>Value:{element.equipmentItem.value}</p></div>
                                <div className="col"> <p>Cost(<i class="fa-solid fa-dollar-sign"></i>):{element.equipmentItem.cost}</p></div>
                                <div className="col"></div>
                                <div className="col"></div>
                        </div>
                    })}
                  </Typography>
                </AccordionDetails>
              </Accordion>)
           return <Accordion
            expanded={expanded === r.name}
            onChange={handleChange(r.name)}
          >
            <AccordionSummary aria-controls={r.name+'d-content'} id={r.name+'d-header'}>
              <Typography><div className="row">
                          <div className="col"> {r.name}</div>
                          <div className="col">
                          <button
                            class="btn btn-primary-sm btn-sm mr-1"
                            value={r.name}
                            onClick={props.deleteCarEquipment}
                            type="button"
                          >
                             <i class="fas fa-trash" />
                          </button>
                          </div>
                      </div></Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
              {r.equipments.map(element=>{
                        return <div className="row d-flex flex-row justify-content-center">
                            
                                <div className="col">
                                <i class="fa-thin fa-square" ></i>
                                Name:{element.name}
                                   
                                    </div>
                                <div className="col"> <p>Value:{element.equipmentItem.value}</p></div>
                                <div className="col"> <p>Cost(<i class="fa-solid fa-dollar-sign"></i>):{element.equipmentItem.cost}</p></div>
                                <div className="col"></div>
                                <div className="col"></div>
                        </div>
                    })}
              </Typography>
            </AccordionDetails>
          </Accordion>
        })}
     
      
      
    </div>
  );
}
