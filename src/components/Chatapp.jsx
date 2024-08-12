import {React,useEffect, useState,useCallback,useMemo,useca} from 'react'
import Typography from '@mui/material/Typography'
import {io} from 'socket.io-client';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import { Stack } from '@mui/material';







function Chatapp() {

  const socket = useMemo(()=>io('http://localhost:9000/'),[]);


  const [id,setId] = useState();

  const [room ,setRoom] = useState("");

  const [message ,setMessage] = useState()
  
  const [messages,setMessages] = useState([])

    //   const marks = [4,3,2,44,333,11,2232]
    //  let min , temp ; 

    // //  //Bubble Sorting:

    // //  for(let i = 0 ;i <marks.length ; i++){
         
    // //      for(let j=0 ; j< marks.length-i ;j++){
                 
    // //          if(marks[j] < marks[j+1]){
    // //                temp = marks[j];
    // //               marks[j] = marks[j+1]
    // //               marks[j+1] = temp;
    // //          }
    // //      }

    // //  }


    //   for(let i=0 ;i < marks.length -1 ;i++){
              
    //     let min = i;

    //      for(let j = i ; j < marks.length ; j++ ){
                      
    //                 if(marks[j] > marks[min] ){
    //                        min = j;
    //                 }

    //      }  
           
    //          temp = marks[min];
    //          marks[min] = marks[i];
    //          marks[i] = temp;

    //   }



    //  console.log('sorted array :',marks) 
   

   
    

   useEffect(() => {
    
    socket.on('connect',(r)=>{
     setId(socket.id)     
    })

    
    socket.on('message',(r)=>{
    
      setMessages((pre)=>[...pre , r])
 
    })
  
         

          
       
        
   
   }, []);

   const  sendMessage = (e)=>{
   
  
    socket.emit('sendMessage',{room,message})

   }

   const joinRoom = ()=>{
  
    socket.emit('joinRoom',room)

   }

  
  return (

   <div style={{ display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
            <Typography variant="h4"  sx={{marginTop:"1rem"}} >Welcome on Slack App :
            </Typography>
            { id &&<div>Your user Id: {id}</div>}

            <div style={{display:"flex",flexDirection:"row",marginTop:"1rem",gap:'5px'}}>
            <TextField
              id=""
              label="Enter Group Name :"
              onChange={e=>setRoom(e.target.value)}
            />
            <Button variant="contained" onClick={joinRoom} color="primary">
              Join Room
            </Button> 

            </div>
             
            <div style={{display:"flex",flexDirection:"row",marginTop:"1rem",gap:'5px'}}>         
            <TextField
              id=""
              label="Enter message  :"
              onChange={e=>setMessage(e.target.value)}
            />
            <Button  variant="contained" onClick={sendMessage} color="primary" style={{marginTop:"0.5rem"}}>
              Send Message
            </Button>
            </div>

            <div style={{marginTop:"1rem"}}>
               <Typography variant="h4"  >Received Message</Typography>

               <Stack >
               {messages.map((m,i)=> (
                   <Typography key={i} variant="caption" color="initial">{m}</Typography>
               ))}
               </Stack>

            </div>

   </div>
  )
}


export default Chatapp
