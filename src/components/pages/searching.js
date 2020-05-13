import React,{useState, useEffect} from "react";
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import PdCards from './products'
// import {rmFromCart, fetchSearchResults} from '../reducers/actions'
// const useStyles = makeStyles({
//   table: {
//     maxWidth: 800,
//   },
//   but: {
//    width: '80%',
//    marginRight: '10%'
//   }
// });

function FilteredProducts(Props) {
//  const [products,setProducts] = useState([])
//  console.log(Props.filtered)
//  setTimeout(() => {
//    setProducts(Props.filtered)
//    console.log(products)
//  }, 3000);
useEffect(() => {
console.log('monted')
  
  
}, [Props.isLoading])
  // const classes = useStyles();
  if (Props.isLoading ){return <div>No search Result</div>}
  else {return (
    <div>

      <PdCards products={Props.filtered} />


    </div>
    
  );}
}
const mapStateToProps = state => {
  return {
    cartItems: state.cartReducers.cart,
    total: state.cartReducers.cart.reduce(
      (tol, item) => tol + (parseInt(item.quantity) * parseInt(item.products.product_price)) ,0
      ),
      filtered : state.SearchRes.products.data,
      searchKey : state.SearchRes.query,
      isLoading : state.SearchRes.loading,
  };
};


export default connect(mapStateToProps)(FilteredProducts);
