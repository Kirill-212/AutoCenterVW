import Tooltip from "@mui/material/Tooltip";
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
      description: "Car cost($)",
      type: "number",
      flex: 1,
      minWidth: 60,
      editable: false,
      sortable: true
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
              value={params.value.r.vin}
              onClick={params.value.op.deleteCar}
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
              value={params.value.r.vin}
              onClick={params.value.op.updateCar}
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
            <a
              className="btn btn-primary-sm btn-sm ml-1 text-reset"
              href={`/car/put?vin=${params.value.r.vin}
      `}
            >
              <i className="fa-solid fa-screwdriver-wrench" />
            </a>
          </Tooltip>
          <Tooltip
            disableFocusListener
            disableTouchListener
            title="Get more information about car"
            arrow
          >
            <a
              className="btn btn-primary-sm btn-sm ml-2 text-reset "
              href={`/car/info?vin=${params.value.r.vin}
      `}
            >
              <i className="fa-solid fa-info" />
            </a>
          </Tooltip>
        </div>
    }
  ];
  return columns;
}
