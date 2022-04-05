import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Context from "./context";
import Authorization from "./Components/Auth/Authorization";
import UserHeader from "./Components/Header/UserHeader"
import AdminHeader from './Components/Header/AdminHeader';
import Home from './Components/Home';
import Registration from './Components/Auth/Registration'
function App() {
  const [user, setUser] = React.useState(undefined);

  if (user === undefined) {
    if (localStorage.getItem("user"))
      setUser(localStorage.getItem("user"));
  }
  // console.log(user)
  return (
    <Context.Provider value={{ user, setUser }}>
      <Router>
        <Routes>
          <Route exact path="/login" element={<Authorization />} />
          <Route path="/" element={<Registration />} />
          <Route path="/user" element={<UserHeader />} >
            <Route path="home" element={<Home />} />
          </Route>
          <Route path="/admin" element={<AdminHeader />} >
            <Route path="home" element={<Home />} />
          </Route>
          <Route path="*" element={<h2>Resourse not found</h2>} />
        </Routes>
      </Router>
    </Context.Provider>
  );
}

export default App;
