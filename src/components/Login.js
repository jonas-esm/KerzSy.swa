import React from "react";
// import { render } from 'react-dom';
import { Formik, ErrorMessage } from "formik";
import { formValidation ,formValidation2 } from "./pages/withFormik";
import TextField from "@material-ui/core/TextField";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { Container, Button, Divider } from "@material-ui/core";
import axios from "axios";
import {connect} from 'react-redux'
import {fetchSignUp, fetchLogin} from './reducers/actions';
// import './Assets/helper.css'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
    formLabelRoot: {    
      backgroundColor:'#fafafa',
      right:20
    },
  
    
  })
);
const Form = (Props) => {
  const classes = useStyles();
  return (
    <Container style={{ maxWidth: "800px", marginTop: 20 }}>
      {/* <Grid container  spacing={2} wrap='wrap'> */}
      <Formik
        initialValues={{
          username: "",
          email: "",
          PhoneNumber: "",
          password: "",
          address: "",
        }}
        onSubmit={(values, { setSubmitting }) => {
          // setTimeout(() => {
          //   alert(JSON.stringify(values, null, 2));
          //   setSubmitting(false);
          // }, 500);
         Props.Sign(values)
         setSubmitting(false);
          // const Url = "http://127.0.0.1:8000/user/signup";
          // axios
          //   .post(Url, values)
          //   .then((res) => {
          //     console.log(res);
          //     setSubmitting(false);
          //   })
          //   .catch((err) => {
          //     if (err) {
          //       console.error(err.response);
          //       alert(JSON.stringify(err.response));
          //     }
          //   });
        }}
        validate={formValidation.validateForm}
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
              <h2> للتسجيل لانول مرة يرجى ملئ الخانات التالية :</h2>
              <div>
                {" "}
                <TextField
                  htmlFor="email"
                  id="email"
                  placeholder="Enter your email"
            InputLabelProps={{classes:{root:classes.formLabelRoot}}}

                  type="text"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="البريد الالكتروني"
                  variant="outlined"
                />
                <ErrorMessage name="email" component="div" />
                <TextField
                  variant="outlined"
                  htmlFor="password"
                  id="password"
                  placeholder="Enter your password"
                  type="text"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="كلمة السر"
            InputLabelProps={{classes:{root:classes.formLabelRoot}}}

                />
                <ErrorMessage name="password" component="div" />
              </div>
              <div>
                {" "}
                <TextField
                  variant="outlined"
                  htmlFor="username"
                  id="username"
                  placeholder="Enter your username"
                  type="text"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="الاسم بالكامل"
            InputLabelProps={{classes:{root:classes.formLabelRoot}}}

                />{" "}
              </div>
              <div>
                <TextField
                  variant="outlined"
                  htmlFor="address"
                  id="address"
                  placeholder="Enter your address"
                  type="text"
                  value={values.address}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="العنوان بالكامل"
            InputLabelProps={{classes:{root:classes.formLabelRoot}}}

                />
              </div>
              <div>
                <TextField
                  variant="outlined"
                  htmlFor="PhoneNumber"
                  id="PhoneNumber"
                  placeholder="Enter your PhoneNumber"
                  type="text"
                  value={values.PhoneNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="رفم الموبايل"
            InputLabelProps={{classes:{root:classes.formLabelRoot}}}

                />

                {/* className={
                errors.email && touched.email
                  ? 'text-input error'
                  : 'text-input'  } */}

                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}
              </div>
              <div>
                <Button
                  type="button"
                  // className="outline"
                  onClick={handleReset}
                  disabled={!dirty || isSubmitting}
                >
                  Reset
                </Button>

                <Button type="submit" disabled={isSubmitting}>
                  ارسل
                </Button>
              </div>
            </form>
          );
        }}
      </Formik>
      {/* </Grid> */}
      <Divider />
      <h2>لتسجيل الدخول, ادخل البريد و كلمة المرور</h2>

      <Formik
        initialValues={{
          email: "",
          password:'',
        }}
        onSubmit={(values, { setSubmitting }) => {
          // setTimeout(() => {
          //   alert(JSON.stringify(values, null, 2));
          //   setSubmitting(false);
          // }, 500);
          console.log('request will be made',values)
          Props.login(values)
          // const Url = "http://127.0.0.1:8000/user/login";
          // axios
          //   .post(Url, values)
          //   .then((res) => {
          //     console.log(res);
          //     setSubmitting(false);
          //   })
          //   .catch((err) => {
          //     if (err) {
          //       console.error(err.response);
          //       alert(JSON.stringify(err.response));
          //     }
          //   });
        }}
        validate={formValidation2.validateForm}
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
              <TextField
                htmlFor="email"
                id="email"
                placeholder="Enter your email"
                type="text"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                label="البريد الالكتروني"
                variant="outlined"
              />
              <ErrorMessage name="email" component="div" />
              <TextField
                variant="outlined"
                htmlFor="password"
                id="password"
                placeholder="Enter your password"
                type="text"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                label="كلمة السر"
              />
               {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}
               <div>
                <Button
                  type="button"
                  // className="outline"
                  onClick={handleReset}
                  disabled={!dirty || isSubmitting}
                >
                  Reset
                </Button>

                <Button type="submit" disabled={isSubmitting}>
                  ارسل
                </Button>
              </div>
            </form>
          );
        }}
      </Formik>
    </Container>
  );
};
const mapDispatchToProps = (dispatch) => {return {
  Sign: (values) => dispatch(fetchSignUp(values)) ,
  login: (values) => dispatch(fetchLogin(values))
}}
export default connect (null, mapDispatchToProps) (Form);
