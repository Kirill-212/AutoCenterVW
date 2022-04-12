export default function CarListView() {
    let columns = [
      {
        label: "Vin",
        id: "vin",
        numeric: false,
        disablePadding: false
      },
      {
        label: "Date of realese cat",
        id: "dateOfRealeseCar",
        numeric: false,
        disablePadding: true
      },
      {
        label: "Sell",
        id: "isActive",
        numeric: false,
        disablePadding: false
      },
      {
        label: "Cost($)",
        id: "cost",
        numeric: true,
        disablePadding: false
      },
      {
        label: "Car mileage(km)",
        id: "carMileage",
        numeric: true,
        disablePadding: false
      },
      {
        label: "Share percentage(%)",
        id: "sharePercentage",
        numeric: true,
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
  