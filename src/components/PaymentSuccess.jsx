import React from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import Typography from '@mui/material/Typography'

function PaymentSuccess() {
    const params    =   useSearchParams()[0]
                             
    console.log(params.get('reference'))
    
    const payment_Id = params.get('reference')

  return (
    <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",height:"400px"}}>
         <Typography variant="h3" color="initial">Order Successful</Typography>
        {payment_Id }
    </div>
  )
}

export default PaymentSuccess
