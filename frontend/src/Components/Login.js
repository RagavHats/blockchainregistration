import React , {useState} from 'react';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Link} from "react-router-dom";
export default function Login() {
    const [email , setEmail ] = useState('')
    const [password , setPassword ] = useState('')
    const [name , setName] = useState('')


    const onSave = async (e)=>{
        e.preventDefault();
        console.log("USER DETAILS" , email , password , name )
        let params = {
            email , 
            password
        }
        await axios.post('http://localhost:3001/login' , params).then((response)=>{
            console.log("LOGIN RESPONSe" , response)
            toast.success(response.data.message);
        }).catch((err)=>{
            let message = err ? err.response.data.message : "Invalid details !"
            console.log("ERROR" , err.response)
            toast.error(message);
        })

    }
    return (
        <div>
            <center><h2>Login</h2></center>
            <form onSubmit={onSave}>
            <div class="clearfix">
                <label>Email</label>
                <p><input type="email" value={email}  required onChange={(e) =>setEmail(e.target.value)}/></p>
                <label>Password</label>
                <p><input type="password"  value={password} onChange={(e) =>setPassword(e.target.value)}
                 required/></p>
                <p><input type="submit" value="Login"/></p>
                <p>Not a member? <Link to="/signup">Sign up now</Link></p>
          </div>

        </form>
        </div>
        
    );
}