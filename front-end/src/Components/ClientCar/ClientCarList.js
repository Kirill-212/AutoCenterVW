import * as React from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

//import SearchBar from "material-ui-search-bar";
import {
  EnhancedTableHead,
  descendingComparator,
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
  const [searched, setSearched] = React.useState("");

  const requestSearch = searchedVal => {
    const filteredRows = rows.filter(row => {
      return row.vin.toLowerCase().includes(searchedVal.toLowerCase());
    });
    setRows(filteredRows);
  };

  const cancelSearch = () => {
    setSearched("");
    requestSearch(searched);
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
  console.log(rows);
  return (
    <Box sx={{ width: "100%" }} className="pt-5">
      <Paper sx={{ p: 5 }}>
        <input
          type="text"
          className="w-20 shadow-lg  bg-white rounded"
          placeholder="Search"
        />
        <TableContainer sx={{ maxHeight: 550 }}>
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
                        {row.car.vin}
                      </TableCell>
                      <TableCell align="right" className="text-center">
                        {row.registerNumber !== null && row.registerNumber}
                        {row.registerNumber === null && "None"}
                      </TableCell>
                      <TableCell align="right" className="text-center">
                        {getDate(row.car.dateOfRealeseCar)}
                      </TableCell>
                      <TableCell align="right" className="text-center">
                        {row.car.isActive === true && "True"}
                        {row.car.isActive !== true && "False"}
                      </TableCell>
                      <TableCell align="right" className="text-center">
                        {row.car.cost}
                      </TableCell>
                      <TableCell align="right" className="text-center">
                        {row.car.carMileage}
                      </TableCell>
                      <TableCell align="right" className="text-center">
                        {row.car.actionCar !== null &&
                          row.car.actionCar.sharePercentage}
                        {row.car.actionCar === null && "None"}
                      </TableCell>
                      <TableCell align="right" className="text-center">
                        <div class="d-grid gap-2 d-md-block">
                          <button
                            class="btn btn-primary-sm btn-sm mr-1"
                            value={row.car.vin}
                            onClick={props.deleteClientCar}
                            type="button"
                          >
                            <i class="fas fa-trash" />
                          </button>
                          <button
                            class="btn btn-primary-sm btn-sm ml-1"
                            value={row.car.vin}
                            onClick={props.updateClientCar}
                            type="button"
                          >
                            <i class="fa-solid fa-sack-dollar" />
                          </button>
                          <a
                            className="btn btn-primary-sm btn-sm ml-1 text-reset"
                            href={`/admin/clientcar/put?vin=${row.car.vin}
                          `}
                          >
                            <i className="fa fa-wrench" aria-hidden="true" />
                          </a>
                          <a
                            className="btn btn-primary-sm btn-sm ml-1 text-reset "
                            href={`/admin/clientcar/info?vin=${row.car.vin}
                          `}
                          >
                            <i class="fa-solid fa-info" />
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
      </Paper>
    </Box>
  );
}
