import {createStore , compose , applyMiddleware} from 'redux'
import rootReducer from './components/reducers/rootReducer'
import thunk from 'redux-thunk';

// const store =  createStore(rootReducer,compose(applyMiddleware(thunk),window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))
const store =  createStore(rootReducer,applyMiddleware(thunk))

export default store

// const initState = {
//     cart:[
//         {
//             products:{categori: "Men's",imgUrl:'https://images-na.ssl-images-amazon.com/images/I/71QIOuyfzGL._AC_UY695_.jpg',product_id: "091", product_name:'shoes',product_price:0}
                    
//             ,
//             quantity:0
//         }
//     ],
//     productDB:[{categori: "Men's",imgUrl:'https://images-na.ssl-images-amazon.com/images/I/71QIOuyfzGL._AC_UY695_.jpg',product_id: "091", product_name:'shoes',product_price:0
    

//     }],
    //   {
//     selectedSubreddit: 'frontend',
//     postsBySubreddit: {
//       frontend: {
//         isFetching: true,
//         didInvalidate: false,
//         items: []
//       },
//       reactjs: {
//         isFetching: false,
//         didInvalidate: false,
//         lastUpdated: 1439478405547,
//         items: [
//           {
//             id: 42,
//             title: 'Confusion about Flux and Relay'
//           },
//           {
//             id: 500,
//             title: 'Creating a Simple Application Using React JS and Flux Architecture'
//           }
//         ]
//       }
//     }
//   }
// }


