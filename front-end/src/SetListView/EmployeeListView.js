export default function EmployeeListView() {
  let columns = [
    {
      label: "Photo",
      id: "photo",
      numeric: false,
      disablePadding: true
    },
    {
      label: "Start work date",
      id: "startWorkDate",
      numeric: false,
      disablePadding: true
    },
    {
      label: "Address",
      id: "address",
      numeric: false,
      disablePadding: false
    },
    {
      label: "First name",
      id: "firstName",
      numeric: false,
      disablePadding: false
    },
    {
      label: "Last name",
      id: "lastName",
      numeric: false,
      disablePadding: false
    },
    {
      label: "Birthday",
      id: "dbay",
      numeric: false,
      disablePadding: false
    },
    {
      label: "Status",
      id: "status",
      numeric: false,
      disablePadding: false
    },
    {
      label: "Email",
      id: "email",
      numeric: false,
      disablePadding: false
    },
    {
      label: "Phone number",
      id: "phoneNumber",
      numeric: false,
      disablePadding: false
    },
    {
      label: "Role",
      id: "roleName",
      numeric: false,
      disablePadding: false
    },
    {
      label: "Options",
      id: "options",
      numeric: false,
      disablePadding: false
    }
  ];
  return columns;
}
