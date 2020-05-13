import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from '../Assets/loading'

import {
  Button,
  Box,
  Input,
  Typography,
  // Card,
  // CardActionArea,
  // CardMedia,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addToCart, selectProduct } from "../reducers/actions";
// import {UndoRounded} from '@material-ui/icons';
function Product(Props) {
  const [selectedProduct, setSelectedProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [getColors, setColors] = useState([]);
  const urlparam = useParams();
  const {products} =Props
  const seconds = 500

  // const selectedProduct = Props.products.find(
  //   (obj) => obj.product_id === urlparam.id
  // );

  useEffect(() => {
    setTimeout(() => {
      // if (!Props.products == undefined){
        const found = products.find(item => item.product_id == urlparam.id)
      setSelectedProduct(found);
      const barcodes = products.filter(item => item.barcode == selectedProduct.barcode &&item.barcode != null )
      // console.log(urlparam.id,found,selectedProduct ,barcodes )
      
      setTimeout(() => {
        setColors(
          barcodes)
      // setColors(
      //   products.find(obj => obj.barcode == selectedProduct.barcode )
      // );


      setLoading(false);}, seconds+500); 
    // }
    }, seconds);
  },[selectedProduct] );
  const handleQuantity = (e) => {
    setQuantity(e.target.value);
  };

  if (loading) {
   return <div> <Loading/></div>
  
  } else {
    return (
      <div>
        <h2 style={{ margin: "auto", textAlign: "center" }}>
          {selectedProduct.product_name}
        </h2>

        <Box flexWrap="wrap" display="flex" justifyContent="space-around">
          <Box>
            {" "}
            <img
              style={{ maxHeight: 400, display: "block" }}
              src={selectedProduct.imgUrl}
            />{" "}
            <Box
              flexWrap="wrap"
              display="flex"
              m={3}
              justifyContent="space-around"
            >
              
                {/* //  <img src={item.imgUrl} style={{maxHeight:100}} />) */}
               
                {/* {Props.products.filter((obj)=> obj.barcode == Props.product.barcode).map(item => { */}
                  {getColors.map((item) => (
                 <Link
                  key={item.product_id}
                  to={"/products/pid=" + item.product_id}
                  style={{ textDecoration: "none", color: "default" }}
                  onClick={() => setSelectedProduct(item)}
                >
                  <img src={item.imgUrl} style={{ maxHeight: 100 }} />
                </Link>
              ))}
            </Box>
          </Box>
          <Box p={2} style={{ flexGrow: 1 }}>
            {" "}
            <Typography p={2} align='center' variant="h5" color='secondary'>
           {selectedProduct.product_price}.EGP
            </Typography>
            <div>
              {" "}
              <Input 
                type="number"
                value={quantity}
                onChange={handleQuantity}
              />{" "}
              {"   "}
              <Button
                variant="outlined"
                onClick={() => Props.addToCart(selectedProduct, quantity)}
                color="primary"
                size="small"
              >
                اضافة الى السلة
              </Button>{" "}
            </div>
            <h2 >
              اجمالي المبلغ ={"  "} {quantity * selectedProduct.product_price}
            </h2>
          </Box>
        </Box>
        {/* </div> */}
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    // reduxQuantity: state.cartReducers.cart.reduce(
    //   (tol, item) => tol + (parseInt(item.quantity) * parseInt(item.products.product_price)) ,0
    //   ),
    // reduxQuantity: state.cartReducers.cart.reduce(
    //   (total, item) => total + item.quantity,
    //   0
    // ),
    product: state.slctedProd,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (productsInfo, quantity) =>
      dispatch(addToCart(productsInfo, quantity)),
    selectProduct: (slctedProda) => dispatch(selectProduct(slctedProda)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Product);
