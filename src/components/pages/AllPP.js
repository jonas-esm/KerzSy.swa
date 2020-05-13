import React ,{useState, useEffect}from 'react'
import { fetchData } from "../../api/api";
import PdCards from './products'
import Product from "./prdetails";


import {BrowserRouter as Router , Link , Route, Switch} from 'react-router-dom'

export default function Allpp (props) {
    const [products, setProducts] = useState([
        {
          categori: "Men's",
          imgUrl: "https://i.imgur.com/iO4cNOx.jpg",
          product_id: "091",
          product_name: "قميص اولادي",
          product_price: 799,
          barcode:"34334"
        },
      ]);
      const [pid, setPid] = useState();
      const [loading, setLoading] = useState(true);
      useEffect(() => {if (loading) {
         fetchData().then((res) => {
       
        setProducts([...res.data.data])
        setLoading(false);})}
      }, [products, loading]);
      // if(products.length <= 1)
      if(loading)
    return(
            <div>Loading</div>
        )
return (
    //  <Router> <Switch>
    <div>
        <Route exact path="/products">
            <PdCards  products={products}/>
            </Route>
            <Route exact path="/products/pid=:id">
              <Product  products={products} pid={pid} />
              
            </Route>
            </div>
        //     </Switch>
        // </Router>
    )
         
}