import React from "react";
import Context from "./context";
import Header from "./Components/Header/Header";
import Main from "./Main";

function App() {
  const [user, setUser] = React.useState(undefined);
  const [open, setOpen] = React.useState(false);
  const [openTestrive, setOpenTestDrive] = React.useState(false);
  const [openOrder, setOpenOrder] = React.useState(false);
  const [openCar, setOpenCar] = React.useState(false);
  const [openCarCenter, setOpenCarCenter] = React.useState(false);
  const [openCarEquipmentForm, setOpenCarEquipmentForm] = React.useState(false);
  const [openCarEquipment, setOpenCarEquipment] = React.useState(false);
  const [openNews, setOpenNews] = React.useState(false);
  const [openEmp, setOpenEmp] = React.useState(false);
  const [openUser, setOpenUser] = React.useState(false);
  const handleClick = (e, value, setValue) => {
    setValue(!value);
  };

  function ClearStorage() {
    setUser(undefined);
    localStorage.clear();
  }
  if (user === undefined) {
    if (localStorage.getItem("user")) setUser(localStorage.getItem("user"));
  }
  function setUserData(value) {
    setUser(value);
  }
  return (
    <Context.Provider value={{ user, setUser }}>
      <Header
        ClearStorage={ClearStorage}
        user={user}
        open={open}
        setOpen={setOpen}
        openTestrive={openTestrive}
        setOpenTestDrive={setOpenTestDrive}
        openOrder={openOrder}
        setOpenOrder={setOpenOrder}
        openCar={openCar}
        setOpenCar={setOpenCar}
        openCarCenter={openCarCenter}
        setOpenCarCenter={setOpenCarCenter}
        openCarEquipmentForm={openCarEquipmentForm}
        setOpenCarEquipmentForm={setOpenCarEquipmentForm}
        openCarEquipment={openCarEquipment}
        setOpenCarEquipment={setOpenCarEquipment}
        openNews={openNews}
        setOpenNews={setOpenNews}
        openEmp={openEmp}
        setOpenEmp={setOpenEmp}
        openUser={openUser}
        setOpenUser={setOpenUser}
        handleClick={handleClick}
      />
      <Main setUserData={setUserData} />
    </Context.Provider>
  );
}

export default App;
