import React, { useState , useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import {
  Card,
  Button,
  // Paper,
  CardActions,
  Grid,
  CardActionArea,
  CardMedia,
  Typography,
  CardContent,
  // Container,
  Zoom
} from "@material-ui/core";
import "./animateClasses.css";
import { addToCart , selectProduct} from "../reducers/actions";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
// import { slctedProd } from "../reducers/reducers";
import Loading from '../Assets/loading'
import Paginationc from "../Pagination";
  
  const useStyles = makeStyles({
    root1: {
      backgroundColor: "RGB(255,255,255,0.5)"
    },
    root: {
      maxWidth: 183
    },
    media: {height: 250,display:'flex',justifyContent:'center'},
    img: {
      height: 250
    },
    font:{fontFamily:"Tajawal"}
  });
  const PdCards = Props => {

const [pdProducts , setPdProducts] = useState([])
// const [page, setPage] = useState(1)
const [currentPage , setCurrentPage] = useState(1)
const itemsPerPage = 17
const lastItemIndex = currentPage * itemsPerPage
const firstItemIndex = lastItemIndex - itemsPerPage
const currentItems = pdProducts.slice(firstItemIndex, lastItemIndex)
const pagesnumber = Math.ceil(pdProducts.length/itemsPerPage)
console.log(currentPage, itemsPerPage , lastItemIndex , firstItemIndex , currentItems)
const handlePagination = (e,v) => {
  setCurrentPage(v)
}

// //////////////////////
// Use Effect 
// //////////
useEffect(() => {
   setTimeout(() => {
     console.log("pdCard mounted")
    setPdProducts([...Props.products])
   }, 1000); 
  
}, [])  


const classes = useStyles();
  if (pdProducts.length > 1) {
  return (<Box m="1">
    <Grid container style={{}} spacing={1} wrap='wrap'>
      {currentItems.map((item ,index) => {
        return ( <Zoom key={index} timeout={800} in >
          <Grid className={classes.root} key={item.product_id} item xs={6} sm={6} md={4} lg={4} xl={3}>
            <Card className={classes.card}>
              {" "}
              <Link
                to={"/products/pid=" + item.product_id}
                style={{ textDecoration: "none", color: "default" }}
                onClick={() => Props.selectProduct(item)}
              >
                <CardActionArea
                  onClick={() => {
                    return <Link to={"/hello"}></Link>;
                  }}
                >
                  <CardMedia className={classes.media}>
                    <img src={item.imgUrl} className={classes.img} />
                  </CardMedia>
                  <CardContent>
                    <Typography noWrap className={classes.font}>
                      {item.product_name}
                    </Typography>
                    <Typography
                      variant="body1"
                      color="textSecondary"
                      component="p"
                    >
                      price: {item.product_price}$
                      
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Link>
              <CardActions>
                <Button variant="outlined" style={{marginLeft:4 }} size="small" color="primary">
                  Share
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  size="small"
                  onClick={() => Props.addToCart(item, "1")}
                >
                 شراء
                </Button>
              </CardActions>
            </Card>
          </Grid>
          </Zoom>
        );
      })}
    </Grid>
    
    <Paginationc count={pagesnumber} handleChange={handlePagination} page='' /> 
    </Box>
  );}
  else {return <div> <Loading/></div>}
};

const mapDispatchToProps = dispatch => {
  return {
    addToCart: (productInfo, quantity) =>
      dispatch(addToCart(productInfo, quantity)),
      selectProduct : (slctedProda) => 
        dispatch(selectProduct(slctedProda)) 
      

    
    };
};
export default connect(null, mapDispatchToProps)(PdCards);
