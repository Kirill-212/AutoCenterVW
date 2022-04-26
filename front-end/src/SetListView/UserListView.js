import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
export default function UserListView() {
  let columns = [
    {
      headerName: "Photo",
      field: "photo",
      editable: false,
      sortable: false,
      filterable: false,
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
      sortable: true
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
      sortable: true
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
      width: 180,
      filterable: false,
      type: "actions",
      renderCell: params =>
        <div className="d-grid gap-2 d-md-block">
          {(JSON.parse(params.value.op.email).email !== params.value.r.email ||
            params.value.r.roleName !== "SUPER_ADMIN") &&
            <Tooltip
              disableFocusListener
              disableTouchListener
              title="Delete user"
              arrow
            >
              <button
                color="purple"
                size="sm"
                className="btn btn-primary-sm btn-sm m-2"
                value={params.value.r.email}
                onClick={params.value.op.deleteUser}
              >
                <i className="fa-regular fa-trash-can" />
              </button>
            </Tooltip>}
          {params.value.r.roleName === "USER" &&
            params.value.r.status === "CREATED" &&
            <Tooltip
              disableFocusListener
              disableTouchListener
              title="Active user account"
              arrow
            >
              <button
                color="purple"
                size="sm"
                className="btn btn-primary-sm btn-sm m-2"
                value={params.value.r.email}
                onClick={params.value.op.updateStatusUser}
              >
                <i className="fa-solid fa-check" />
              </button>
            </Tooltip>}
          {params.value.r.roleName !== "SUPER_ADMIN" &&
            <Tooltip
              disableFocusListener
              disableTouchListener
              title="Update user"
              arrow
            >
              <Link
                size="sm"
                className="text-reset btn btn-primary-sm btn-sm m-2"
                to={`/user/put?firstName=${params.value.r.firstName}
                          &lastName=${params.value.r.lastName}&surname=${params
                  .value.r.surname}
                          &email=${params.value.r.email}&phoneNumber=${params
                  .value.r.phoneNumber}
                          &dBay=${params.value.r.dBay}&urlPhoto=${params.value.r
                  .urlPhoto}`}
              >
                <i className="fa-solid fa-screwdriver-wrench" />
              </Link>
            </Tooltip>}
        </div>
    }
  ];
  return columns;
}
