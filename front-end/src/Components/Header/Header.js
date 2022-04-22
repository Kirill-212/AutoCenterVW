import { useContext } from "react";
import * as React from "react";
import Context from "../../context";
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

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end"
}));

function ListItemHeader(props) {
  const { openItem, ...other } = props;
  let icon = null;
  if (openItem != null) {
    icon = openItem ? <ExpandLess /> : <ExpandMore />;
  }

  return (
    <ListItem button {...other}>
      <ListItemText primary={props.text} />
      {icon}
    </ListItem>
  );
}

function Header(props) {
  const { user } = useContext(Context);
  const theme = useTheme();
  const [state, setState] = React.useState(false);
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
    localStorage.clear();
  }
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
            <a
              className="nav-link d-sm-flex align-items-sm-center text-white"
              href="/user/put/user"
            >
              <strong>
                <i className="fa-solid fa-user" />
              </strong>
            </a>
          </Typography>}
        <Typography sx={{ minWidth: 20 }}>
          <a
            className="nav-link d-sm-flex align-items-sm-center text-white"
            href="/home"
          >
            <i className="fa-solid fa-house" />
          </a>
        </Typography>
        <Typography sx={{ minWidth: 20 }}>
          <a
            className="nav-link d-sm-flex align-items-sm-center text-white"
            href="/login"
          >
            <i className="fa-solid fa-arrow-right-to-bracket" />
          </a>
        </Typography>
        <Typography sx={{ minWidth: 20 }}>
          <a
            className="nav-link d-sm-flex align-items-sm-center text-white"
            onClick={ClearStorage}
            href="/login"
          >
            <i className="fa-solid fa-arrow-right-from-bracket" />
          </a>
        </Typography>
        <Typography sx={{ minWidth: 20 }}>
          <a
            className="nav-link d-sm-flex align-items-sm-center text-white"
            onClick={ClearStorage}
            href="/"
          >
            <strong>Register</strong>
          </a>
        </Typography>
      </Box>
      {user !== undefined &&
        <SwipeableDrawer open={state}>
          <DrawerHeader className="bg-dark text-white ">
            <IconButton onClick={UpdateState(false)}>
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
              openItem={open}
              text="Car repairs"
              onClick={e => handleClick(e, open, setOpen)}
            />
            <Collapse in={open} timeout="auto" unmountOnExit sx={{ mr: 4 }}>
              <List disablePadding>
                <a href="/service/user" className="text-reset">
                  <ListItem sx={{ ml: 1 }} button>
                    <ListItemText primary={"List"} />
                  </ListItem>
                </a>
                {JSON.parse(user).roleName === "SERVICE_EMPLOYEE" &&
                  <a href="/service/employee" className="text-reset">
                    <ListItem sx={{ ml: 1 }} button>
                      <ListItemText primary={"List for employee"} />
                    </ListItem>
                  </a>}
              </List>
            </Collapse>
            <Divider />

            <ListItemHeader
              openItem={openTestrive}
              text="Test drives"
              onClick={e => handleClick(e, openTestrive, setOpenTestDrive)}
            />
            <Collapse
              in={openTestrive}
              timeout="auto"
              unmountOnExit
              sx={{ mr: 2 }}
            >
              <List disablePadding>
                <a href="/testdrive/user" className="text-reset">
                  <ListItem sx={{ ml: 1 }} button>
                    <ListItemText primary={"List"} />
                  </ListItem>
                </a>
                {(JSON.parse(user).roleName === "ADMIN" ||
                  JSON.parse(user).roleName === "SUPER_ADMIN" ||
                  JSON.parse(user).roleName === "EMPLOYEE") &&
                  <a href="/testdrive/employee" className="text-reset">
                    <ListItem sx={{ ml: 1 }} button>
                      <ListItemText primary={"List for employee"} />
                    </ListItem>
                  </a>}
              </List>
            </Collapse>
            <Divider />

            <ListItemHeader
              openItem={openOrder}
              text="Orders"
              onClick={e => handleClick(e, openOrder, setOpenOrder)}
            />
            <Collapse
              in={openOrder}
              timeout="auto"
              unmountOnExit
              sx={{ mr: 2 }}
            >
              <List disablePadding>
                <a href="/order/buyer" className="text-reset">
                  <ListItem sx={{ ml: 1 }} button>
                    <ListItemText primary={"List for buyer"} />
                  </ListItem>
                </a>
                <a href="/order/user" className="text-reset">
                  <ListItem sx={{ ml: 1 }} button>
                    <ListItemText primary={"List for owner"} />
                  </ListItem>
                </a>
                {(JSON.parse(user).roleName === "ADMIN" ||
                  JSON.parse(user).roleName === "SUPER_ADMIN" ||
                  JSON.parse(user).roleName === "EMPLOYEE") &&
                  <a href="/order/employee" className="text-reset">
                    <ListItem sx={{ ml: 1 }} button>
                      <ListItemText primary={"List for employee"} />
                    </ListItem>
                  </a>}
              </List>
            </Collapse>
            <Divider />

            <ListItemHeader
              openItem={openCar}
              text="Cars"
              onClick={e => handleClick(e, openCar, setOpenCar)}
            />
            <Collapse in={openCar} timeout="auto" unmountOnExit sx={{ mr: 2 }}>
              <List disablePadding>
                <a href="/clientcar/post" className="text-reset">
                  <ListItem sx={{ ml: 1 }} button>
                    <ListItemText primary={"Post"} />
                  </ListItem>
                </a>
                <a href="/clientcar/user" className="text-reset">
                  <ListItem sx={{ ml: 1 }} button>
                    <ListItemText primary={"List"} />
                  </ListItem>
                </a>
                <a href="/car/list" className="text-reset">
                  <ListItem sx={{ ml: 1 }} button>
                    <ListItemText primary={"List of cars to buy"} />
                  </ListItem>
                </a>
                {(JSON.parse(user).roleName === "ADMIN" ||
                  JSON.parse(user).roleName === "SUPER_ADMIN" ||
                  JSON.parse(user).roleName === "EMPLOYEE") &&
                  <a href="/clientcar" className="text-reset">
                    <ListItem sx={{ ml: 1 }} button>
                      <ListItemText primary={"All List"} />
                    </ListItem>
                  </a>}
              </List>
            </Collapse>

            <Divider />
            {(JSON.parse(user).roleName === "ADMIN" ||
              JSON.parse(user).roleName === "SUPER_ADMIN" ||
              JSON.parse(user).roleName === "EMPLOYEE") &&
              <ListItemHeader
                openItem={openCarCenter}
                text="Auto Center Cars"
                onClick={e => handleClick(e, openCarCenter, setOpenCarCenter)}
              />}
            {(JSON.parse(user).roleName === "ADMIN" ||
              JSON.parse(user).roleName === "SUPER_ADMIN" ||
              JSON.parse(user).roleName === "EMPLOYEE") &&
              <Collapse
                in={openCarCenter}
                timeout="auto"
                unmountOnExit
                sx={{ mr: 2 }}
              >
                <List disablePadding>
                  <a href="/car/post" className="text-reset">
                    <ListItem sx={{ ml: 1 }} button>
                      <ListItemText primary={"Post"} />
                    </ListItem>
                  </a>
                  <a href="/car" className="text-reset">
                    <ListItem sx={{ ml: 1 }} button>
                      <ListItemText primary={"List"} />
                    </ListItem>
                  </a>
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
                openItem={openCarEquipmentForm}
                text="Car equipment form"
                onClick={e =>
                  handleClick(e, openCarEquipmentForm, setOpenCarEquipmentForm)}
              />}
            {(JSON.parse(user).roleName === "ADMIN" ||
              JSON.parse(user).roleName === "SUPER_ADMIN" ||
              JSON.parse(user).roleName === "EMPLOYEE") &&
              <Collapse
                in={openCarEquipmentForm}
                timeout="auto"
                unmountOnExit
                sx={{ mr: 2 }}
              >
                <List disablePadding>
                  <a href="/carequipmentform/post" className="text-reset">
                    <ListItem sx={{ ml: 1 }} button>
                      <ListItemText primary={"Post"} />
                    </ListItem>
                  </a>
                  <a href="/carequipmentform" className="text-reset">
                    <ListItem sx={{ ml: 1 }} button>
                      <ListItemText primary={"List"} />
                    </ListItem>
                  </a>
                </List>
              </Collapse>}
            {(JSON.parse(user).roleName === "ADMIN" ||
              JSON.parse(user).roleName === "SUPER_ADMIN" ||
              JSON.parse(user).roleName === "EMPLOYEE") &&
              <Divider />}

            <ListItemHeader
              openItem={openCarEquipmentForm}
              text="Car equipments"
              onClick={e =>
                handleClick(e, openCarEquipment, setOpenCarEquipment)}
            />
            <Collapse
              in={openCarEquipment}
              timeout="auto"
              unmountOnExit
              sx={{ mr: 2 }}
            >
              <List disablePadding>
                {(JSON.parse(user).roleName === "ADMIN" ||
                  JSON.parse(user).roleName === "SUPER_ADMIN" ||
                  JSON.parse(user).roleName === "EMPLOYEE") &&
                  <a href="/carequipment/post" className="text-reset">
                    <ListItem sx={{ ml: 1 }} button>
                      <ListItemText primary={"Post"} />
                    </ListItem>
                  </a>}
                <a href="/carequipment" className="text-reset">
                  <ListItem sx={{ ml: 1 }} button>
                    <ListItemText primary={"List"} />
                  </ListItem>
                </a>
              </List>
            </Collapse>
            <Divider />

            <ListItemHeader
              openItem={openNews}
              text="News"
              onClick={e => handleClick(e, openNews, setOpenNews)}
            />

            <Collapse in={openNews} timeout="auto" unmountOnExit sx={{ mr: 2 }}>
              <List disablePadding>
                {(JSON.parse(user).roleName === "ADMIN" ||
                  JSON.parse(user).roleName === "SUPER_ADMIN" ||
                  JSON.parse(user).roleName === "EMPLOYEE") &&
                  <a href="/new/post" className="text-reset">
                    <ListItem sx={{ ml: 1 }} button>
                      <ListItemText primary={"Post"} />
                    </ListItem>
                  </a>}
                <a href="/new" className="text-reset">
                  <ListItem sx={{ ml: 1 }} button>
                    <ListItemText primary={"List"} />
                  </ListItem>
                </a>
              </List>
            </Collapse>
            <Divider />

            {(JSON.parse(user).roleName === "ADMIN" ||
              JSON.parse(user).roleName === "SUPER_ADMIN") &&
              <ListItemHeader
                openItem={openEmp}
                text="Employees"
                onClick={e => handleClick(e, openEmp, setOpenEmp)}
              />}
            {(JSON.parse(user).roleName === "ADMIN" ||
              JSON.parse(user).roleName === "SUPER_ADMIN") &&
              <Collapse
                in={openEmp}
                timeout="auto"
                unmountOnExit
                sx={{ mr: 2 }}
              >
                <List disablePadding>
                  <a href="/employee/post" className="text-reset">
                    <ListItem sx={{ ml: 1 }} button>
                      <ListItemText primary={"Post"} />
                    </ListItem>
                  </a>
                  <a href="/employee" className="text-reset">
                    <ListItem sx={{ ml: 1 }} button>
                      <ListItemText primary={"List"} />
                    </ListItem>
                  </a>
                </List>
              </Collapse>}
            {(JSON.parse(user).roleName === "ADMIN" ||
              JSON.parse(user).roleName === "SUPER_ADMIN") &&
              <Divider />}

            {(JSON.parse(user).roleName === "ADMIN" ||
              JSON.parse(user).roleName === "SUPER_ADMIN") &&
              <ListItemHeader
                openItem={openUser}
                text="Users"
                onClick={e => handleClick(e, openUser, setOpenUser)}
              />}
            {(JSON.parse(user).roleName === "ADMIN" ||
              JSON.parse(user).roleName === "SUPER_ADMIN") &&
              <Collapse
                in={openUser}
                timeout="auto"
                unmountOnExit
                sx={{ mr: 2 }}
              >
                <List disablePadding>
                  <a href="/user" className="text-reset">
                    <ListItem sx={{ ml: 1 }} button>
                      <ListItemText primary={"List"} />
                    </ListItem>
                  </a>
                </List>
              </Collapse>}
            {(JSON.parse(user).roleName === "ADMIN" ||
              JSON.parse(user).roleName === "SUPER_ADMIN") &&
              <Divider />}
          </Box>
        </SwipeableDrawer>}
    </div>
  );
}
export default Header;
