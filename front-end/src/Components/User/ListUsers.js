import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  EnhancedTableHead,
  getComparator,
  stableSort,
  getDate
} from "../ViewLists/SupportFunction";

export default function EnhancedTable(props) {
  const [rows, setRows] = React.useState(props.rows);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  
  const requestSearch = searchedVal => {
    const filteredRows = rows.filter(row => {
      return row.email.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };

  const search = e => {
    if (e.length === 0) {
      setRows(props.rows);
    } else {
      requestSearch(e);
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }} className="p-2">
      <div className="row mt-2 ml-2">
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
                          {props.email !== row.email &&
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
      </div>
    </Paper>
  );
}
