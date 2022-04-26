import * as React from "react";
import Paper from "@mui/material/Paper";
import { DataGrid, GridToolbar } from "@material-ui/data-grid";
import { getDate } from "../ViewLists/SupportFunction";

export default function EnhancedTable(props) {
  const [pageSize, setPageSize] = React.useState(5);
  const [rows, setRows] = React.useState(
    props.rows.map(r => {
      return {
        id: r.email,
        photo: r.urlPhoto,
        firstName: r.firstName,
        lastName: r.lastName,
        dbay: getDate(r.dBay),
        status: r.status,
        email: r.email,
        phoneNumber: r.phoneNumber,
        roleName: r.roleName,
        options: { r: r, op: props }
      };
    })
  );
  return (
    <Paper sx={{ width: "100%", height: 600 }} className="p-2">
      <DataGrid
        rows={rows}
        columns={props.head}
        disableSelectionOnClick
        pageSize={pageSize}
        onPageSizeChange={newPageSize => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20]}
        pagination
        rowHeight={200}
        components={{
          Toolbar: GridToolbar
        }}
      />
    </Paper>
  );
}
