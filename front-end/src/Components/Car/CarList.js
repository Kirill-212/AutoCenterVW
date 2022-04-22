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
      {/* <TableContainer sx={{ maxHeight: 550 }}>
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
                        padding="2"
                        
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
                        <div className="d-grid gap-2 d-md-block">
                          <button
                            className="btn btn-primary-sm btn-sm mr-1"
                            value={row.vin}
                            onClick={props.deleteCar}
                            type="button"
                          >
                            <i className="fas fa-trash" />
                          </button>
                          <button
                            className="btn btn-primary-sm btn-sm ml-1"
                            value={row.vin}
                            onClick={props.updateCar}
                            type="button"
                          >
                            <i className="fa-solid fa-sack-dollar" />
                          </button>
                          <a
                            className="btn btn-primary-sm btn-sm ml-1 text-reset"
                            href={`/car/put?vin=${row.vin}
                          `}
                          >
                            <i className="fa-solid fa-screwdriver-wrench" />
                          </a>
                          <a
                            className="btn btn-primary-sm btn-sm ml-1 text-reset "
                            href={`/car/info?vin=${row.vin}
                          `}
                          >
                            <i className="fa-solid fa-info" />
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
