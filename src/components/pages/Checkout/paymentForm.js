import React from 'react';
import Typography from '@material-ui/core/Typography';
// import Grid from '@material-ui/core/Grid';
// import TextField from '@material-ui/core/TextField';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';
// import Menu from '@material-ui/core/Menu'
// import MenuItem from '@material-ui/core/MenuItem'
import {makeStyles, createStyles, } from '@material-ui/core/styles'
import { List, ListItem, ListItemAvatar,Button, Avatar, ListItemText, Divider } from '@material-ui/core';
import {connect} from 'react-redux'
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: '70ch',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
    buttons: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    button: {
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1),
    },
  }),
);
function PaymentForm(Props) {
  console.log(Props.shipment , Props.products)
  const handleNext = () => {
    Props.setStep(2)

  }
  const classes = useStyles()
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        مراجعة الطلب
      </Typography>
      {/* <Typography variant="h6" gutterBottom>
       اجمالي السلة
      </Typography> */}
      <List className={classes.root}>
      <ListItem 
      style={{textAlign:'right'}}
      alignItems="flex-start"
      >
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText 
          primary="اجمالي السلة"
          secondary={
            <React.Fragment>
            {Props.cartTotal} جنيه مصري
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem 
      style={{textAlign:'right'}}
      alignItems="flex-start"
      >
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText 
          primary="تكلفة الشحن"
          secondary={
            <React.Fragment>
            40 جنيه مصري
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem 
      style={{textAlign:'right'}}
      alignItems="flex-start"
      >
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText 
          primary="صافي الفاتورة"
          secondary={
            <React.Fragment>
            {Props.cartTotal + 40} جنيه مصري
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      
      {/* <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <Avatar alt="Travis Howard" src="/static/images/avatar/2.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Summer BBQ"
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                to Scott, Alex, Jennifer
              </Typography>
              {" — Wish I could come, but I'm out of town this…"}
            </React.Fragment>
          }
        />*/}
    </List>
   
    </React.Fragment>
  );
}
const mapStateToProps = (state) => { return{
  products: state.cartReducers.cart,
  shipment: state.OrderReducer.addressForm,
  cartTotal: state.cartReducers.cart.reduce(
    (tol, item) => tol + (parseInt(item.quantity) * parseInt(item.products.product_price)) ,0
    ),
    
}}

export default connect (mapStateToProps)(PaymentForm)

{/* <Grid container spacing={3}>
<Grid item xs={12} md={6}>
  <TextField required id="cardName" label="Name on card" fullWidth />
</Grid>
<Grid item xs={12} md={6}>
  <TextField required id="cardNumber" label="Card number" fullWidth />
</Grid>
<Grid item xs={12} md={6}>
  <TextField required id="expDate" label="Expiry date" fullWidth />
</Grid>
<Grid item xs={12} md={6}>
  <TextField
    required
    id="cvv"
    label="CVV"
    helperText="Last three digits on signature strip"
    fullWidth
  />
</Grid>
<Grid item xs={12}>
  <FormControlLabel
    control={<Checkbox color="secondary" name="saveCard" value="yes" />}
    label="Remember credit card details for next time"
  />
</Grid>
</Grid> */}