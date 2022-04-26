import React from "react";
import { Route, Routes } from "react-router-dom";
import Authorization from "./Components/Auth/Authorization";
import Home from "./Components/Home";
import Registration from "./Components/Auth/Registration";
import User from "./Components/User/User";
import PutUser from "./Components/User/PutUser";
import Employee from "./Components/Employee/Employee";
import PostEmployee from "./Components/Employee/PostEmployee";
import PutEmployee from "./Components/Employee/PutEmployee";
import New from "./Components/New/New";
import PostNew from "./Components/New/PostNew";
import PutNew from "./Components/New/PutNew";
import PostCar from "./Components/Car/PostCar";
import PutCar from "./Components/Car/PutCar";
import Car from "./Components/Car/Car";
import CarInfo from "./Components/Car/CarDetails";
import PostClientCar from "./Components/ClientCar/PostClientCar";
import ClientCar from "./Components/ClientCar/ClientCar";
import PutClientCar from "./Components/ClientCar/PutClientCar";
import PutClientCarForUser from "./Components/ClientCar/PuClientCarForUser";
import ClientCarInfo from "./Components/ClientCar/ClientCarDetail";
import PostCarEquipment from "./Components/CarEquipment/PostCarEquipment";
import CarEquipment from "./Components/CarEquipment/CarEquipment";
import PostCarEquipmentForm from "./Components/CarEquipmentForm/PostCarEquipmentForm";
import CarEquipmentForm from "./Components/CarEquipmentForm/CaEquipmentForm";
import PutCarEquipmentForm from "./Components/CarEquipmentForm/PutCarEquipmentForm";
import PostOrder from "./Components/Order/PostOrder";
import EmployeeOrder from "./Components/Order/EmployeeListOrder";
import UserOrder from "./Components/Order/UserListOrder";
import BuyerOrder from "./Components/Order/BuyerListOrder";
import PutOrder from "./Components/Order/UpdateOrderBuyer";
import AllCarForTestDriveOrder from "./Components/TestDrive/CarList";
import PostTestDrive from "./Components/TestDrive/PostTestDrive";
import EmployeeTestDrive from "./Components/TestDrive/EmployeeListTestDrive";
import UserTestDrive from "./Components/TestDrive/UserListTestDrive";
import ClientCarListForUser from "./Components/ClientCar/ClientCarForUser";
import PostService from "./Components/Service/PostService";
import EmployeeServce from "./Components/Service/EmployeeService";
import StartService from "./Components/Service/StartWorkService";
import UserService from "./Components/Service/UserService";
import PutUserForUser from "./Components/User/PutUserForUser";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function App(props) {
  const [open, setOpen] = React.useState(false);
  const [messageError, setMessageError] = React.useState("");
  const [openSpinner, setOpenSpinner] = React.useState(false);

  const handleCloseToggle = () => {
    setOpenSpinner(false);
  };

  const handleToggle = () => {
    setOpenSpinner(!open);
  };
  const handleClick = errorMessage => {
    setOpen(true);
    setMessageError(errorMessage);
  };

  let style = { width: "30rem" };
  function AlertMessageError(mes) {
    return (
      <Snackbar open={open} autoHideDuration={10000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          <div class="text-wrap" style={style}>
            {mes}
          </div>
        </Alert>
      </Snackbar>
    );
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setMessageError("");
    setOpen(false);
  };
  return (
    <>
        <main id="bgImg" role="main">
          <Routes>
            <Route
              exact
              path="/login"
              element={
                <Authorization
                  set={props.setUserData}
                  setMessageError={handleClick}
                  handleToggle={handleToggle}
                  handleClose={handleCloseToggle}
                />
              }
            />
            <Route
              path="/"
              element={
                <Registration
                  setMessageError={handleClick}
                  handleToggle={handleToggle}
                  handleClose={handleCloseToggle}
                />
              }
            />
            <Route path="home" element={<Home />} />
            <Route
              path="user"
              element={
                <User
                  setMessageError={handleClick}
                  handleToggle={handleToggle}
                  handleClose={handleCloseToggle}
                />
              }
            />
            <Route
              path="user/put"
              element={
                <PutUser
                  setMessageError={handleClick}
                  handleToggle={handleToggle}
                  handleClose={handleCloseToggle}
                />
              }
            />
            <Route
              path="user/put/user"
              element={
                <PutUserForUser
                  setMessageError={handleClick}
                  handleToggle={handleToggle}
                  handleClose={handleCloseToggle}
                />
              }
            />
            <Route
              path="employee"
              element={
                <Employee
                  setMessageError={handleClick}
                  handleToggle={handleToggle}
                  handleClose={handleCloseToggle}
                />
              }
            />
            <Route
              path="employee/post"
              element={
                <PostEmployee
                  setMessageError={handleClick}
                  handleToggle={handleToggle}
                  handleClose={handleCloseToggle}
                />
              }
            />
            <Route
              path="employee/put"
              element={
                <PutEmployee
                  setMessageError={handleClick}
                  handleToggle={handleToggle}
                  handleClose={handleCloseToggle}
                />
              }
            />
            <Route
              path="new"
              element={<New setMessageError={handleClick} />}
              handleToggle={handleToggle}
              handleClose={handleCloseToggle}
            />
            <Route
              path="new/post"
              element={
                <PostNew
                  setMessageError={handleClick}
                  handleToggle={handleToggle}
                  handleClose={handleCloseToggle}
                />
              }
            />
            <Route
              path="new/put"
              element={
                <PutNew
                  setMessageError={handleClick}
                  handleToggle={handleToggle}
                  handleClose={handleCloseToggle}
                />
              }
            />
            <Route
              path="car/post"
              element={
                <PostCar
                  setMessageError={handleClick}
                  handleToggle={handleToggle}
                  handleClose={handleCloseToggle}
                />
              }
            />
            <Route
              path="car"
              element={
                <Car
                  setMessageError={handleClick}
                  handleToggle={handleToggle}
                  handleClose={handleCloseToggle}
                />
              }
            />
            <Route
              path="car/put"
              element={
                <PutCar
                  setMessageError={handleClick}
                  handleToggle={handleToggle}
                  handleClose={handleCloseToggle}
                />
              }
            />
            <Route
              path="car/info"
              element={
                <CarInfo
                  setMessageError={handleClick}
                  handleToggle={handleToggle}
                  handleClose={handleCloseToggle}
                />
              }
            />
            <Route
              path="clientcar/post"
              element={
                <PostClientCar
                  setMessageError={handleClick}
                  handleToggle={handleToggle}
                  handleClose={handleCloseToggle}
                />
              }
            />
            <Route
              path="clientcar"
              element={
                <ClientCar
                  setMessageError={handleClick}
                  handleToggle={handleToggle}
                  handleClose={handleCloseToggle}
                />
              }
            />
            <Route
              path="clientcar/put"
              element={
                <PutClientCar
                  setMessageError={handleClick}
                  handleToggle={handleToggle}
                  handleClose={handleCloseToggle}
                />
              }
            />
            <Route
              path="clientcar/put/user"
              element={
                <PutClientCarForUser
                  setMessageError={handleClick}
                  handleToggle={handleToggle}
                  handleClose={handleCloseToggle}
                />
              }
            />
            <Route
              path="clientcar/info"
              element={
                <ClientCarInfo
                  setMessageError={handleClick}
                  handleToggle={handleToggle}
                  handleClose={handleCloseToggle}
                />
              }
            />
            <Route
              path="carequipment/post"
              element={
                <PostCarEquipment
                  setMessageError={handleClick}
                  handleToggle={handleToggle}
                  handleClose={handleCloseToggle}
                />
              }
            />
            <Route
              path="carequipment"
              element={
                <CarEquipment
                  setMessageError={handleClick}
                  handleToggle={handleToggle}
                  handleClose={handleCloseToggle}
                />
              }
            />
            <Route
              path="carequipmentform/post"
              element={
                <PostCarEquipmentForm
                  setMessageError={handleClick}
                  handleToggle={handleToggle}
                  handleClose={handleCloseToggle}
                />
              }
            />
            <Route
              path="carequipmentform/put"
              element={
                <PutCarEquipmentForm
                  setMessageError={handleClick}
                  handleToggle={handleToggle}
                  handleClose={handleCloseToggle}
                />
              }
            />
            <Route
              path="carequipmentform"
              element={
                <CarEquipmentForm
                  setMessageError={handleClick}
                  handleToggle={handleToggle}
                  handleClose={handleCloseToggle}
                />
              }
            />
            <Route
              path="order/post"
              element={
                <PostOrder
                  setMessageError={handleClick}
                  handleToggle={handleToggle}
                  handleClose={handleCloseToggle}
                />
              }
            />
            <Route
              path="order/employee"
              element={
                <EmployeeOrder
                  setMessageError={handleClick}
                  handleToggle={handleToggle}
                  handleClose={handleCloseToggle}
                />
              }
            />
            <Route
              path="order/user"
              element={
                <UserOrder
                  setMessageError={handleClick}
                  handleToggle={handleToggle}
                  handleClose={handleCloseToggle}
                />
              }
            />
            <Route
              path="order/buyer"
              element={
                <BuyerOrder
                  setMessageError={handleClick}
                  handleToggle={handleToggle}
                  handleClose={handleCloseToggle}
                />
              }
            />
            <Route
              path="order/put"
              element={
                <PutOrder
                  setMessageError={handleClick}
                  handleToggle={handleToggle}
                  handleClose={handleCloseToggle}
                />
              }
            />
            <Route
              path="car/list"
              element={
                <AllCarForTestDriveOrder
                  setMessageError={handleClick}
                  handleToggle={handleToggle}
                  handleClose={handleCloseToggle}
                />
              }
            />
            <Route
              path="testdrive/post"
              element={
                <PostTestDrive
                  setMessageError={handleClick}
                  handleToggle={handleToggle}
                  handleClose={handleCloseToggle}
                />
              }
            />
            <Route
              path="testdrive/employee"
              element={
                <EmployeeTestDrive
                  setMessageError={handleClick}
                  handleToggle={handleToggle}
                  handleClose={handleCloseToggle}
                />
              }
            />
            <Route
              path="testdrive/user"
              element={
                <UserTestDrive
                  setMessageError={handleClick}
                  handleToggle={handleToggle}
                  handleClose={handleCloseToggle}
                />
              }
            />
            <Route
              path="clientcar/user"
              element={
                <ClientCarListForUser
                  setMessageError={handleClick}
                  handleToggle={handleToggle}
                  handleClose={handleCloseToggle}
                />
              }
            />
            <Route
              path="service/post"
              element={
                <PostService
                  setMessageError={handleClick}
                  handleToggle={handleToggle}
                  handleClose={handleCloseToggle}
                />
              }
            />
            <Route
              path="service/employee"
              element={
                <EmployeeServce
                  setMessageError={handleClick}
                  handleToggle={handleToggle}
                  handleClose={handleCloseToggle}
                />
              }
            />
            <Route
              path="service/start"
              element={
                <StartService
                  setMessageError={handleClick}
                  handleToggle={handleToggle}
                  handleClose={handleCloseToggle}
                />
              }
            />
            <Route
              path="service/user"
              element={
                <UserService
                  setMessageError={handleClick}
                  handleToggle={handleToggle}
                  handleClose={handleCloseToggle}
                />
              }
            />
            <Route path="*" element={<h2>Resourse not found</h2>} />
          </Routes>
        </main>
 
      <Stack spacing={3} sx={{ width: "100%" }}>
        {AlertMessageError(messageError)}
      </Stack>
      <Backdrop
        sx={{ color: "#fff", zIndex: theme => theme.zIndex.drawer + 1 }}
        open={openSpinner}
        onClick={handleCloseToggle}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
</>
  );
}

export default App;
