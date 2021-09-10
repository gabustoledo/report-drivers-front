import React, { useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { mainListItems, secondaryListItems } from "./listItems";
// import Chart from "./Chart";
// import Deposits from "./Deposits";
// import Orders from "./Orders";
import axios from "axios";
import { useParams } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Fuel from "./forms/Fuel";
import Toll from "./forms/Toll";
import Extra from "./forms/Extra";
import Viatic from "./forms/Viatic";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/gabustoledo">
        Gabriel Bustamante
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function BarLeft(props) {
  if (props.rol === 3) {
    return (
      <div>
        <Divider />
        <List>{mainListItems}</List>
      </div>
    );
  } else if (props.rol === 2) {
    return (
      <div>
        <Divider />
        <List>{secondaryListItems}</List>
      </div>
    );
  } else if (props.rol === 1) {
    return (
      <div>
        <Divider />
        <List>{mainListItems}</List>
        <Divider />
        <List>{secondaryListItems}</List>
      </div>
    );
  }
}

function Main(props) {
  if (props.type === "combustible") {
    return <Fuel />;
  } else if (props.type === "peaje") {
    return <Toll />;
  } else if (props.type === "viatico") {
    return <Viatic />;
  } else if (props.type === "extra") {
    return <Extra />;
  } else if (props.type === "home") {
    return <h1>Home</h1>;
  } else {
    return <h1>No encontrado</h1>;
  }
}

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [rol, setRol] = React.useState(3);

  const { type } = useParams();

  useEffect(() => {
    const tokenAux = localStorage.getItem("token");

    axios
      .get("http://localhost:8080/api/auth/me", {
        headers: {
          authorization: tokenAux,
        },
      })
      .then((response) => {
        const status = response.status;
        if (status === 200) setAuth(true);
        else {
          setAuth(false);
          window.location.href = "http://localhost:3000";
        }
        if (response.data.role === "dev") {
          setRol(1);
        } else if (response.data.role === "admin") {
          setRol(2);
        }
      })
      .catch((err) => {
        //console.log(err);
        setAuth(false);
        window.location.href = "http://localhost:3000";
      });
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleCloseSesion = () => {
    setAnchorEl(null);
    localStorage.removeItem("token");
    window.location.href = "http://localhost:3000";
  };
  //const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  if (!auth) {
    return <h1>No has ingresado a tu cuenta.</h1>;
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Dashboard
          </Typography>
          <div>
            <IconButton color="inherit" onClick={handleClick}>
              <ExitToAppIcon />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleCloseSesion}>Cerrar Sesión</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <BarLeft rol={rol} />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Main type={type} />
          {/* <Grid container spacing={3}> */}
          {/* Chart */}
          {/* <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <Chart />
              </Paper>
            </Grid> */}
          {/* Recent Deposits */}
          {/* <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Deposits />
              </Paper>
            </Grid> */}
          {/* Recent Orders */}
          {/* <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Orders />
              </Paper>
            </Grid> */}
          {/* </Grid> */}
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}
