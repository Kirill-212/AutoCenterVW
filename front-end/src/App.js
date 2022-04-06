import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Context from "./context";
import Authorization from "./Components/Auth/Authorization";
import UserHeader from "./Components/Header/UserHeader";
import AdminHeader from "./Components/Header/AdminHeader";
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
import PutCar from './Components/Car/PutCar';
import Car from "./Components/Car/Car";
function App() {
  const [user, setUser] = React.useState(undefined);

  if (user === undefined) {
    if (localStorage.getItem("user")) setUser(localStorage.getItem("user"));
  }

  return (
    <Context.Provider value={{ user, setUser }}>
      <Router>
        <Routes>
          <Route exact path="/login" element={<Authorization />} />
          <Route path="/" element={<Registration />} />
          <Route path="/user" element={<UserHeader />}>
            <Route path="home" element={<Home />} />
          </Route>
          <Route path="/admin" element={<AdminHeader />}>
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
          </Route>
          <Route path="*" element={<h2>Resourse not found</h2>} />
        </Routes>
      </Router>
    </Context.Provider>
  );
}

export default App;
