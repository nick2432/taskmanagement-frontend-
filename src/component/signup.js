import React, { useState } from "react";
import {Link} from "react-router-dom"
import './login.css'
import {useNavigate} from 'react-router-dom';
import axios from "axios";
export default function Signup() {
    const navigate=useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name,setname] = useState("");
    const collectdata=async(e)=>{
        e.preventDefault();
        try {
          const { data } = await axios.post(
            "https://taskmanagement-backend-nikhil.onrender.com/api/user/register",
            { name,email,password},
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
          );
          const id=data.user._id;
          navigate(`/tasks/${id}`)
        } 
        catch (error) {
            const x=error.response.data.message;
            alert(x);
        }
      };
  return (
    <div className="firstpage">
      <div className="header">
        <Link to="/" className="logintab">Login</Link>
        <Link to="/signup"  className="signuptab">Signup</Link>
      </div>
    <div className="login" >
    <p className="taskmanager">Task manager</p>
      <form className="loginForm" onSubmit={collectdata}>
      <p className="heading">Signup</p>
      <input
        type="name"
        placeholder="Name"
        required
        value={name}
        onChange={(e) => setname(e.target.value)}
      />
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
      <button type="submit" on className="button">Register</button>
    </form>
    </div>
    </div>
  )
}
