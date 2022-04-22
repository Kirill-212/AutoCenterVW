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
                        <div className="d-grid gap-2 d-md-block">
                          <button
                            className="btn btn-primary-sm btn-sm mr-1"
                            value={row.car.vin}
                            onClick={props.deleteClientCar}
                            type="button"
                          >
                            <i className="fas fa-trash" />
                          </button>
                          <button
                            className="btn btn-primary-sm btn-sm ml-1"
                            value={row.car.vin}
                            onClick={props.updateClientCar}
                            type="button"
                          >
                            <i className="fa-solid fa-sack-dollar" />
                          </button>
                          <a
                            className="btn btn-primary-sm btn-sm ml-1 text-reset"
                            href={`/clientcar/put?vin=${row.car
                              .vin}&email=${row.user.email}
                          `}
                          >
                            <i className="fa fa-wrench" aria-hidden="true" />
                          </a>
                          <a
                            className="btn btn-primary-sm btn-sm ml-1 text-reset "
                            href={`/clientcar/info?vin=${row.car.vin}
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
