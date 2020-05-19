import { ADD_TO_CART, REMOVE_FROM_CART, SELECT_SUBREDDIT } from "./types";
// import fetch from "cross-fetch";
import axios from "axios";
import {
  SELECT_Product,
  REQUEST_POSTS,
  INVALIDATE_SUBREDDIT,
  RECEIVE_POSTS,
  REQUEST_SEARCH_RESULT,
  RECIVED_SEARCH_RESULT,
} from "./types";

export const addToCart = (productInfo, quantity , size) => {
  return {
    type: ADD_TO_CART,
    productInfo,
    quantity,
    size
  };
};
export const rmFromCart = (index) => {
  return {
    type: REMOVE_FROM_CART,
    index: index,
  };
};

export function selectProduct(slctedProda) {
  return {
    type: SELECT_Product,
    slctedProda,
  };
}
// function requestPosts(products, query) {
//   return {
//     type: REQUEST_POSTS,
//     products,
//     query,
//   };
// }

export function selectSubreddit(subreddit) {
  return {
    type: SELECT_SUBREDDIT,
    subreddit,
  };
}

export function invalidateSubreddit(products) {
  return {
    type: INVALIDATE_SUBREDDIT,
    products,
  };
}

// function receivePosts(products, json) {
//   return {
//     type: RECEIVE_POSTS,
//     products,
//     posts: json,
//     receivedAt: Date.now(),
//   };
// }
function requestSearch(query) {
  return {
    type: REQUEST_SEARCH_RESULT,
    query,
  };
}
function recivedSearchResults(products, message) {
  return {
    type: RECIVED_SEARCH_RESULT,
    products: products,
    message: message,
    receivedAt: Date.now(),
  };
}

export function fetchSearchResults(query) {
  return function (dispatch) {
    console.log("req will be made");
    dispatch(requestSearch(query));
    const searchUrl2 = `https://127.0.0.1:8000/search/`;
    const searchUrl = `https://kerz-sy-api.herokuapp.com/search/`;

    axios
      .post(searchUrl, query, { params: { query } })
      .then((res) => {
        console.log("req done");
        const resultNotFoundMsg = !res.data.length
          ? "There are no more search results. Please try a new search."
          : "";
        dispatch(recivedSearchResults(res.data, resultNotFoundMsg));
      })
      .catch((error) => {
        if (error) {
          let noProd = { data: [] };
          const message = "Failed to fetch results.Please check network";
          dispatch(recivedSearchResults(noProd, message));
        }
      });
  };
}

export const REQUEST_SIGN_UP = "REQUEST_SIGN_UP";
function requestSignUp(values) {
  return { type: REQUEST_SIGN_UP, values };
}
export const SING_UP_FAILURE = "SING_UP_FAILURE";
// const { name, email, phone, password, address } = vreq;
function signUpFailure(payload) {
  return { type: SING_UP_FAILURE, payload };
}
export const SIGNUP_RESPONSE = 'SIGNUP_RESPONSE'
function responseSignUp (payload) {
  return{
    type:SIGNUP_RESPONSE,
    payload
  }
}
export const REQUEST_LOGIN = "REQUEST_LOGIN";
function requestLogin(values) {
  return { type: REQUEST_LOGIN, values };
}
export const LOGIN_FAILURE = "LOGIN_FAILURE";
// const { name, email, phone, password, address } = vreq;
function loginFailure(payload) {
  return { type: LOGIN_FAILURE, payload };
}
export const LOGIN_RESPONSE = 'LOGIN_RESPONSE'
function responseLogin (payload) {
  return{
    type:LOGIN_RESPONSE,
    payload
  }
}

