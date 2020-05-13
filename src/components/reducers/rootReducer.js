import { combineReducers } from 'redux'
import theDefaultReducer , {OrderReducer,LoginReducer,signUpReducer,cartReducers,SearchRes , postsBySubreddit , selectedSubreddit,slctedProd} from './reducers'



const  rootReducer = combineReducers({
    theDefaultReducer,
    cartReducers,
    slctedProd,
    postsBySubreddit,
  selectedSubreddit,
  SearchRes,
  signUpReducer,
  LoginReducer,
  OrderReducer
  
  })
  export default rootReducer