import { React, useContext } from "react";
import Context from "../../context";

function Header() {
  const { user } = useContext(Context);
  function ClearStorage() {
    localStorage.clear();
  }
  return (
    <header role="banner">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid justify-content-between">
          <div class="d-flex">
            <img
              width={60}
              height={60}
              src="https://res.cloudinary.com/courseaspcore/image/upload/v1649405611/free-png.ru-8_zjx2k8.png"
            />
          </div>
          <ul class="navbar-nav flex-row">
            <li class="nav-item dropdown mt-1  ">
              <a
                class="nav-link dropdown-toggle hidden-arrow"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-mdb-toggle="dropdown"
                aria-expanded="false"
              >
                <strong>Employee</strong>
              </a>
              <ul
                class="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <a class="dropdown-item" href="/employee">
                    List
                  </a>
                </li>
                <li>
                  <a class="dropdown-item" href="/employee/post">
                    Post
                  </a>
                </li>
              </ul>
            </li>
            <li class="nav-item dropdown mt-1  ">
              <a
                class="nav-link dropdown-toggle hidden-arrow"
                href="#"
                id="navbarDropdownMenuLink"
                role="button"
                data-mdb-toggle="dropdown"
                aria-expanded="false"
              >
                <strong>User</strong>
              </a>
              <ul
                class="dropdown-menu dropdown-menu-end"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li>
                  <a class="dropdown-item" href="user">
                    List
                  </a>
                </li>
              </ul>
            </li>

            <li class="nav-item mt-1  ">
              <a
                class="nav-link d-sm-flex align-items-sm-center"
                onClick={ClearStorage}
                href="/"
              >
                <strong>Register</strong>
              </a>
            </li>
            <li class="nav-item mt-1  ">
              <a
                class="nav-link d-sm-flex align-items-sm-center"
                onClick={ClearStorage}
                href="/login"
              >
                <strong>LogOut</strong>
              </a>
            </li>
            <li class="nav-item mt-1  ">
              <a class="nav-link d-sm-flex align-items-sm-center" href="/login">
                <strong>LogIn</strong>
              </a>
            </li>
            <li class="nav-item mt-2  ">
              <a class="nav-link d-sm-flex align-items-sm-center" href="/home">
                <i class="fa-solid fa-house" />
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
export default Header;
