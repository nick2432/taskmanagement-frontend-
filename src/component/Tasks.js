import React, { useState,useEffect } from "react";
import  './task.css'
import './update.css'
import axios from "axios";
import {Button} from "@mui/material";
import {useParams } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import UpdateIcon from '@mui/icons-material/Update';
import CIcon from '@mui/icons-material/CalendarMonth';
import { Description, Update } from "@mui/icons-material";
export default function Tasks() {
  const [title, settitle] = useState("");
  const [Discription, setDiscription] = useState("");
  const [arr, setarr] = useState([]);
  const [change, setchange] = useState(0);
  const [taskid,settaskid] = useState('');
  const {id} = useParams();
  const colorarr=['fec89a','FFBF69','FFFFFF','CBF3F0','a1cca5','f5cac3'];
  useEffect(()=>{
    gettask();
  },[change])
  const close=()=>{
    const x=document.getElementById('update');
    x.style.display='none';
  }
  const gettask=async()=>{
    try {
    const { data } = await axios.get(
      `https://taskmanagement-backend-nikhil.onrender.com/api/gettask/${id}`,
      );
      const ar=data.tasks;
      setarr(ar.reverse());
    }
      catch (error) {
        const x=error.response.data.message;
        alert(x);
    }
  }
  const deletetask=async(e,taskid)=>{
    e.preventDefault();
    try {
      const { data } = await axios.delete(
        `https://taskmanagement-backend-nikhil.onrender.com/api/delettask/${taskid}`,
      );
      setchange(!change);
    } catch (error) {
        const x=error.response.data.message;
        alert(x);
    }
  }
  const statuschange=async(e,taskid,status)=>{
    let Status;
    if(status==='Pending'){
      Status='Completed'
    }
    else{
      Status='Pending';
    }
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `https://taskmanagement-backend-nikhil.onrender.com/api/update/${taskid}`,
        {Status:Status},
      );
      setchange(!change);
    } catch (error) {
        const x=error.response.data.message;
        alert(x);
    }
  }
  const updatetask1=async(e)=>{
    console.log(taskid);
    try {
      await axios.put(
        `https://taskmanagement-backend-nikhil.onrender.com/api/update/${taskid}`,
        { title,Discription,Status:'Pending'},
      );
      setchange(!change);
    } catch (error) {
        const x=error.response.data.message;
        alert(x);
    }
    const x=document.getElementById('update');
    x.style.display='none';
  }
  const updatetask=async(e,task)=>{
    const x=document.getElementById('update');
    x.style.display='flex';
    settitle(task.title);
    setDiscription(task.Discription);
    settaskid(task._id);
  }
  const addtask=async(e)=>{
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `https://taskmanagement-backend-nikhil.onrender.com/api/addtask/${id}`,
        { title,Discription,Status:'Pending'},
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
      );
      setchange(!change);
    } catch (error) {
        const x=error.response.data.message;
        alert(x);
    }
  };
  return (
    <div className='home'>
      <div className='left'>
        <p className='lable' >Title</p>
        <input 
         className="input1"
          type='text'
          value={title}
          onChange={(e) => settitle(e.target.value)}
        />
        <p className='lable'>Description</p>
        <textarea maxlength="410" 
          className='inputtask'
          value={Discription}
          onChange={(e) => setDiscription(e.target.value)}
        />
        <Button type="submit" className="icon3" onClick={addtask} style={{color:'black',backgroundColor:'#2ec4b6', marginTop:'10%',height:'30px'}} startIcon={<AddIcon />} >Add Task</Button>
      </div>
      <div className='right'>
        {arr.map((task,idx)=>{
          return(
            <div className='task' style={{backgroundColor:`#${colorarr[idx%6]}`}}>
              <p className="title">{task.title}</p>
              <p className="discription">{task.Discription}</p>
             <div className="icon"> 
             <div  className ='status' onClick={(e) => statuschange(e, task._id,task.Status)}>{task.Status}</div>
              <DeleteIcon className ='icon1' onClick={(e) => deletetask(e, task._id)} style={{color:'#22223b',fontSize:'1.0rem'}}/>
              < UpdateIcon className="icon1" onClick={(e) => updatetask(e, task)} style={{ color:'#22223b',fontSize:'1.0rem'}}/>
               </div>
             <div className="dateicon">
              <CIcon style={{color:'#22223b',fontSize:'1.0rem'}}/>
              <div className="date">{task.createdAt.split('T')[0]}</div>
             </div>
            </div>
          )
        })}
      </div>
      <div id='update'>
    <div className='updatebox'>
    <p className='lable' >Title</p>
        <input 
         className="input1"
          type='text'
          value={title}
          onChange={(e) => settitle(e.target.value)}
        />
        <p className='lable'>Description</p>
        <textarea maxlength="410" 
        value={Discription}
        onChange={(e) => setDiscription(e.target.value)}
        className='inputtask'
        />
         <Button type="submit" onClick={updatetask1} style={{color:'black',backgroundColor:'#2ec4b6', marginTop:'10%',height:'30px'}} startIcon={<UpdateIcon />} >Update Task</Button>
    </div>
    <CloseIcon onClick={close} style={{color:'#22223b',cursor:'pointer',fontSize:'2.0rem'}}/>
    </div>
    </div>
  )
}
