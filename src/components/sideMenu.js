import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Grid } from "@material-ui/core";
import FilteredProducts from "./pages/searching";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
// import Container from '@material-ui/core/Container';
import Checkout from './pages/Checkout/CheckOut'
import {
  Divider,
  CssBaseline,
  Drawer,
  // Box,
  List,
  ListItem,
} from "@material-ui/core";
import clsx from "clsx";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MenuIcon from "@material-ui/icons/Menu";
import CartBadge from "./CartBadge";
import {
  Link,
  useHistory,
  Switch,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import Cart from "./pages/CartPge";
import Home from "./pages/Home";

import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import Search from "./Searchbar";
import { connect } from "react-redux";
import { fetchSearchResults } from "./reducers/actions";
import Allpp from "./pages/AllPP";
// import withFormik from './pages/withFormik'
import Form from "./Login";
import SizeChart from "./pages/SizeChart";
// import { AirlineSeatIndividualSuiteSharp } from "@material-ui/icons";
const drawerWidth = 160;
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      backgroundColor: "#ffffff",
      // backgroundColor: "#faeadb",
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: drawerWidth,
    },
    title: {
      flexGrow: 1,
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      // backgroundColor: "brown",
      backgroundColor: "#8F4556",

    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "flex-start",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(0),
      paddingTop: theme.spacing(12),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeIn,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginRight: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    },
    logo: {
      // marginRight: theme.spacing(4),
      maxHeight: "80px",
      left: 'calc(50% - 311px)',
            position:'relative',
      [theme.breakpoints.up("sm")]: {
        maxHeight: "90px",
        right: '50px',
      },
    },
    sb: {
      [theme.breakpoints.up("lg")]: {
        width: "500px",
      },
    },
  })
);

const dftheme = createMuiTheme({
  palette: {},
  direction: "rtl",
});

function ResponsiveDrawer(props) {
  // const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  // const [query, setQuery] = useState("");
  const history = useHistory();
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const onFilteration = (query) => {
    props.onFilter(query);
    history.push(`/search`);
    console.log("done");
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  // const drawer = "";

  return (
    <Router>
      <div className={classes.root}>
        <ThemeProvider theme={dftheme}>
          <CssBaseline />
          <AppBar
            color="inherit"
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: open,
            })}
          >
            <Toolbar 
            disableGutters={true}
             className={classes.toolbar}>
              <Grid
                container
                direction="row"
                justify="center"
                alignItems="center"
                spacing={0}
              >
                <Grid item  container
                sm={12}
                 md={3} lg={4}>
                  {" "}
                   <span style={{ paddingTop: "10px",margin: 'auto',right: 0, position: 'fixed' }}>
                      <IconButton
                      style={{ margin: "2px" }}
                      color="inherit"
                      aria-label="open drawer"
                      edge="start"
                      onClick={handleDrawerOpen}
                      className={classes.menuButton}
                    >
                      <MenuIcon />
                    </IconButton>
                    </span>
                    <img
                      className={classes.logo}
                      src="https://i.imgur.com/C8Hhkwi.png"
                    />
                </Grid>
               
                  
                  <Grid wrap='nowrap' container item sm={8} md={9} lg={8}>
                  <Grid item sm={8} md={9} lg={8} xs={8}>

                    <Search style={{ margin: "auto" }}
                      setFiltered={(p) => {
                        props.setFiltered(p);
                      }}
                      products={props.products}
                    />
                    </Grid>
                  <Grid item container wrap='nowrap' sm={4} xs={4} md={3} lg={3}>
                      
                    <Link 
                     to="/cart">
                      {" "}
                      <IconButton aria-label="">
                        <CartBadge />
                      </IconButton>
                    </Link>
                    <span
                     >
                    <Link style={{ paddingTop: "10px" }} to="/login">
                      <IconButton>
                        <AccountCircleIcon style={{ fill: "#DD766F" }} />
                      </IconButton>
                    </Link></span>
                    </Grid> 
                     </Grid>
                     </Grid> 
            </Toolbar>
          </AppBar>
          <nav className={classes.drawer} aria-label="mailbox folders">
            <Drawer
              className={classes.drawer}
              variant="persistent"
              anchor="left"
              open={open}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <div className={classes.drawerHeader}>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === "ltr" ? (
                    <ChevronLeftIcon />
                  ) : (
                    <ChevronRightIcon />
                  )}
                </IconButton>
              </div>
              <Divider />
              <List>
                {/* {['Categories', 'Boys', 'Girls', 'Babys'].map((text, index) => ( */}
                <ListItem style={{ padding: 0 }} button>
                  {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
            <ListItemText primary={text} /> */}
                  <Link className="navlink" to="/">
                    الصفحة الرئيسية
                  </Link>
                </ListItem>
                <ListItem button style={{ padding: 0 }}>
                  {" "}
                  <Link className="navlink" to="/products">
                    المنتجات
                  </Link>{" "}
                </ListItem>
                <ListItem button style={{ padding: 0 }}>
                  {" "}
                  <Link className="navlink" to="/cart">
                    السلة
                  </Link>{" "}
                </ListItem>

                {/* ))} */}
              </List>
              <Divider />

              <List>
                <ListItem button style={{ padding: 0 }}>
                  <Link
                    className="navlink"
                    onClick={() => onFilteration("اولادي")}
                    to="/search/اولادي"
                  >
                    اولادي
                  </Link>
                </ListItem>
                <ListItem button style={{ padding: 0 }}>
                  <Link
                    className="navlink"
                    onClick={() => onFilteration("بناتي")}
                    to="/search/بناتي"
                  >
                    بناتي
                  </Link>
                </ListItem>
              </List>
              <Divider />
              <List>
                <ListItem button style={{ padding: 0 }}>
                  {" "}
                  <Link className="navlink" to="/cart">
                    مقاسات
                  </Link>{" "}
                </ListItem>{" "}
              </List>
            </Drawer>
          </nav>
          <main
            className={clsx(classes.content, {
              [classes.contentShift]: open,
            })}
          >
            <div className={classes.drawerHeader} />
            {/* <div className={classes.toolbar1} /> */}
            <Switch>
              <Route path="/products">
                {" "}
                {/* <PdCards products={props.products} /> */}
                <Allpp />
              </Route>
              {/* <Route prevent path="/products/:id">
              <Product products={props.products} pid={props.pid} />
            </Route> */}
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/cart">
                <Cart open={open} />{" "}
              </Route>
              <Route path="/search">
                <FilteredProducts />{" "}
              </Route>
              <Route path="/login">
                {/* {withFormik(Login)} */}
                <Form />
              </Route>
              
              <Route path="/orderConfirmation/address">
                    <Checkout />
                </Route>
                <Route path="/orderConfirmation/checkOut">
                <Home />
                </Route>
                <Route path="/orderConfirmation/review">
                <Home />
                </Route>
                <Route path="/size-chart">
                <SizeChart />
                </Route>
            </Switch>
          </main>
        </ThemeProvider>
      </div>
    </Router>
  );
}
const mapDispatchToProps = (dispatch) => {
  return {
    onFilter: (query) => {
      dispatch(fetchSearchResults(query));
    },
  };
};

export default connect(null, mapDispatchToProps)(ResponsiveDrawer);
//8be8cb-1f363d-bb0a21-1f7a8c-0a0908
