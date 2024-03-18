import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import loader from '../assets/Preload.gif';


const Signup = () => {
 let navigate =useNavigate();
 const [userName, setUserName] =useState('');
 const [email, setemail] =useState('');
 const [password, setPassword] =useState('');
 const [phone, setPhone] =useState(null);
 const [isLoading, setLoading] = useState(false);
 const [hasError, setHasError]  =useState(false);
 const [error, setError] = useState('');
 
    const submitHandler=(event)=>{
        setLoading(true);
        event.preventDefault();
    axios.post('https://mern-api-k8fz.onrender.com/user/signup',{
        userName:userName,
        password:password,
        email:email,
        phone:phone
    })
    .then(res=>{
        console.log(res.data);
        setLoading(false);
        setHasError(false);
        navigate('/login');
    })
    .catch(err=>{
        console.log(err);
        setLoading(false);
        setHasError(true);
        setError(err.message);

    })
         
    }
  return (
    <>
     {isLoading && <div>
        <img style={{width:'150px'}} alt='hiha' src={loader}/>
    </div>}
     {!isLoading && !hasError && <div>
       <h1>Create Account</h1>
        <form onSubmit={submitHandler}>
            <input type='text' placeholder='username' onChange={(e)=>setUserName(e.target.value)}/>
            <br/>
            <input type='password' placeholder='password' onChange={(e)=>setPassword(e.target.value)}/>
            <br/>
            <input type='text' placeholder='email' onChange={(e)=>setemail(e.target.value)}/>
            <br/>
            <input type='number' placeholder='phone' onChange={(e)=>setPhone(e.target.value)}/>
            <br/>
            <button type='submit'>Submit</button>

        </form>
        </div> }
        {hasError && <div>
             <p style={{color:'Red'}}>Error :- {error}</p>
     </div>}
    </>
  )
}

export default Signup