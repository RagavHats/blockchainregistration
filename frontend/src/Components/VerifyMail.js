import React , {useEffect, useState} from 'react';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Link } from "react-router-dom";
const  VerifyMail = (props ) => {
    const [email , setEmail ] = useState('')
    const [password , setPassword ] = useState('')
    const [name , setName] = useState('')

    useEffect(async ()=>{
        const url = window.location.href
        const splitData = url.split('/')
        let id = splitData[splitData.length -1]
        await axios.post(`http://localhost:3001/verifyemail/${id}`).then((response)=>{
            console.log("LOGIN RESPONSe" , response)
            toast.success(response.data.message);
        }).catch((err)=>{
            let message = err ? err.response.data.message : "Invalid details !"
            console.log("ERROR" , err.response)
            toast.error(message);
        })
    },[])

    
    return (
        <div>
            
          
            <div className="clearfix">
                <label>Your Account is Verified Successfuly .</label>
                
                <p> <Link to="/">Tap Here to login</Link></p>
          </div>
        </div>
        
    );
};

export default VerifyMail;