export function fetchSignUp(values) {
return function(dispatch) {
  dispatch(requestSignUp(values))
  const Url = "https://127.0.0.1:8000/user/signup";
  axios
    .post(Url, values)
    .then((res) => {
      console.log(res);
      // setSubmitting(false);
      dispatch(responseSignUp(res.data))
      alert("لقد تم التسجيل بنجاح")
      sessionStorage.setItem("jwtToken", res.data.token);
    })
    .catch((err) => {
      if (err) {
        dispatch(signUpFailure(err))
        console.error(err.response);
        alert("خطا في التسجيل")
        // alert(JSON.stringify(err.response));
      }
    });

}}
export function fetchLogin(values) {
  return function(dispatch) {
    dispatch(requestLogin(values))
    const Url = "https://127.0.0.1:8000/user/login";
    axios
      .post(Url, values)
      .then((res) => {
        console.log(res.data.token);
        // setSubmitting(false);
        dispatch(responseLogin(res.data))
        alert("لقد تم التسجيل بنجاح")
        sessionStorage.setItem("jwtToken", res.data.token);
      })
      .catch((err) => {
        if (err) {
          dispatch(loginFailure(err))
          console.error(err.response);
          alert("خطا في التسجيل")
          // alert(JSON.stringify(err.response));
        }
      });
  
  }}
  export const PLACE_ORDER = 'PLACE_ORDER'
  export function placeOrder(addressForm){
    return {
      type:PLACE_ORDER,
      addressForm
    }
  }
  // const mapDispatchToProps = (dispatch) => {
  //   return {
  //   loadUserFromToken: () => {
  //   let token = sessionStorage.getItem(‘jwtToken’);
  //   if(!token || token === ‘’) {//if there is no token, dont bother
  //   return;
  //   }
  //   //fetch user from token (if server deems it’s valid token)
  //   dispatch(meFromToken(token))
  //   .then((response) => {
  //   if (!response.error) {
  //   //store token 
  //   sessionStorage.setItem(‘jwtToken’, response.payload.data.token);
  //   dispatch(meFromTokenSuccess(response.payload))
  //   } else {
  //   //remove token from storage
  //   sessionStorage.removeItem(‘jwtToken’);
  //   dispatch(meFromTokenFailure(response.payload));
  //   }
  //   });
  //   },
  //   resetMe: () =>{ // logout
  //   sessionStorage.removeItem(‘jwtToken’); //remove token from storage
  //   dispatch(resetToken());
  //   }
  //   }
  //  }


// dispatch(signUpUser(values))
//  .then((response) => {
//  let data = response.payload.data;
//  //if any one of these exist, then there is a field error 
//  if(response.payload.status != 200) {
//  //let other components know
//  dispatch(signUpUserFailure(response.payload));
//  reject(data); //this is for redux-form itself
//  } else {
//  //store JWT Token to browser session storage 
//  //If you use localStorage instead of sessionStorage, then this w/ 
//  //persisted across tabs and new windows.
//  //sessionStorage = persisted only in current tab
 
//  sessionStorage.setItem(‘jwtToken’, response.payload.data.token);
 
//  //let other components know that we got user and things are fine
//  dispatch(signUpUserSuccess(response.payload)); 
//  resolve();//this is for redux-form itself
//  }
// });

// return fetch(`http://localhost:8000/products`)
//     .then(
//       (response) => response.json(),
//    (error) => console.log("An error occurred.", error)

//     )
//     .then((json) =>{ if (json) {
//         dispatch(receivePosts(products, json))}}
//     );

/////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////
// export function fetchSearchResults (products) {
//   return function (dispatch) {
//     dispatch(requestPosts(products));
//   return fetch(`http://localhost:8000/products`)
//       .then(
//         (response) => response.json(),
//      (error) => console.log("An error occurred.", error)
//       )
//       .then((json) =>
//           dispatch(receivePosts(products, json))
//       );
//   };
// }
/////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////
// export const UPDATE_PAGE_NO = "UPDATE_PAGE_NO"

// Though its insides are different, you would use it just like any other action creator:
// store.dispatch(fetchPosts('reactjs'))

// export function fetchPosts(products) {
//   // Thunk middleware knows how to handle functions.
//   // It passes the dispatch method as an argument to the function,
//   // thus making it able to dispatch actions itself.

//   return function (dispatch) {
//     // First dispatch: the app state is updated to inform
//     // that the API call is starting.

//     dispatch(requestPosts(subreddit));

//     // The function called by the thunk middleware can return a value,
//     // that is passed on as the return value of the dispatch method.

//     // In this case, we return a promise to wait for.
//     // This is not required by thunk middleware, but it is convenient for us.

//     return fetch(`http://localhost:8000/products`)
//       .then(
//         (response) => response.json(),
//         // Do not use catch, because that will also catch
//         // any errors in the dispatch and resulting render,
//         // causing a loop of 'Unexpected batch number' errors.
//         // https://github.com/facebook/react/issues/6895
//         (error) => console.log("An error occurred.", error)
//       )
//       .then((json) =>
//         // We can dispatch many times!
//         // Here, we update the app state with the results of the API call.

//         dispatch(receivePosts(subreddit, json))
