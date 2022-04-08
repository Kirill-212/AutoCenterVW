import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Context from "./context";
import Authorization from "./Components/Auth/Authorization";
import Header from "./Components/Header/Header";
import Home from "./Components/Home";
import Footer from "./Components/Footer";
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
import ClientCarInfo from "./Components/ClientCar/ClientCarDetail";
import PostCarEquipment from "./Components/CarEquipment/PostCarEquipment";
import CarEquipment from "./Components/CarEquipment/CarEquipment";
import PostCarEquipmentForm from "./Components/CarEquipmentForm/PostCarEquipmentForm";
import CarEquipmentForm from "./Components/CarEquipmentForm/CaEquipmentForm";
import PutCarEquipmentForm from "./Components/CarEquipmentForm/PutCarEquipmentForm";
function App() {
  const [user, setUser] = React.useState(undefined);

  if (user === undefined) {
    if (localStorage.getItem("user")) setUser(localStorage.getItem("user"));
  }

  return (
    <Context.Provider value={{ user, setUser }}>
      <Router>
        <Header />
        <main role="main">
          <Routes>
            <Route exact path="/login" element={<Authorization />} />
            <Route path="/" element={<Registration />} />
            <Route path="home" element={<Home />} />
            <Route path="user" element={<User />} />
            <Route path="user/put" element={<PutUser />} />
            <Route path="employee" element={<Employee />} />
            <Route path="employee/post" element={<PostEmployee />} />
            <Route path="employee/put" element={<PutEmployee />} />
            <Route path="new" element={<New />} />
            <Route path="new/post" element={<PostNew />} />
            <Route path="new/put" element={<PutNew />} />
            <Route path="car/post" element={<PostCar />} />
            <Route path="car" element={<Car />} />
            <Route path="car/put" element={<PutCar />} />
            <Route path="car/info" element={<CarInfo />} />
            <Route path="clientcar/post" element={<PostClientCar />} />
            <Route path="clientcar" element={<ClientCar />} />
            <Route path="clientcar/put" element={<PutClientCar />} />
            <Route path="clientcar/info" element={<ClientCarInfo />} />
            <Route path="carequipment/post" element={<PostCarEquipment />} />
            <Route path="carequipment" element={<CarEquipment />} />
            <Route path="carequipment" element={<CarEquipment />} />
            <Route
              path="carequipmentform/post"
              element={<PostCarEquipmentForm />}
            />
            <Route
              path="carequipmentform/put"
              element={<PutCarEquipmentForm />}
            />
            <Route path="carequipmentform" element={<CarEquipmentForm />} />
            <Route path="*" element={<h2>Resourse not found</h2>} />
          </Routes>
        </main>

        <Footer />
      </Router>
    </Context.Provider>
  );
}

export default App;
