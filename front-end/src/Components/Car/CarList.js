import * as React from "react";
import { DataGrid, GridToolbar } from "@material-ui/data-grid";
import Paper from "@mui/material/Paper";
import { getDate } from "../ViewLists/SupportFunction";

export default function EnhancedTable(props) {
  const [pageSize, setPageSize] = React.useState(5);
  const [rows, setRows] = React.useState(
    props.rows.map(r => {
      return {
        id: r.vin,
        vin: r.vin,
        dateOfRealeseCar: getDate(r.dateOfRealeseCar),
        isActive: r.isActive === true ? "True" : "False",
        cost: r.cost,
        carMileage: r.carMileage,
        sharePercentage:
          r.actionCar !== undefined ? r.actionCar.sharePercentage : "None",
        options: { r: r, op: props }
      };
    })
  );
  
  return (
    <Paper
      sx={{ width: "100%", height: 600, overflow: "hidden" }}
      className="p-2"
    >
      <DataGrid
        rows={rows}
        className="text-center"
        columns={props.head}
        disableSelectionOnClick
        pageSize={pageSize}
        onPageSizeChange={newPageSize => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20]}
        pagination
        components={{
          Toolbar: GridToolbar
        }}
      />
    </Paper>
  );
}
