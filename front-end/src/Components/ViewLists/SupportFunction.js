import Box from "@mui/material/Box";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import PropTypes from "prop-types";
export function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

export function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

export function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {props.headCells.map(headCell =>
          <TableCell
            className="text-center"
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id
                ? <Box component="span" sx={visuallyHidden}>
                    {order === "desc"
                      ? "sorted descending"
                      : "sorted ascending"}
                  </Box>
                : null}
            </TableSortLabel>
          </TableCell>
        )}
      </TableRow>
    </TableHead>
  );
}
EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired
};

export function validate_date(date) {
  if (
    new Date(date).getFullYear() >= new Date().getFullYear() - 20 &&
    new Date(date).getFullYear() <= new Date().getFullYear()
  ) {
    return null;
  }
  return "Error: date is not correct";
}

export function validate_dateAge(date) {
  if (new Date(date).getFullYear() <= new Date().getFullYear() - 18) {
    return null;
  }
  return "Error: date is not correct";
}

export function validate_dateTestDrive(date) {
  if (new Date(date).getFullYear() < new Date().getFullYear() + 20) {
    return null;
  }
  return "Error: date is not correct";
}

export function validate_dateService(date) {
  if (new Date(date).getFullYear() < new Date().getFullYear() + 20) {
    return null;
  }
  return "Error: date is not correct";
}

export function getDate(inputDate) {

  let date = new Date(inputDate);
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;

  return year + "-" + month + "-" + day;
}


export function Sort(data,op){
  let sortData=data;
  console.log(data,'data')
  switch(op){
    case '0':
      sortData=sortData.sort(sortASCPrice)
    break;
    case '1':
      sortData=sortData.sort(sortDESCPrice)  
    break;
    case '2':
      sortData=sortData.sort(sortASCDateOfRealese)  
    break;
    case '3':
      sortData=sortData.sort(sortDESCateOfRealese)    
    break;
    break;
    case '4':
      sortData=sortData.sort(sortASCCarMileage)  
    break;
    case '5':
      sortData=sortData.sort(sortDESCCarMileage)    
    break;
   
  }
 return sortData;
}

function sortASCPrice(a, b) {
  if (a.totalCost > b.totalCost) {
  return 1;
  } else if (b.totalCost > a.totalCost) {
  return -1;
  } else {
  return 0;
  }
  }

  function sortASCCarMileage(a, b) {
    if (a.car.carMileage >b.car.carMileage) {
    return 1;
    } else if (b.car.carMileage > a.car.carMileage) {
    return -1;
    } else {
    return 0;
    }
    }

    function sortDESCCarMileage(a, b) {
      if (a.car.carMileage > b.car.carMileage) {
      return -1;
      } else if (b.car.carMileage > a.car.carMileage) {
      return 1;
      } else {
      return 0;
      }
      }

  function sortASCDateOfRealese(a, b) {
    if (getDate(a.car.dateOfRealeseCar) >getDate(b.car.dateOfRealeseCar)) {
    return 1;
    } else if (getDate(b.car.dateOfRealeseCar) > getDate(a.car.dateOfRealeseCar)) {
    return -1;
    } else {
    return 0;
    }
    }

    function sortDESCPrice(a, b) {
      if (a.totalCost > b.totalCost) {
      return -1;
      } else if (b.totalCost > a.totalCost) {
      return 1;
      } else {
      return 0;
      }
      }
      function sortDESCateOfRealese(a, b) {
        if (getDate(a.car.dateOfRealeseCar) > getDate(b.car.dateOfRealeseCar)) {
        return -1;
        } else if (getDate(b.car.dateOfRealeseCar) > getDate(a.car.dateOfRealeseCar)) {
        return 1;
        } else {
        return 0;
        }
        }
