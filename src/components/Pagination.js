import React, { useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Pagination } from '@material-ui/lab'


const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      '& > *': {
        marginTop: theme.spacing(2),
      },
    
    
    },
    ul:{justifyContent:'center',}
  }),
);

export default function Paginationc(props) {
  const classes = useStyles();
    const [page, setPage] = useState(1)
    const handleChange = (e , v) => setPage(v)
  return (
    <div className={classes.root}>
    
      <Pagination classes={{ul:classes.ul}} count={props.count}  variant="outlined" color="primary" onChange={props.handleChange} />
      
    </div>
  );
}