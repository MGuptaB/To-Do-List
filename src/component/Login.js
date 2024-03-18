import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import loader from '../assets/Preload.gif';


const Login = () => {
  let navigate =useNavigate();
 const [userName, setUserName] =useState('');
 const [password, setPassword] =useState('');
 const [isLoading, setLoading] = useState(false);
 const [hasError, setHasError]  =useState(false);
 const [error, setError] = useState('');
  const signupHandler =()=>{
    navigate('/signup');
  }
    const submitHandler=(event)=>{
        setLoading(true);
        event.preventDefault();
    axios.post('https://mern-api-k8fz.onrender.com/user/login',{
        userName:userName,
        password:password,
        
    })
    .then(res=>{
        console.log(res);
        setLoading(false);
        setHasError(false);
        localStorage.setItem('token',res.data.token);
        localStorage.setItem('userName',res.data.userName);
        navigate('/dashboard');
    })
    .catch(err=>{
        console.log(err);
        setLoading(false);
        setHasError(true);
        setError(err.response.data.msg);

    })
         
    }
  return (
    <>
     {isLoading && <div>
        <img style={{width:'150px'}} alt='hiha' src={loader}/>
    </div>}
     {!isLoading && !hasError && <div>
       <h1>Log in</h1>
       
       
        <form onSubmit={submitHandler}>
            <input type='text' placeholder='username' onChange={(e)=>setUserName(e.target.value)}/>
            <br/>
            <input type='password' placeholder='password' onChange={(e)=>setPassword(e.target.value)}/>
            <br/>
            <button type='submit'>Submit</button>

        </form>
        <br/>
        <br/>
        <button onClick={signupHandler}>Signup</button>
        </div>
               
         }
        {hasError && <div>
             <p style={{color:'Red'}}>Error :- {error}</p>
     </div>}
     
    </>
  )
}

export default Login