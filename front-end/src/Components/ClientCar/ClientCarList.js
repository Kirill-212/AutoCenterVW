import * as React from "react";
import { DataGrid, GridToolbar } from "@material-ui/data-grid";
import Paper from "@mui/material/Paper";
import { getDate } from "../ViewLists/SupportFunction";

export default function EnhancedTable(props) {
  const [pageSize, setPageSize] = React.useState(5);
  const [rows, setRows] = React.useState(
    props.rows.map(r => {
      console.log(r);
      return {
        id: r.car.vin,
        vin: r.car.vin,
        registerNumber: r.registerNumber !== null ? r.registerNumber : "None",
        dateOfRealeseCar: getDate(r.car.dateOfRealeseCar),
        isActive: r.car.isActive === true ? "True" : "False",
        cost: r.car.cost,
        carMileage: r.car.carMileage,
        sharePercentage:
          r.car.actionCar !== null ? r.car.actionCar.sharePercentage : "None",
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
