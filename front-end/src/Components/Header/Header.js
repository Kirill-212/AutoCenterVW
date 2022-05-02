import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Collapse from "@mui/material/Collapse";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { styled, useTheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Link } from "react-router-dom";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end"
}));

let style = { padding: "0px 2px 0 5px" };
let styleListItem = { padding: "0px 2px 0 10px" };

function ListItemHeader(props) {
  const { openItem, ...other } = props;
  let icon = null;
  if (openItem != null) {
    icon = openItem ? <ExpandLess /> : <ExpandMore />;
  }

  return (
    <ListItem button {...other} style={style}>
      <ListItemText primary={props.text} style={style} />
      {icon}
    </ListItem>
  );
}

function Header(props) {
  const user = props.user;
  const theme = useTheme();
  const [state, setState] = React.useState(false);

  const UpdateState = open => event => {
    event.stopPropagation();
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState(open);
  };
  return (
    <div className=" bg-dark text-white ">
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        {user !== undefined &&
          <Button onClick={UpdateState(true)} className="text-white">
            <MenuIcon />
          </Button>}
        {user !== undefined &&
          <Typography sx={{ minWidth: 20 }}>
            <Link
              className="nav-link d-sm-flex align-items-sm-center text-white"
              to="/user/put/user"
            >
              <strong>
                <i className="fa-solid fa-user" />
              </strong>
            </Link>
          </Typography>}
        <Typography sx={{ minWidth: 20 }}>
          <Link
            className="nav-link d-sm-flex align-items-sm-center text-white"
            to="/home"
          >
            <i className="fa-solid fa-house" />
          </Link>
        </Typography>
        <Typography sx={{ minWidth: 20 }}>
          <Link
            className="nav-link d-sm-flex align-items-sm-center text-white"
            to="/login"
          >
            <i className="fa-solid fa-arrow-right-to-bracket" />
          </Link>
        </Typography>
        <Typography sx={{ minWidth: 20 }}>
          <Link
            className="nav-link d-sm-flex align-items-sm-center text-white"
            onClick={props.ClearStorage}
            to="/login"
          >
            <i className="fa-solid fa-arrow-right-from-bracket" />
          </Link>
        </Typography>
        <Typography sx={{ minWidth: 20 }}>
          <Link
            className="nav-link d-sm-flex align-items-sm-center text-white"
            onClick={props.ClearStorage}
            to="/"
          >
            <strong>Register</strong>
          </Link>
        </Typography>
        <Typography sx={{ minWidth: 20 }}>
        <i class="fa-solid fa-phone"></i> +375 (11) 111-11-11
        </Typography>
        <Typography sx={{ minWidth: 20 }} className="ml-1">
        <i class="fa-solid fa-envelope"></i> xxxx@gmail.com
        </Typography>
      </Box>
      {user !== undefined &&
        <SwipeableDrawer open={state} className="h-100">
          <DrawerHeader className="bg-dark text-white" sx={{ height: 50 }}>
            <IconButton style={style} onClick={UpdateState(false)}>
              {theme.direction === "ltr"
                ? <ChevronLeftIcon className="text-white" />
                : <ChevronRightIcon className="text-white" />}
            </IconButton>
          </DrawerHeader>
          <Box
            sx={{ width: 260 }}
            role="presentation"
            className="h-100 bg-dark text-white "
          >
            <ListItemHeader
              openItem={props.open}
              text="Car repairs"
              onClick={e => props.handleClick(e, props.open, props.setOpen)}
            />
            <Collapse
              in={props.open}
              timeout="auto"
              unmountOnExit
              className="ml-2"
            >
              <List>
                <Link to="/service/user" className="text-reset">
                  <ListItem button style={styleListItem}>
                    <ListItemText primary={"List"} />
                  </ListItem>
                </Link>
                {JSON.parse(user).roleName === "SERVICE_EMPLOYEE" &&
                  <Link to="/service/employee" className="text-reset">
                    <ListItem button style={styleListItem}>
                      <ListItemText primary={"List for employee"} />
                    </ListItem>
                  </Link>}
              </List>
            </Collapse>
            <Divider />
            <ListItemHeader
              openItem={props.openTestrive}
              text="Test drives"
              onClick={e =>
                props.handleClick(
                  e,
                  props.openTestrive,
                  props.setOpenTestDrive
                )}
            />
            <Collapse
              in={props.openTestrive}
              timeout="auto"
              unmountOnExit
              className="ml-2"
            >
              <List disablePadding>
                <Link to="/testdrive/user" className="text-reset">
                  <ListItem button style={styleListItem}>
                    <ListItemText primary={"List"} />
                  </ListItem>
                </Link>
                {(JSON.parse(user).roleName === "ADMIN" ||
                  JSON.parse(user).roleName === "SUPER_ADMIN" ||
                  JSON.parse(user).roleName === "EMPLOYEE") &&
                  <Link to="/testdrive/employee" className="text-reset">
                    <ListItem button style={styleListItem}>
                      <ListItemText primary={"List for employee"} />
                    </ListItem>
                  </Link>}
              </List>
            </Collapse>
            <Divider />
            <ListItemHeader
              openItem={props.openOrder}
              text="Orders"
              onClick={e =>
                props.handleClick(e, props.openOrder, props.setOpenOrder)}
            />
            <Collapse
              in={props.openOrder}
              timeout="auto"
              unmountOnExit
              className="ml-2"
            >
              <List disablePadding>
                <Link to="/order/buyer" className="text-reset">
                  <ListItem button style={styleListItem}>
                    <ListItemText primary={"List for buyer"} />
                  </ListItem>
                </Link>
                <Link to="/order/user" className="text-reset">
                  <ListItem button style={styleListItem}>
                    <ListItemText primary={"List for owner"} />
                  </ListItem>
                </Link>
                {(JSON.parse(user).roleName === "ADMIN" ||
                  JSON.parse(user).roleName === "SUPER_ADMIN" ||
                  JSON.parse(user).roleName === "EMPLOYEE") &&
                  <Link to="/order/employee" className="text-reset">
                    <ListItem button style={styleListItem}>
                      <ListItemText primary={"List for employee"} />
                    </ListItem>
                  </Link>}
              </List>
            </Collapse>
            <Divider />
            <ListItemHeader
              openItem={props.openCar}
              text="Cars"
              onClick={e =>
                props.handleClick(e, props.openCar, props.setOpenCar)}
            />
            <Collapse
              in={props.openCar}
              timeout="auto"
              unmountOnExit
              className="ml-2"
            >
              <List disablePadding>
                <Link to="/clientcar/post" className="text-reset">
                  <ListItem button style={styleListItem}>
                    <ListItemText primary={"Post"} />
                  </ListItem>
                </Link>
                <Link to="/clientcar/user" className="text-reset">
                  <ListItem button style={styleListItem}>
                    <ListItemText primary={"List"} />
                  </ListItem>
                </Link>
                <Link to="/car/list" className="text-reset">
                  <ListItem button style={styleListItem}>
                    <ListItemText primary={"List of cars to buy"} />
                  </ListItem>
                </Link>
                {(JSON.parse(user).roleName === "ADMIN" ||
                  JSON.parse(user).roleName === "SUPER_ADMIN" ||
                  JSON.parse(user).roleName === "EMPLOYEE") &&
                  <Link to="/clientcar" className="text-reset">
                    <ListItem button style={styleListItem}>
                      <ListItemText primary={"All List"} />
                    </ListItem>
                  </Link>}
              </List>
            </Collapse>
            <Divider />
            {(JSON.parse(user).roleName === "ADMIN" ||
              JSON.parse(user).roleName === "SUPER_ADMIN" ||
              JSON.parse(user).roleName === "EMPLOYEE") &&
              <ListItemHeader
                openItem={props.openCarCenter}
                text="Auto Center Cars"
                onClick={e =>
                  props.handleClick(
                    e,
                    props.openCarCenter,
                    props.setOpenCarCenter
                  )}
              />}
            {(JSON.parse(user).roleName === "ADMIN" ||
              JSON.parse(user).roleName === "SUPER_ADMIN" ||
              JSON.parse(user).roleName === "EMPLOYEE") &&
              <Collapse
                in={props.openCarCenter}
                timeout="auto"
                unmountOnExit
                className="ml-2"
              >
                <List disablePadding>
                  <Link to="/car/post" className="text-reset">
                    <ListItem button style={styleListItem}>
                      <ListItemText primary={"Post"} />
                    </ListItem>
                  </Link>
                  <Link to="/car" className="text-reset">
                    <ListItem button style={styleListItem}>
                      <ListItemText primary={"List"} />
                    </ListItem>
                  </Link>
                </List>
              </Collapse>}
            {(JSON.parse(user).roleName === "ADMIN" ||
              JSON.parse(user).roleName === "SUPER_ADMIN" ||
              JSON.parse(user).roleName === "EMPLOYEE") &&
              <Divider />}
            {(JSON.parse(user).roleName === "ADMIN" ||
              JSON.parse(user).roleName === "SUPER_ADMIN" ||
              JSON.parse(user).roleName === "EMPLOYEE") &&
              <ListItemHeader
                openItem={props.openCarEquipmentForm}
                text="Car equipment form"
                onClick={e =>
                  props.handleClick(
                    e,
                    props.openCarEquipmentForm,
                    props.setOpenCarEquipmentForm
                  )}
              />}
            {(JSON.parse(user).roleName === "ADMIN" ||
              JSON.parse(user).roleName === "SUPER_ADMIN" ||
              JSON.parse(user).roleName === "EMPLOYEE") &&
              <Collapse
                in={props.openCarEquipmentForm}
                timeout="auto"
                unmountOnExit
                className="ml-2"
              >
                <List disablePadding>
                  <Link to="/carequipmentform/post" className="text-reset">
                    <ListItem button style={styleListItem}>
                      <ListItemText primary={"Post"} />
                    </ListItem>
                  </Link>
                  <Link to="/carequipmentform" className="text-reset">
                    <ListItem button style={styleListItem}>
                      <ListItemText primary={"List"} />
                    </ListItem>
                  </Link>
                </List>
              </Collapse>}
            {(JSON.parse(user).roleName === "ADMIN" ||
              JSON.parse(user).roleName === "SUPER_ADMIN" ||
              JSON.parse(user).roleName === "EMPLOYEE") &&
              <Divider />}

            <ListItemHeader
              openItem={props.openCarEquipmentForm}
              text="Car equipments"
              onClick={e =>
                props.handleClick(
                  e,
                  props.openCarEquipment,
                  props.setOpenCarEquipment
                )}
            />
            <Collapse
              in={props.openCarEquipment}
              timeout="auto"
              unmountOnExit
              className="ml-2"
            >
              <List disablePadding>
                {(JSON.parse(user).roleName === "ADMIN" ||
                  JSON.parse(user).roleName === "SUPER_ADMIN" ||
                  JSON.parse(user).roleName === "EMPLOYEE") &&
                  <Link to="/carequipment/post" className="text-reset">
                    <ListItem button style={styleListItem}>
                      <ListItemText primary={"Post"} />
                    </ListItem>
                  </Link>}
                <Link to="/carequipment" className="text-reset">
                  <ListItem button style={styleListItem}>
                    <ListItemText primary={"List"} />
                  </ListItem>
                </Link>
              </List>
            </Collapse>
            <Divider />
            <ListItemHeader
              openItem={props.openNews}
              text="News"
              onClick={e =>
                props.handleClick(e, props.openNews, props.setOpenNews)}
            />
            <Collapse
              in={props.openNews}
              timeout="auto"
              unmountOnExit
              className="ml-2"
            >
              <List disablePadding>
                {(JSON.parse(user).roleName === "ADMIN" ||
                  JSON.parse(user).roleName === "SUPER_ADMIN" ||
                  JSON.parse(user).roleName === "EMPLOYEE") &&
                  <Link to="/new/post" className="text-reset">
                    <ListItem button style={styleListItem}>
                      <ListItemText primary={"Post"} />
                    </ListItem>
                  </Link>}
                <Link to="/new" className="text-reset">
                  <ListItem button style={styleListItem}>
                    <ListItemText primary={"List"} />
                  </ListItem>
                </Link>
              </List>
            </Collapse>
            <Divider />
    <div className=" bg-dark text-white " >
            {(JSON.parse(user).roleName === "ADMIN" ||
              JSON.parse(user).roleName === "SUPER_ADMIN") &&
              <ListItemHeader
                openItem={props.openEmp}
                text="Employees"
                onClick={e =>
                  props.handleClick(e, props.openEmp, props.setOpenEmp)}
              />}
            {(JSON.parse(user).roleName === "ADMIN" ||
              JSON.parse(user).roleName === "SUPER_ADMIN") &&
              <Collapse
                in={props.openEmp}
                timeout="auto"
                unmountOnExit
                className="ml-2"
              >
                <List disablePadding>
                  <Link to="/employee/post" className="text-reset">
                    <ListItem button style={styleListItem}>
                      <ListItemText primary={"Post"} />
                    </ListItem>
                  </Link>
                  <Link to="/employee" className="text-reset">
                    <ListItem button style={styleListItem}>
                      <ListItemText primary={"List"} />
                    </ListItem>
                  </Link>
                </List>
              </Collapse>}
            {(JSON.parse(user).roleName === "ADMIN" ||
              JSON.parse(user).roleName === "SUPER_ADMIN") &&
              <Divider />}
            {(JSON.parse(user).roleName === "ADMIN" ||
              JSON.parse(user).roleName === "SUPER_ADMIN") &&
              <ListItemHeader
              className="bg-dark text-white"
                openItem={props.openUser}
                text="Users"
                onClick={e =>
                  props.handleClick(e, props.openUser, props.setOpenUser)}
              />}      
            {(JSON.parse(user).roleName === "ADMIN" ||
              JSON.parse(user).roleName === "SUPER_ADMIN") &&
              <Collapse
                in={props.openUser}
                timeout="auto"
                unmountOnExit
                className="ml-2  bg-dark text-white"
              >
                <List disablePadding   >
                  <Link to="/user" className="text-reset">
                    <ListItem button style={styleListItem}>
                      <ListItemText primary={"List"} />
                    </ListItem>
                  </Link>
                </List>
              </Collapse>}
            {(JSON.parse(user).roleName === "ADMIN" ||
              JSON.parse(user).roleName === "SUPER_ADMIN") &&
              <Divider />}
              </div>
          </Box>
        </SwipeableDrawer>}
    </div>
  );
}
export default Header;
