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
    <Box sx={{ width: "90%" }} className="pt-5">
      <Paper sx={{ width: "100%", p: 5 }}>
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
                        {row.vin}
                      </TableCell>
                      <TableCell align="right" className="text-center">
                        {getDate(row.dateOfRealeseCar)}
                      </TableCell>
                      <TableCell align="right" className="text-center">
                        {row.isActive === true && "True"}
                        {row.isActive !== true && "False"}
                      </TableCell>
                      <TableCell align="right" className="text-center">
                        {row.cost}
                      </TableCell>
                      <TableCell align="right" className="text-center">
                        {row.carMileage}
                      </TableCell>
                      <TableCell align="right" className="text-center">
                        {row.actionCar !== undefined &&
                          row.actionCar.sharePercentage}
                        {row.actionCar === undefined && "None"}
                      </TableCell>
                      <TableCell align="right" className="text-center">
                        {
                          <button
                            color="purple"
                            size="sm"
                            value={row.vin}
                            onClick={props.deleteCar}
                          >
                            <i className="fa-solid fa-user-minus" />
                          </button>
                        }
                        <a
                          className="text-reset pl-1"
                          href={`/admin/car/put?vin=${row.vin}
                          `}
                        >
                          <i className="fa fa-wrench" aria-hidden="true" />
                        </a>
                        {
                          <button
                            color="purple"
                            size="sm"
                            value={row.vin}
                            onClick={props.updateCar}
                          >
                            <i className="fa-solid fa-user-minus" />
                          </button>
                        }
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
