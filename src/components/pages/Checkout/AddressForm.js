import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { makeStyles } from "@material-ui/core/styles";
import { Formik, ErrorMessage } from "formik";
import { Button,MenuItem } from "@material-ui/core";
import { connect } from "react-redux";
import {placeOrder} from '../../reducers/actions'
const useStyles = makeStyles((theme) => ({
  formLabelRoot: {
    backgroundColor: "#fefefe",
    right: 20,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    
  },
}));
const egyptianStates = ['القاهرة',
'الجيزة',
'الزقازيق',
'المنصورة',
'دمنهور',
'بنها',
'المنيا',
'الإسكندرية',
'طنطا',
'سوهاج',
'أسيوط',
' شبين الكوم',
'قنا',
' كفر الشيخ',
'الفيوم',
' بني سويف',
' أسوان',
'دمياط',
'الإسماعيلية',
'بورسعيد',
'السويس',
'الأقصر',
'العريش',
' مرسى مطروح',
'الغردقة',
'الخارجة',
'الطور',
]
function AddressForm(Props) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        عنوان التوصيل
      </Typography>
      <Formik
        initialValues={{
          fullName: "",
          phoneNum: "",
          address1: "",
          address2: "",
          city: "",
          state: 'القاهرة',
          zip: "",
          country: "مصر",
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            Props.submitAddressForm(values);
            Props.setStep(Props.step + 1)
            // alert(JSON.stringify(values, null, 2));
            
          }, 500);
          setSubmitting(false);
        }}
        // validate={formValidation.validateForm}
      >
        {(props) => {
          const {
            values,
            touched,
            errors,
            dirty,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset,
          } = props;
          return (
            <form className={classes.root} onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="fullName"
                    name="fullName"
                    label="الاسم الثلاثي"
                    InputLabelProps={{
                      classes: { root: classes.formLabelRoot },
                    }}
                    fullWidth
                    value={values.fullName}
                    autoComplete="fname"
                    
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="tel"
                    required
                    id="phoneNum"
                    name="phoneNum"
                    label="رقم التلفون"
                    fullWidth
                    value={values.phoneNum}
                    autoComplete="phoneNum"
                    // pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    id="address1"
                    name="address1"
                    label=" الحي - اسم الشارع - علامة مميزة"
                    InputLabelProps={{
                      classes: { root: classes.formLabelRoot },
                    }}
                    fullWidth
                    value={values.address1}
                    autoComplete="billing address-line1"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="address2"
                    name="address2"
                    label="رقم العمارة - الدور - رقم الشقة"
                    // InputLabelProps={{color:'secondary'}}
                    InputLabelProps={{
                      classes: { root: classes.formLabelRoot },
                    }}
                    fullWidth
                    value={values.address2}
                    autoComplete="billing address-line2"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    id="city"
                    name="city"
                    label="المنطقة"
                    InputLabelProps={{
                      classes: { root: classes.formLabelRoot },
                    }}
                    fullWidth
                    value={values.city}
                    autoComplete="billing address-level2"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="state"
                    name="state"
                    label="المحافظة"
                    select
                    value={values.state}
                    InputLabelProps={{
                      classes: { root: classes.formLabelRoot },
                    }}
                    fullWidth
                  >
                    {egyptianStates.map((option , i) => (
            <MenuItem key={i} value={option}>
              {option}
            </MenuItem>))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    onChange={handleChange}
                    onBlur={handleBlur}
                    id="zip"
                    name="zip"
                    value={values.zip}
                    label="الرمز البريدي (اختياري)"
                    InputLabelProps={{
                      classes: { root: classes.formLabelRoot },
                    }}
                    fullWidth
                    autoComplete="billing postal-code"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    id="country"
                    value={values.country}
                    name="country"
                    label="الدولة"
                    InputLabelProps={{
                      classes: { root: classes.formLabelRoot },
                    }}
                    
                    fullWidth
                    autoComplete="billing country"
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="secondary"
                        name="saveAddress"
                        value="yes"
                      />
                    }
                    label="Use this address for payment details"
                  />
                </Grid>
                <Grid className={classes.buttons} item xs={12} sm={12}>
                  <Button type="submit"
                  variant="contained"
                  color='primary'
                  className={classes.button}>حفظ العنوان</Button>
                </Grid>
              </Grid>
            </form>
          );
        }}
      </Formik>
    </React.Fragment>
  );
}
const mapDispatchToProps = (dispatch) => { return {
  submitAddressForm :(addressForm) =>  dispatch(placeOrder(addressForm))
}}
export default connect(null, mapDispatchToProps)(AddressForm);
//theme.palette.background.paper,
// const validate = values => {
//   const errors = {}
//   const requiredFields = [ 'firstName', 'lastName', 'email', 'favoriteColor', 'notes' ]
//   requiredFields.forEach(field => {
//     if (!values[ field ]) {
//       errors[ field ] = 'Required'
//     }
//   })
//   if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
//     errors.email = 'Invalid email address'
//   }
//   return errors
// }