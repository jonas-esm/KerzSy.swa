import React from 'react'
import Grid from '@material-ui/core/Grid'

export default function SizeChart(Props) {
    
    return(
        <div >
            <Grid container spacing={1}>
              <Grid style={{maxHeight:'720px'}} item xs={12} md={6} lg={6}>
                  <img style={{width:'100%'}} src='https://i.imgur.com/yJNUXDc.png' />
              </Grid>
              <Grid style={{maxHeight:'720px'}} item xs={12} md={6} lg={6}>
              <img style={{width:'100%'}} src='https://i.imgur.com/Grbd8pz.png' />
                </Grid>
            </Grid>
        </div>
    )
};
