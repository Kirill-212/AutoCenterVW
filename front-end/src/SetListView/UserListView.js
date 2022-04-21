export default function UserListView() {
  let columns = [
    {
      headerName: "Photo",
      field: "photo",
      width: 200,
      editable: false,
      sortable: false,
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
      width: 150,
      editable: false,
      sortable: true
    },
    {
      headerName: "Last name",
      field: "lastName",
      width: 150,
      editable: false,
      sortable: true
    },
    {
      headerName: "Birthday",
      field: "dbay",
      width: 150,
      editable: false,
      sortable: true
    },
    {
      headerName: "Status",
      field: "status",
      width: 150,
      editable: false,
      sortable: true
    },
    {
      headerName: "Email",
      field: "email",
      width: 150,
      editable: false,
      sortable: true
    },
    {
      headerName: "Phone number",
      field: "phoneNumber",
      width: 150,
      editable: false,
      sortable: true
    },
    {
      headerName: "Role",
      field: "roleName",
      width: 150,
      editable: false,
      sortable: true
    },
    {
      headerName: "Options",
      field: "options",
      width: 150,
      editable: false,
      sortable: false
    }
  ];
  return columns;
}
