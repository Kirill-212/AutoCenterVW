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
        options: <></>
      };
    })
  );
  console.log(props.head);
  console.log(rows);
  return (
    <Paper
      sx={{ width: "100%", height: 500, overflow: "hidden" }}
      className="p-2"
    >
      <DataGrid
        rows={rows}
        columns={props.head}
        disableSelectionOnClick
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[5, 10, 20]}
        pagination
        rowHeight={200}
        components={{
          Toolbar: GridToolbar,
        }}
      />
      {/* <div className="row mt-2 ml-2">
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
      <div className="row pt-2">
        <TableContainer sx={{ maxHeight: 500 }}>
          <Table
            stickyHeader
            aria-label="sticky table"
            sx={{ minWidth: 600 }}
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
                          src={row.urlPhoto}
                          className="rounded-circle"
                          width="200"
                          height="200"
                          alt="..."
                        />
                      </TableCell>
                      <TableCell align="right" className="text-center">
                        {row.firstName}
                      </TableCell>
                      <TableCell align="right" className="text-center">
                        {row.lastName}
                      </TableCell>
                      <TableCell align="right" className="text-center">
                        {getDate(row.dBay)}
                      </TableCell>
                      <TableCell align="right" className="text-center">
                        {row.status}
                      </TableCell>
                      <TableCell align="right" className="text-center">
                        {row.email}
                      </TableCell>
                      <TableCell align="right" className="text-center">
                        {row.phoneNumber}
                      </TableCell>
                      <TableCell align="right" className="text-center">
                        {row.roleName}
                      </TableCell>
                      <TableCell align="right">
                        <div className="d-grid gap-2 d-md-block">
                          {(JSON.parse(props.email).email !== row.email ||
                            row.roleName !== "SUPER_ADMIN") &&
                            <button
                              color="purple"
                              size="sm"
                              className="btn btn-primary-sm btn-sm m-2"
                              value={row.email}
                              onClick={props.deleteUser}
                            >
                              <i className="fa-regular fa-trash-can" />
                            </button>}
                          {row.roleName === "USER" &&
                            row.status === "CREATED" &&
                            <button
                              color="purple"
                              size="sm"
                              className="btn btn-primary-sm btn-sm m-2"
                              value={row.email}
                              onClick={props.updateStatusUser}
                            >
                              <i className="fa-solid fa-check" />
                            </button>}

                          <a
                            size="sm"
                            className="text-reset btn btn-primary-sm btn-sm m-2"
                            href={`/user/put?firstName=${row.firstName}
                          &lastName=${row.lastName}&surname=${row.surname}
                          &email=${row.email}&phoneNumber=${row.phoneNumber}
                          &dBay=${row.dBay}&urlPhoto=${row.urlPhoto}`}
                          >
                            <i className="fa-solid fa-screwdriver-wrench" />
                          </a>
                        </div>
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
