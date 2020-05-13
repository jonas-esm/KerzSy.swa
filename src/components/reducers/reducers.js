import { ADD_TO_CART } from "./types";
// import { combineReducers } from "redux";
import { GET_PRODUCTS, REMOVE_FROM_CART, SELECT_SUBREDDIT } from "./types";
import {RECIVED_SEARCH_RESULT,REQUEST_SEARCH_RESULT, INVALIDATE_SUBREDDIT, REQUEST_POSTS, RECEIVE_POSTS,SELECT_Product } from "./types";
import {REQUEST_SIGN_UP,SING_UP_FAILURE,SIGNUP_RESPONSE, REQUEST_LOGIN, LOGIN_FAILURE, LOGIN_RESPONSE, PLACE_ORDER} from './actions'
export default function theDefaultReducer(state = {}, action) {
  return state;
}

export function cartReducers(
  state = {
    cart: [
      {
        products: {
          categori: "",
          imgUrl:
            "",
          product_id: "",
          product_name: "",
          product_price: 0,
        },

        quantity: 0,
      },
    ],
  },
  action
) {
  switch (action.type) {
    case ADD_TO_CART: {
      return {
        cart: [
          ...state.cart,
          { products: action.productInfo, quantity: action.quantity },
        ],
      };
    }
    case REMOVE_FROM_CART: {
      // return cart.filter((data, i) => i !== action.id);
      // const item_index = action.index;
      // const new_state = { ...state };
      // delete new_state.cart[item_index];
      // return new_state;
      return Object.assign({},state,state.cart.splice(action.index , 1)) };
    

    default:
      return state;
  }
}
export function selectedSubreddit(state = "reactjs", action) {
  switch (action.type) {
    case SELECT_SUBREDDIT:
      return action.subreddit;
    default:
      return state;
  }
}
export function SearchRes (state = {
  loading: false,
  message:'',
  products:{data:[]},
  query:''
} , action){
switch (action.type) {
  case REQUEST_SEARCH_RESULT : 
  return Object.assign({},state , {
  loading:true,
    query:action.query,
  })
  case RECIVED_SEARCH_RESULT : 
    return Object.assign({},state , {
      loading: false,
      message:action.message,
      products:action.products,
      lastUpdated : action.receivedAt
    })
    
    

  default:
   return state
}




}

export function slctedProd(state = {}, action) {
  switch (action.type) {
    case SELECT_Product:
      return action.slctedProda
    default:
      return state;
  }}

  function posts(
      state = {
        isFetching: false,
        didInvalidate: false,
        items: []
      },
      action
    ) {
      switch (action.type) {
        case INVALIDATE_SUBREDDIT:
          return Object.assign({}, state, {
            didInvalidate: true
          })
        case REQUEST_POSTS:
          return Object.assign({}, state, {
            isFetching: true,
            didInvalidate: false
          })
        case RECEIVE_POSTS:
          return Object.assign({}, state, {
            isFetching: false,
            didInvalidate: false,
            items: action.posts,
            lastUpdated: action.receivedAt
          })
        default:
          return state
      }
    }

export function postsBySubreddit(state = {}, action) {
  switch (action.type) {
    case INVALIDATE_SUBREDDIT:
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return Object.assign({}, state, {
        [action.subreddit]: posts(state[action.subreddit], action),
      });
    default:
      return state;
  }
}
export function signUpReducer (state={
  message:{},
  response:{},
  values:{}
}, action) {
  switch (action.type) {
    case REQUEST_SIGN_UP :
      return Object.assign({},state,{
        values:action.values})
      
    case SING_UP_FAILURE :
      return Object.assign({},state, {
        message:action.payload
      })
    case SIGNUP_RESPONSE : 
      return Object.assign({},state , {
        response:action.payload
      })
    default:
      return state;
  }
}
export function LoginReducer (state={
  message:{},
  response:{},
  values:{}
}, action) {
  switch (action.type) {
    case REQUEST_LOGIN :
      return Object.assign({},state,{
        values:action.values})
      
    case LOGIN_FAILURE :
      return Object.assign({},state, {
        message:action.payload
      })
    case LOGIN_RESPONSE : 
      return Object.assign({},state , {
        response:action.payload
      })
    default:
      return state;
  }
}
export function OrderReducer(state={addressForm:null}, action){
  switch (action.type) {
    case PLACE_ORDER :
      
      return Object.assign({},state , {
        addressForm: action.addressForm
      })
  
    default:
return state;  }
}
