import * as React from "react";
import Paper from "@mui/material/Paper";
import { DataGrid, GridToolbar } from "@material-ui/data-grid";
import { getDate } from "../ViewLists/SupportFunction";

export default function EnhancedTable(props) {
  const [pageSize, setPageSize] = React.useState(5);
  const [rows, setRows] = React.useState(
    props.rows.map(r => {
      return {
        id: r.getUserDto.email,
        startWorkDate: getDate(r.startWorkDate),
        address: r.address,
        photo: r.getUserDto.urlPhoto,
        firstName: r.getUserDto.firstName,
        lastName: r.getUserDto.lastName,
        dbay: getDate(r.getUserDto.dBay),
        status: r.getUserDto.status,
        email: r.getUserDto.email,
        phoneNumber: r.getUserDto.phoneNumber,
        roleName: r.getUserDto.roleName,
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
        className="text-center"
        rows={rows}
        columns={props.head}
        pageSize={pageSize}
        disableSelectionOnClick
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
