import React from 'react'
import './animateClasses.css'
import {Paper} from '@material-ui/core'
import Paginationc from '../Pagination'
// import Counter from '../counter'
// import {Provider , useSelector} from 'react-redux'

const Home = () => {
 
    return (<div>
   
   


<div className="area" >
<Paper component="div" style={{padding:'20px',margin:5}} > <h4 style={{left:'200px'}}>Welcome To my store...</h4> </Paper>
<Paper component="div" style={{padding:'20px',margin:5}} > <h4 style={{left:'200px'}}>this store is under development..</h4></Paper>
<Paper component="div" style={{padding:'20px',margin:5}} > <Paginationc />

</Paper>
         
    </div >
</div>
    );
}
export default Home;