import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
export default function CarListView() {
  let columns = [
    {
      headerName: "Vin",
      field: "vin",
      editable: false,
      sortable: true,
      minWidth: 200
    },
    {
      headerName: "Register number",
      field: "registerNumber",
      editable: false,
      sortable: true,
      minWidth: 180
    },
    {
      headerName: "Date",
      field: "dateOfRealeseCar",
      description: "Date of realese car",
      editable: false,
      sortable: true,
      type: "dateTime",
      minWidth: 140
    },
    {
      headerName: "Sell",
      field: "isActive",
      minWidth: 120,
      editable: false,
      sortable: true
    },
    {
      headerName: "($)",
      field: "cost",
      numeric: true,
      disablePadding: true
    },
    {
      headerName: "(km)",
      field: "carMileage",
      description: "Car mileage(km)",
      type: "number",
      flex: 1,
      minWidth: 70,
      editable: false,
      sortable: true
    },
    {
      headerName: "(%)",
      field: "sharePercentage",
      description: "Сar discount percentage(%)",
      flex: 1,
      minWidth: 100,
      editable: false,
      sortable: true
    },
    {
      headerName: "Options",
      field: "options",
      minWidth: 200,
      type: "actions",
      filterable: false,
      renderCell: params =>
        <div className="d-grid gap-2 d-md-block">
          <Tooltip
            disableFocusListener
            disableTouchListener
            title="Delete car"
            arrow
          >
            <button
              className="btn btn-primary-sm btn-sm mr-1"
              value={params.value.r.car.vin}
              onClick={params.value.op.deleteClientCar}
              type="button"
            >
              <i className="fas fa-trash" />
            </button>
          </Tooltip>
          <Tooltip
            disableFocusListener
            disableTouchListener
            title="Update state sell car"
            arrow
          >
            <button
              className="btn btn-primary-sm btn-sm ml-1"
              value={params.value.r.car.vin}
              onClick={params.value.op.updateClientCar}
              type="button"
            >
              <i className="fa-solid fa-sack-dollar" />
            </button>
          </Tooltip>
          <Tooltip
            disableFocusListener
            disableTouchListener
            title="Update car"
            arrow
          >
            <Link
              className="btn btn-primary-sm btn-sm ml-1 text-reset"
              to={`/clientcar/put?vin=${params.value.r.car.vin}&email=${params
                .value.r.user.email}
                          `}
            >
              <i className="fa fa-wrench" aria-hidden="true" />
            </Link>
          </Tooltip>
          <Tooltip
            disableFocusListener
            disableTouchListener
            title="Get more information about car"
            arrow
          >
            <Link
              className="btn btn-primary-sm btn-sm ml-1 text-reset "
              to={`/clientcar/info?vin=${params.value.r.car.vin}
                          `}
            >
              <i className="fa-solid fa-info" />
            </Link>
          </Tooltip>
        </div>
    }
  ];
  return columns;
}
