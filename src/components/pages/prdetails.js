import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Assets/loading";

import {
  Button,
  Box,
  Input,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Grid,
  Paper,
  TextField,
  
  // Card,
  // CardActionArea,
  // CardMedia,
} from "@material-ui/core";
import {makeStyles,
  createStyles} from '@material-ui/core/styles'
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addToCart, selectProduct } from "../reducers/actions";
// import {UndoRounded} from '@material-ui/icons';
const useStyles = makeStyles((theme) => ({
  formLabelRoot: {
    
  },
  MuiInputLabel: {
    
  }}))

function Product(Props) {
  const [selectedProduct, setSelectedProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [getColors, setColors] = useState([]);
  const [size, setSize] = useState("");
  const urlparam = useParams();
  const { products } = Props;
  const seconds = 500;
  const handleSize = (e) => {
    setSize(e.target.value);
  };
  // const selectedProduct = Props.products.find(
  //   (obj) => obj.product_id === urlparam.id
  // );

  useEffect(() => {
    setTimeout(() => {
      // if (!Props.products == undefined){
      const found = products.find((item) => item.product_id == urlparam.id);
      setSelectedProduct(found);
      const barcodes = products.filter(
        (item) =>
          item.barcode == selectedProduct.barcode && item.barcode != null
      );
      // console.log(urlparam.id,found,selectedProduct ,barcodes )

      setTimeout(() => {
        setColors(barcodes);
        // setColors(
        //   products.find(obj => obj.barcode == selectedProduct.barcode )
        // );

        setLoading(false);
      }, seconds + 500);
      // }
    }, seconds);
  }, [selectedProduct]);
  const handleQuantity = (e) => {
    setQuantity(e.target.value);
  };
  const classes = useStyles()

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  } else {
    let sizeArr = selectedProduct.sizes.split(",");
    return (
      <Grid container> <Grid item xs={12}>
        <h2 style={{ margin: "auto", textAlign: "center" }}>
          {selectedProduct.product_name}
        </h2></Grid>

        <Grid container item xs={12}>
          <Grid  container item xs={12} lg={6}>
        {/* <Grid container item xs={6}> */}
          <Grid item xs={7}>
            
            <img
              style={{ maxWidth:'100%', display: "inline" }}
              src={selectedProduct.imgUrl}
            />
          </Grid>
          <Grid item xs={5} >
          
              <Box display="flex inline"  flexDirection='column'>
              {getColors.map((item) => (
                <Link
                  key={item.product_id}
                  to={"/products/pid=" + item.product_id}
                  style={{ textDecoration: "none", color: "default" ,display: "inlineBlock"}}
                  onClick={() => setSelectedProduct(item)}
                >
                  <img src={item.imgUrl} style={{ maxHeight: 100 }} />
                </Link>
              ))}
            </Box>
            </Grid>
          {/* </Grid> */}
          </Grid>
          {/* <Box p={2} style={{ flexGrow: 1 }}> */}
          <Grid item xs={12} lg={6} >
          <Box display="flex"  flexDirection='column' style={{textAlign:'center'}} justifyItems='center' m={1} p={1}>

            <Typography p={2} align="center" variant="h5" color="secondary">
              {selectedProduct.product_price}.EGP
            </Typography>
            <div>
              {/* <FormControl variant="outlined" style={{maxWidth:'200px',width:'100%', margin: "auto" }}>
                <InputLabel id="demo-simple-select-outlined-label">
                  الكمية
                </InputLabel>
                <Select
                  value={quantity}
                  onChange={handleQuantity}>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                  <MenuItem value={7}>7</MenuItem>
                </Select>
              </FormControl> */}
               <TextField
               style={{maxWidth:'200px',width:'100%', margin: "20px", }}
          name={`makeq-${selectedProduct.product_id}`}
          id={`makeq-${selectedProduct.product_id}`}
          value={quantity}
          onChange={handleQuantity}
          select
          label="الكمية"
          variant='standard'
        
        > <MenuItem value={1}>1</MenuItem>
        <MenuItem value={2}>2</MenuItem>
        <MenuItem value={3}>3</MenuItem>
        <MenuItem value={4}>4</MenuItem>
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={6}>6</MenuItem>
        <MenuItem value={7}>7</MenuItem></TextField>
            </div>
            <div>
          
              <TextField
              style={{maxWidth:'200px',width:'100%', margin: "20px" }}
          name={`make-${selectedProduct.product_id}`}
          id={`make-${selectedProduct.product_id}`}
          onChange={handleSize}
          value={size}
          InputLabelProps={{
            classes: { root: classes.formLabelRoot },
          }}

          select
          label="المقاس"
          helperText="يرجى ادخال المقاس"
          variant='standard'

        >
          {sizeArr.map((size) => {
                    return <MenuItem key={size} value={size}>{`${size}  سنوات`}</MenuItem>;
                  })}
        </TextField>

            </div>
            <Link to="/size-chart" style={{decoration:'none',}}>
              <Button color='primary'>
              دليل المقاسات
              </Button></Link>

            <Button
              variant="contained"
              onClick={() => Props.addToCart(selectedProduct, quantity, size)}
              color="primary"
              size="large"
              style={{ margin: "auto" }}
            >
              اضافة الى السلة
            </Button>
            <h4>
              اجمالي المبلغ ={"  "} {quantity * selectedProduct.product_price}
            </h4>
            </Box>
          </Grid>
          </Grid>
          </Grid>
          
    );
  }
}
const mapStateToProps = (state) => {
  return {
   
    product: state.slctedProd,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (productsInfo, quantity, size) =>
      dispatch(addToCart(productsInfo, quantity, size)),
    selectProduct: (slctedProda) => dispatch(selectProduct(slctedProda)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Product);
