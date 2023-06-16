import React, { useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom"
import {useNavigate} from 'react-router-dom';
import './login.css'
export default function Login() {
    const navigate=useNavigate();
   
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const collectdata=async(e)=>{
      e.preventDefault();
      try {
        const { data } = await axios.post(
          "https://taskmanagement-backend-nikhil.onrender.com/api/login",
          { email, password },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
        );
        const id=data.user._id;
        navigate(`/tasks/${id}`)
      } catch (error) {
          const x=error.response.data.message;
          alert(x);
          if(x!='Incorrect password'){
            navigate('/signup')
          }
      }
    };
    
     
  return (

    <div className="firstpage">
      <div className="header">
        <Link to="/" className="logintab">Login</Link>
        <Link to="/signup"  className="signuptab">Signup</Link>
      </div>
       <div className='login'>
    <form className="loginForm"  onSubmit={collectdata}>
    <p className="heading">Login</p>
    <input
        type="email"
        placeholder="Email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
       <input
        type="password"
        placeholder="Password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit" on className="button">Login</button>
    </form>
  </div>
    </div>
  )
}
