



import { selector } from "recoil";
import { courseState } from "../course";

export const title  = selector({
   key:'title',
   get:({get})=>{
    const course =  get(courseState);
    return course.title;
   }

})

export const price = selector({
    key:'price',
    get:({get})=>{
     const course =   get(courseState);
     return course.price;
    }
})

export const image  = selector({
    key:'image',
    get:({get})=>{
      const course =   get(courseState)
      return course.image
    }
})