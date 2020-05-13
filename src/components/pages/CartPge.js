import React from "react";
import { connect } from "react-redux";
import { makeStyles,createStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete'
import{Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,Box,
  Paper,Button, IconButton}  from '@material-ui/core'
import clsx from 'clsx'
import {rmFromCart} from '../reducers/actions'
import {Link} from 'react-router-dom'
const useStyles = makeStyles((theme: THeme) => createStyles({
  table: {
    maxWidth: 800,
  },
  but: {
   width: '50%',right:'25%'
  
  },
  hide:{
    [theme.breakpoints.down('sm')] : { display:'none',
  }}}))


function Cart(Props) {
  const ttl = (res) => {
      
  }
  console.log(Props.cartItems[1])
  const classes = useStyles();

  return (
    <Box>
      <Table className={clsx(classes.table,{
      [classes.hide]:Props.open})  
    } aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>الصنف</TableCell>
            <TableCell size="small" align="right">السعر</TableCell>
            <TableCell size="small" align="right">الكمية</TableCell>
            
            <TableCell size="small" align="right">Total</TableCell>
            <TableCell  size="small"align="right">الغاء</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {Props.cartItems.map((row , index) => {if (row.quantity != 0) {
              return( <TableRow key={row.name}>
                <TableCell size="small" component="th" scope="row"><img style={{height:'100px'}} src={row.products.imgUrl} /></TableCell>
                <TableCell align="right">{row.products.product_price}</TableCell>
                <TableCell align="right">{row.quantity}</TableCell>
                <TableCell align="right">{row.quantity * row.products.product_price}</TableCell>
                <TableCell align="right"><IconButton  aria-label="Delete" onClick={() => Props.rmFromCart(index)}>
                  <DeleteIcon />
                </IconButton></TableCell>

              </TableRow>)
}})}
                <TableRow> 
                     <TableCell colSpan={2}>Total</TableCell>
<TableCell align="right">{Props.total}</TableCell>
                    {/* {Props.cartItems.reduce((total, item)=> parseInt(total) + parseInt(item.quantity) * parseInt(item.products.product_price),0)} */}
                </TableRow>
                 </TableBody>

      </Table>
          <Link to='/orderConfirmation/address'><Button variant="outlined" color="secondary" className={classes.but} >
        المتابعة لتأكيد طلب الشراء
      </Button></Link>

    </Box>
    
  );
 
}
const mapStateToProps = state => {
  return {
    cartItems: state.cartReducers.cart,
    total: state.cartReducers.cart.reduce(
      (tol, item) => tol + (parseInt(item.quantity) * parseInt(item.products.product_price)) ,0
      )
  };
};
const mapDispatchToProps = dispatch => {
  return {
    rmFromCart: (index) =>
      dispatch(rmFromCart(index))
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
