import Tooltip from "@mui/material/Tooltip";
export default function EmployeeListView() {
  let columns = [
    {
      headerName: "Photo",
      field: "photo",
      editable: false,
      sortable: false,
      filterable: false,
      disableClickEventBubbling: true,
      width: 220,
      renderCell: params =>
        <img
          src={params.value}
          className="rounded-circle"
          width="200"
          height="200"
          alt="..."
        />
    },
    {
      headerName: "Date",
      field: "startWorkDate",
      description: "Start work date",
      type: "dateTime",
      width: 108,
      editable: false,
      sortable: true
    },
    {
      headerName: "Address",
      field: "address",
      editable: false,
      flex: 1,
      minWidth: 200,
      sortable: true
    },
    {
      headerName: "First name",
      field: "firstName",
      flex: 1,
      minWidth: 200,
      editable: false,
      sortable: true
    },
    {
      headerName: "Last name",
      field: "lastName",
      flex: 1,
      minWidth: 200,
      editable: false,
      sortable: true,
      resizable: true
    },
    {
      headerName: "Birthday",
      field: "dbay",
      type: "dateTime",
      width: 130,
      editable: false,
      sortable: true
    },
    {
      headerName: "Status",
      field: "status",
      minWidth: 119,
      editable: false,
      sortable: true
    },
    {
      headerName: "Email",
      field: "email",
      minWidth: 200,
      editable: false,
      sortable: true,
      resizable: true
    },
    {
      headerName: "Phone number",
      field: "phoneNumber",
      editable: false,
      width: 170,
      sortable: true
    },
    {
      headerName: "Role",
      field: "roleName",
      editable: false,
      width: 120,
      sortable: true
    },
    {
      headerName: "Options",
      field: "options",
      type: "actions",
      filterable: false,
      width: 150,
      renderCell: params =>
        <div className="d-grid gap-2 d-md-block">
          {console.log(
            params.value.r.getUserDto.roleName !== "SUPER_ADMIN",
            JSON.parse(params.value.op.email).email !==
              params.value.r.getUserDto.email
          )}
          {(params.value.r.getUserDto.roleName !== "SUPER_ADMIN" ||
            JSON.parse(params.value.op.email).email !==
              params.value.r.getUserDto.email) &&
            <Tooltip
              disableFocusListener
              disableTouchListener
              title="Delete employee"
              arrow
            >
              <button
                className="btn btn-primary-sm btn-sm m-2"
                color="purple"
                size="sm"
                value={params.value.r.getUserDto.email}
                onClick={params.value.op.deleteEmployee}
              >
                <i className="fas fa-trash" />
              </button>
            </Tooltip>}
          {(params.value.r.getUserDto.roleName !== "SUPER_ADMIN" ||
            JSON.parse(params.value.op.email).email !==
              params.value.r.getUserDto.email) &&
            <Tooltip
              disableFocusListener
              disableTouchListener
              title="Update employee"
              arrow
            >
              <a
                className="text-reset btn btn-primary-sm btn-sm m-2"
                href={`/employee/put?email=${params.value.r.getUserDto.email}
                  &address=${params.value.r.address}&roleName=${params.value.r
                  .getUserDto.roleName}
                  `}
              >
                <i className="fa-solid fa-screwdriver-wrench" />
              </a>
            </Tooltip>}
        </div>
    }
  ];
  return columns;
}
