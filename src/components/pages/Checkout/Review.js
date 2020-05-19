import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { Alert, AlertTitle } from '@material-ui/lab';
import { connect } from "react-redux";
import axios from "axios";
import { Email, renderEmail, Item, A } from "react-html-email";
// const products = [
//   { name: 'Product 1', desc: 'A nice thing', price: '$9.99' },
//   { name: 'Product 2', desc: 'Another thing', price: '$3.45' },
//   { name: 'Product 3', desc: 'Something else', price: '$6.51' },
//   { name: 'Product 4', desc: 'Best thing of all', price: '$14.11' },
//   { name: 'Shipping', desc: '', price: 'Free' },
// ];

// const payments = [
//   { name: 'Card type', detail: 'Visa' },
//   { name: 'Card holder', detail: 'Mr John Smith' },
//   { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
//   { name: 'Expiry date', detail: '04/2024' },
// ];

const useStyles = makeStyles((theme) => ({
  listItem: {
    // padding: theme.spacing(1, 0),
  },
  total: {
    // fontWeight: 700,
  },
  title: {
    // marginTop: theme.spacing(2),
  },
  listlist: {
    textAlign: "center",
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));
// Don't forget to reset state
// function MyEmail({ name, children }) {
//   return (
//     <Email title='link'>
//       <Item>
//         Hello {name}
//         <A style={{ paddingLeft: 10 }} href='https://mailtrap.io'>Click me!</A>
//       </Item>
//       <Item>
//         {children}
//       </Item>
//     </Email>
//   )
// }

// function handleEmailSubmit(event) {

//   const messageHtml = renderEmail(<MyEmail name={this.state.name} />);

//   axios({
//     method: "POST",
//     url: "http://localhost:8000/send",
//     data: {
//       name: "this.state.name",
//       email: "this.state.email",
//       messageHtml: messageHtml
//     }
//   }).then((response) => {
//     if (response.data.msg === 'success') {
//       alert("Email sent, awesome!");
//       this.resetForm()
//     } else if (response.data.msg === 'fail') {
//       alert("Oops, something went wrong. Try again")
//     }
//   })
// }// HTML code
function Review(Props) {
  const classes = useStyles();
  const {
    fullName,
    phoneNum,
    address1,
    address2,
    city,
    state,
    country,
  } = Props.form;
  const addresses = [phoneNum, address1, address2, city, state, country];
  function MyEmail(props) {
    const {
      fullName,
      phoneNum,
      address1,
      address2,
      city,
      country,
      state,
    } = props.form;
    return (
      <Email title="link">
        <Item>
          {/* {JSON.stringify(props.form)} */}
         
            <div>
              <ul>
                <li>{fullName}</li>
                <li>{phoneNum}</li>
                <li>{address1}</li>
                <li>{address2}</li>
                <li>{city}</li>
                <li>{state}</li>
                <li>{country}</li>
              </ul>
            </div>
          
          {/* {JSON.stringify(props.order)} */}
          {props.order.map((item, i) => {
            if (item.quantity != 0) {
              return (
                <div key={i}>
                  {i % 2 == 0 ? (
                    <div
                      style={{
                        width: "70%",
                        height: "2px",
                        backgroundColor: "brown",
                      }}
                    ></div>
                  ) : (
                    <div
                      style={{
                        width: "70%",
                        height: "2px",
                        backgroundColor: "blue",
                      }}
                    ></div>
                  )}
                  <span style={{ margin: "10px" }}>
                    <img
                      src={item.products.imgUrl}
                      style={{ height: "100px" }}
                    />{" "}
                  </span>
                  <span style={{ margin: "10px" }}>
                    ID:{item.products.product_id}{" "}
                  </span>
                  <span style={{ margin: "10px" }}>
                    barcode: {item.products.barcode}
                  </span>
                  <span style={{ margin: "10px" }}>الكمية:{item.quantity}</span>
                  <span style={{ margin: "10px" }}>المقاس:{item.size}</span>
                  <span style={{ margin: "10px" }}>
                    سعر القطعة:{item.products.product_price}
                  </span>
                </div>
              );
            }
          })}

          <A style={{ paddingLeft: 10 }} href="https://mailtrap.io">
            Click me!
          </A>
        </Item>
        <Item> {
            <div>
              <h2>
                اجمالي الفاتورة: مصاريف شحن: 40 ج.م {"   "}
                اجمالي المنتجات:{"  "}
                {Props.cartItems.reduce(
                  (tol, item) =>
                    tol +
                    parseInt(item.quantity) *
                      parseInt(item.products.product_price),
                  0
                )}{" "}
                ج.م
              </h2>
            </div>}</Item>
      </Email>
    );
  }
  const [sending, setSending] = useState(false);

  function handleEmailSubmit(event) {
    const messageHtml = renderEmail(
      <MyEmail form={Props.form} order={Props.cartItems} />
    );
    setSending(true);
    axios({
      method: "POST",
      // url: "http://localhost:8000/send",
      url: "https://kerz-sy-api.herokuapp.com/send",

      data: {
        name: "this.state.name",
        email: "this.state.email",
        messageHtml: messageHtml,
      },
    })
      .then((response) => {
        if (response.data.msg === "success") {
          setSending(false);

          alert("تم ارسال طلبك!");
          Props.setStep(Props.step + 1);
          // this.resetForm()
        }
        // else if (response.data.msg === 'fail') {
        //   alert("يوجد مشكلة في الاتصال بالخادم , الرجاء المحاولة مرة اخرى")
        // }
      })
      .catch((err) => {
        setSending(false);
        console.error(err);
        alert("يوجد مشكلة في الاتصال بالخادم , الرجاء المحاولة مرة اخرى");
      });
  } // HTML code
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {Props.cartItems.map((product) => (
          <ListItem
            className={classes.listItem}
            key={product.products.product_name}
          >
            {/* <ListItemText primary={product.products.product_name} secondary="مقاس" />
            <Typography variant="body2">{product.products.product_price}</Typography> */}
            <img src={product.products.imgUrl} style={{ width: "50px" }} />
            <ListItemText
              classes={{ root: classes.listlist }}
              primary={product.products.product_price + "      جنيه للقطعة"}
              secondary={product.quantity + "       قطعة "}
            />
            <Typography variant="body1">
              {product.products.product_price * product.quantity}{" "}
            </Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            {40 +
              Props.cartItems.reduce(
                (tol, item) =>
                  tol +
                  parseInt(item.quantity) *
                    parseInt(item.products.product_price),
                0
              )}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            معلومات التسليم
          </Typography>
          <Typography gutterBottom>{fullName}</Typography>
          <Typography gutterBottom>{addresses.join(", ")}</Typography>
        </Grid>

        {/* <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          {/* <Grid container>
            {payments.map((payment) => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid> */}
      </Grid>
      {sending ===true ? 
      <Alert severity="success">
  <AlertTitle>جاري التاكيد</AlertTitle>
  يرجى الانتظار <strong>يتم الان ارسال طلبك</strong>
</Alert> : ' ' }
      <Grid className={classes.buttons} item xs={12} sm={12}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleEmailSubmit}
        >
          {" "}
          تاكيد الطلب{" "}
        </Button>

      </Grid>
    </React.Fragment>
  );
}
const mapStateToProps = (state) => {
  return {
    cartItems: state.cartReducers.cart,
    form: state.OrderReducer.addressForm,
  };
};
export default connect(mapStateToProps)(Review);
