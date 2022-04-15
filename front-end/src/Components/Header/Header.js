import { React, useContext,useEffect } from "react";
import Context from "../../context";

function Header(props) {
  const { user } = useContext(Context);
  function ClearStorage() {
    localStorage.clear();
  }
  console.log(user,props.user);

  return (
    <header role="banner">
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid justify-content-between">
          <div className="d-flex">
            <img
              width={60}
              height={60}
              src="https://res.cloudinary.com/courseaspcore/image/upload/v1649405611/free-png.ru-8_zjx2k8.png"
            />
          </div>
          <ul className="navbar-nav flex-row">
            {user !== undefined &&
              <>
                 <li className="nav-item dropdown mt-1  ">
                  <a
                    className="nav-link dropdown-toggle hidden-arrow"
                    href="#"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-mdb-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <strong>Service</strong>
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                  
                   
                    <li>
                      <a className="dropdown-item" href="/service/user">
                      List
                      </a>
                    </li>
                    {
                  JSON.parse(user).roleName === "SERVICE_EMPLOYEE" &&  <li>
                      <a className="dropdown-item" href="/service/employee">
                      List for employee
                      </a>
                    </li>}
                  </ul>
                </li>
                  <li className="nav-item dropdown mt-1  ">
                  <a
                    className="nav-link dropdown-toggle hidden-arrow"
                    href="#"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-mdb-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <strong>Test drive</strong>
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                  
                   
                    <li>
                      <a className="dropdown-item" href="/testdrive/user">
                      List
                      </a>
                    </li>
                    {(JSON.parse(user).roleName === "ADMIN"||JSON.parse(user).roleName === "SUPER_ADMIN" ||
                  JSON.parse(user).roleName === "EMPLOYEE") &&  <li>
                      <a className="dropdown-item" href="/testdrive/employee">
                      List for employee
                      </a>
                    </li>}
                  </ul>
                </li>
                  <li className="nav-item dropdown mt-1  ">
                  <a
                    className="nav-link dropdown-toggle hidden-arrow"
                    href="#"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-mdb-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <strong>Order</strong>
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                  
                    <li>
                      <a className="dropdown-item" href="/order/buyer">
                        List for buyer
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/order/user">
                      List for owner
                      </a>
                    </li>
                    {(JSON.parse(user).roleName === "ADMIN" ||JSON.parse(user).roleName === "SUPER_ADMIN"||
                  JSON.parse(user).roleName === "EMPLOYEE") &&  <li>
                      <a className="dropdown-item" href="/order/employee">
                      List for employee
                      </a>
                    </li>}
                  </ul>
                </li>
                <li className="nav-item dropdown mt-1  ">
                  <a
                    className="nav-link dropdown-toggle hidden-arrow"
                    href="#"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-mdb-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <strong>Car</strong>
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <li>
                      <a className="dropdown-item" href="/clientcar/post">
                        Post
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/clientcar/user">
                        List
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/car/list">
                      List of cars to buy
                      </a>
                    </li>
                    {(JSON.parse(user).roleName === "ADMIN" ||JSON.parse(user).roleName === "SUPER_ADMIN"||
                  JSON.parse(user).roleName === "EMPLOYEE") &&  <li>
                      <a className="dropdown-item" href="/clientcar">
                      All List
                      </a>
                    </li>}
                  </ul>
                </li>

               {(JSON.parse(user).roleName === "ADMIN" ||JSON.parse(user).roleName === "SUPER_ADMIN"||
                  JSON.parse(user).roleName === "EMPLOYEE") && <li className="nav-item dropdown mt-1  ">
                  <a
                    className="nav-link dropdown-toggle hidden-arrow"
                    href="#"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-mdb-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <strong>Auto Center Car</strong>
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <li>
                      <a className="dropdown-item" href="/car/post">
                        Post
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/car">
                       List
                      </a>
                    </li>
                  </ul>
                </li>}
                

                {(JSON.parse(user).roleName === "ADMIN" ||JSON.parse(user).roleName === "SUPER_ADMIN"||
                  JSON.parse(user).roleName === "EMPLOYEE") &&<li className="nav-item dropdown mt-1  ">
                  <a
                    className="nav-link dropdown-toggle hidden-arrow"
                    href="#"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-mdb-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <strong>Car equipment form</strong>
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <li>
                      <a className="dropdown-item" href="/carequipmentform">
                       List
                      </a>
                    </li>
                   <li>
                      <a className="dropdown-item" href="/carequipmentform/post">
                        Post
                      </a>
                    </li>
                    
                  </ul>
                </li>}

                 <li className="nav-item dropdown mt-1  ">
                  <a
                    className="nav-link dropdown-toggle hidden-arrow"
                    href="#"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-mdb-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <strong>Car equipment</strong>
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <li>
                      <a className="dropdown-item" href="/carequipment">
                        List
                      </a>
                    </li>
                    {(JSON.parse(user).roleName === "ADMIN" ||JSON.parse(user).roleName === "SUPER_ADMIN"||
                  JSON.parse(user).roleName === "EMPLOYEE") &&<li>
                      <a className="dropdown-item" href="/carequipment/post">
                        Post
                      </a>
                    </li>}
                  </ul>
                </li>
                <li className="nav-item dropdown mt-1  ">
                  <a
                    className="nav-link dropdown-toggle hidden-arrow"
                    href="#"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-mdb-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <strong>New</strong>
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                     {(JSON.parse(user).roleName === "ADMIN" ||JSON.parse(user).roleName === "SUPER_ADMIN"||
                  JSON.parse(user).roleName === "EMPLOYEE") &&<li>
                      <a className="dropdown-item" href="/new/post">
                        Post
                      </a>
                    </li>}
                    <li>
                      <a className="dropdown-item" href="/new">
                       List
                      </a>
                    </li>
                  </ul>
                </li>
                {(JSON.parse(user).roleName === "ADMIN"||JSON.parse(user).roleName === "SUPER_ADMIN") &&
                 <li className="nav-item dropdown mt-1  ">
                  <a
                    className="nav-link dropdown-toggle hidden-arrow"
                    href="#"
                    id="navbarDropdownMenuLink"
                    role="button"
                    data-mdb-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <strong>Employee</strong>
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="navbarDropdownMenuLink"
                  >
                    <li>
                      <a className="dropdown-item" href="/employee">
                        List
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="/employee/post">
                        Post
                      </a>
                    </li>
                  </ul>
                </li>}
                {(JSON.parse(user).roleName === "ADMIN" ||JSON.parse(user).roleName === "SUPER_ADMIN")&&
                  <li className="nav-item dropdown mt-1  ">
                    <a
                      className="nav-link dropdown-toggle hidden-arrow"
                      href="#"
                      id="navbarDropdownMenuLink"
                      role="button"
                      data-mdb-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <strong>User</strong>
                    </a>
                    <ul
                      className="dropdown-menu dropdown-menu-end"
                      aria-labelledby="navbarDropdownMenuLink"
                    >
                      <li>
                        <a className="dropdown-item" href="/user">
                          List
                        </a>
                      </li>
                    </ul>
                  </li>}
               
              </>}

              <li className="nav-item mt-1  ">
                  <a
                    className="nav-link d-sm-flex align-items-sm-center"
                    onClick={ClearStorage}
                    href="/"
                  >
                    <strong>Register</strong>
                  </a>
                </li>      
            {user !== undefined &&
              <li className="nav-item mt-2  ">
                <a
                  className="nav-link d-sm-flex align-items-sm-center"
                  href="/user/put/user"
                >
                  <strong>
                    <i className="fa-solid fa-user" />
                  </strong>
                </a>
              </li>}
            <li className="nav-item mt-2  ">
              <a className="nav-link d-sm-flex align-items-sm-center" href="/home">
                <i className="fa-solid fa-house" />
              </a>
            </li>
            <li className="nav-item  mt-2 ">
              <a
                className="nav-link d-sm-flex align-items-sm-center"
                onClick={ClearStorage}
                href="/login"
              >
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
              </a>
            </li>
            <li className="nav-item mt-2  ">
              <a className="nav-link d-sm-flex align-items-sm-center" href="/login">
              <i className="fa-solid fa-arrow-right-to-bracket"></i>
              </a>
            </li>
          </ul>
          
        </div>
      </nav>
    </header>
  );
}
export default Header;
