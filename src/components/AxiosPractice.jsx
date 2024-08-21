import React, { useEffect, useState } from 'react' ;
import Axios from 'axios' ;
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {  loading } from '../Store/loading';
import {  useRecoilValue, useSetRecoilState } from 'recoil';
import { courseState } from '../Store/course';
import { title ,image,price } from '../Store/Selectors/CourseSelector';


function AxiosPractice() {

  const setCourse = useSetRecoilState(courseState)  ;

  const load  = useRecoilValue(loading);
  const setLoad = useSetRecoilState(loading);
  const BASE_URL = "http://localhost:9000/course";

  const init = async()=>{
               
    const {data} =  await Axios.get(BASE_URL)
           setLoad(false)
    console.log(data);
    setCourse(data.course)

  }
   useEffect(()=>{

        init()


  },[])

  if(load)
    return <div>
      loading ......
      {console.log(load)}
    </div>


  return (
    <div>
      
        <Background />
            <Grid container >
               <Grid item lg={7} mg={7} sm={12} xs={12} >
                    <CourseUpdate />
               </Grid>
               <Grid item lg={5} mg={5} sm={12} xs={12}>
                     <CourseCard  /> 
               </Grid>
               
            </Grid>
    </div>
  )
}

const Background = ()=>{
  return <div style={{height:"11rem", backgroundColor:"brown",color:"white", display:"flex",justifyContent:"center",alignItems:"center"}}>
      <Typography variant="h4" >
        <Title/>
      </Typography>
  </div>
}



const CourseUpdate = ()=>{
  const course  = useRecoilValue(courseState);
  const setCourse = useSetRecoilState(courseState)
  const [title,setTitle] = useState(course.title);
  const [description,setDescription] = useState(course.description);
  const [price,setPrice] = useState(course.price);
  const [image,setImage] = useState(course.image);

 
  // useEffect(()=>{
  //         setDescription(course?.description);
  //         setTitle(course?.title);
  //         setPrice(course?.price);
  //         setImage(course?.image);
  // },[course])

  const updateCourse = async()=>{
            let BASE_URL = "http://localhost:9000/course"
            let Data = {title,description,price,image}
        const {data} =    await Axios.put(BASE_URL,Data);

           console.log('sending data :',Data);
           setCourse(data.course);
           console.log('updated data :',data)
  }

  return <div >

       <div style={{width:"360px",margin:'auto',padding:"30px"}}>

         <TextField id="outlined-required"  onChange={e=>setTitle(e.target.value)} value={title}  label="Title" variant="outlined" fullWidth  /><br/>
         <TextField onChange={e=>setDescription(e.target.value)} value={description} id="outlined-basic" label="Description" variant="outlined" sx={{width:"100%",marginTop:"10px"}} /><br/>
         <TextField onChange={e=>setImage(e.target.value)} value={image} id="outlined-basic" label="Image" variant="outlined" sx={{width:"100%",marginTop:"10px"}} /><br/>
         <TextField onChange={e=>setPrice(e.target.value)} value={price} id="outlined-basic" label="Price" variant="outlined" sx={{width:"100%",marginTop:"10px"}} /><br/>
        
         <Button  onClick={updateCourse} variant="contained" color="primary" sx={{width:"100%",marginTop:"10px"}} >
             Update Course
         </Button>
      
      </div>
  </div>
}

const CourseCard = ()=>{
   
  const setCourse = useSetRecoilState(courseState);
    
  
  return <div style={{display:"flex",justifyContent:"center"}}>
  <Card sx={{ width: 345 }}>
   <Image/>
  <CardContent>
    <Typography gutterBottom variant="h5" component="div">
     <Title/>
    </Typography>
    <Typography variant="body2" color="text.secondary">
       <Price/>
    </Typography>
  </CardContent>
  <CardActions>
    <Button variant="contained" color="primary" onClick={()=>setCourse(course=>({...course
    ,price:4000
   }))}
    >
        Buy Now
    </Button>
  </CardActions>
</Card>
</div>

}


function Price(){
   const coursePrice = useRecoilValue(price)
  return <>
    {coursePrice}
  </>
}

function Title(){
  const courseTitle = useRecoilValue(title)
  
  return<div>
  {courseTitle}
  </div>
}

function Image(){
  const courseImage = useRecoilValue(image);
  return<>
     <CardMedia
    sx={{ height: 140 }}
    image={courseImage}
  />
  </>
}

export default AxiosPractice
