import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Axios from 'axios';

function Phone() {
    const [price,setPrice] = useState(8999);

    const purchased  =  async(prices)=>{
        console.log("Phone purchased :",prices)
                      
            const {data:{order,user,key}} =    await Axios.post('http://localhost:1000/checkout',{},{headers:{
                   amount:prices 
                 }})

                 console.log("orders ",order.id)
                 console.log(key) 
                 const options = {
                    "key": key, // Enter the Key ID generated from the Dashboard
                    "amount": order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                    "currency": "INR",
                    "name": "Coursera",
                    "description": "Purchasing course ",
                    "image": "https://example.com/your_logo",
                    "order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
                    "callback_url": "http://localhost:1000/paymentverification/",
                    "prefill": {
                        "name": user.name,
                        "email": user.email,
                        "contact": user.mobile
                    },
                    "notes": {
                        "address": "Razorpay Corporate Office"
                    },
                    "theme": {
                        "color": "#3399cc"
                    }
                };

                const razor =   new Razorpay(options)
                      
//                console.log(options,razor)
                razor.open();

    }

  return (
     <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 440 }}
        image="https://th.bing.com/th/id/OIP.qG1XxYeGs-a_u81j7o33ZgHaHm?rs=1&pid=ImgDetMain"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Samsung S22 Ultra
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Samsung Galaxy S22 5G (Green, 8GB, 128GB Storage) with No Cost EMI/Additional Exchange Offers
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          Price: &#8377;8999
        </Typography>
      </CardContent>
      <CardActions>
        <Button variant="contained" onClick={()=>purchased(price)} color="primary" sx={{display:"block",width:"100%"}}>
           Purchased Now
        </Button>
      </CardActions>
    </Card>
    </div>
  )
}


export default Phone
