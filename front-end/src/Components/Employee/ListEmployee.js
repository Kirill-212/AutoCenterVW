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
      {/* <div className="row mt-2 ml-2">
      <div className="row">
        <TableContainer sx={{ maxHeight: 500 }}>
          <Table
            stickyHeader
            aria-label="sticky table"
            sx={{ minWidth: 750 }}
            // aria-labelledby="tableTitle"
            size="medium"
          >
            <EnhancedTableHead
              headCells={props.head}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      className="justify-content-center form-outline"
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        <img
                          src={row.getUserDto.urlPhoto}
                          className="rounded-circle"
                          width="200"
                          height="200"
                          alt="..."
                        />
                      </TableCell>
                      <TableCell align="right" className="text-center">
                        {getDate(row.startWorkDate)}
                      </TableCell>
                      <TableCell align="right" className="text-center">
                        {row.address}
                      </TableCell>
                      <TableCell align="right" className="text-center">
                        {row.getUserDto.firstName}
                      </TableCell>
                      <TableCell align="right" className="text-center">
                        {row.getUserDto.lastName}
                      </TableCell>
                      <TableCell align="right" className="text-center">
                        {getDate(row.getUserDto.dBay)}
                      </TableCell>
                      <TableCell align="right" className="text-center">
                        {row.getUserDto.status}
                      </TableCell>
                      <TableCell align="right" className="text-center">
                        {row.getUserDto.email}
                      </TableCell>
                      <TableCell align="right" className="text-center">
                        {row.getUserDto.phoneNumber}
                      </TableCell>
                      <TableCell align="right" className="text-center">
                        {row.getUserDto.roleName}
                      </TableCell>
                      <TableCell align="right">
                        {JSON.parse(props.email).email !==
                          row.getUserDto.email &&
                          <div className="d-grid gap-2 d-md-block">
                            {row.getUserDto.roleName !== "SUPER_ADMIN" &&
                              <button
                                className="btn btn-primary-sm btn-sm m-2"
                                color="purple"
                                size="sm"
                                value={row.getUserDto.email}
                                onClick={props.deleteEmployee}
                              >
                                <i className="fas fa-trash" />
                              </button>}
                            {row.getUserDto.roleName !== "SUPER_ADMIN" &&
                              <a
                                className="text-reset btn btn-primary-sm btn-sm m-2"
                                href={`/employee/put?email=${row.getUserDto
                                  .email}
                          &address=${row.address}&roleName=${row.getUserDto
                                  .roleName}
                          `}
                              >
                                <i className="fa-solid fa-screwdriver-wrench" />
                              </a>}
                          </div>}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 &&
                <TableRow
                  style={{
                    height: 23 * emptyRows
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div> */}
    </Paper>
  );
}
