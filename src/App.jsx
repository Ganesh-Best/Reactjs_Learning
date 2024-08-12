import { useState } from 'react'
import Phone from './components/Phone'
import { Routes,Route } from 'react-router-dom';
import PaymentSuccess from './components/PaymentSuccess';
import Chatapp from './components/Chatapp';
import AxiosPractice from './components/AxiosPractice';


function App() {
 

  return (
    <>
     
      <Routes> 
      {/* <Route path ="/" element={<Phone/>} />
      <Route path ="/paymentsuccess" element ={<PaymentSuccess/>} /> */}
      <Route path ="/" element={<AxiosPractice/>} />
      
      </Routes>
     </>
  )
}

export default App
