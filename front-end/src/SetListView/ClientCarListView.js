export default function CarListView() {
  let columns = [
    {
      label: "Vin",
      id: "vin",
      numeric: false,
      disablePadding: true
    },
    {
      label: "Register number",
      id: "registerNumber",
      numeric: false,
      disablePadding: true
    },
    {
      label: "Date of realese car",
      id: "dateOfRealeseCar",
      numeric: false,
      disablePadding: true
    },
    {
      label: "Is active",
      id: "isActive",
      numeric: false,
      disablePadding: true
    },
    {
      label: "Cost($)",
      id: "cost",
      numeric: true,
      disablePadding: true
    },
    {
      label: "Car mileage(km)",
      id: "carMileage",
      numeric: true,
      disablePadding: true
    },
    {
      label: "Share percentage(%)",
      id: "sharePercentage",
      numeric: true,
      disablePadding: true
    },
    {
      label: "Options",
      id: "options",
      numeric: false,
      disablePadding: true
    }
  ];
  return columns;
}
