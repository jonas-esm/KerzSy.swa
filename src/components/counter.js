import React from 'react'
import {useSelector , useDispatch} from 'react-redux'
import {Button} from '@material-ui/core'

function Counter() {
    const count = useSelector(state => state.count)
    const dispatch = useDispatch()
function handleDec() {
    dispatch({type:'DECREMENT'});
}
function handleInc(){
    dispatch({type:'INCREMENT'})
}


    return <div>
        <h1>Counter: {count}</h1>
        <Button variant="contained" color="primary" onClick={handleInc}>
            +
        </Button>
        <Button variant="contained" color="primary" onClick={handleDec}>
            -
        </Button>
    </div>
}
export default Counter;