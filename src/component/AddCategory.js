import axios from 'axios';
import React, { useState } from 'react'
import image from '../assets/94ed985e6ee5bd3559afdb3c49435420.jpg';
import loader from '../assets/Preload.gif';
import { useNavigate } from 'react-router-dom';


const AddCategory = () => {
    let navigate = useNavigate();
    const [category,setCategory] = useState('');
    const [selectedFile,setSelectedFile] =useState(null);
    const [imageUrl, setImageUrl]=useState(image);
    const [isLoading, setLoading] = useState(false);
    const [hasError, setHasError]  =useState(false);
    const [error, setError] = useState('');
    const fileHandler=(e)=>{
            setSelectedFile(e.target.files[0]);
            setImageUrl(URL.createObjectURL(e.target.files[0]));
    }
    const SubmitHandler=(event)=>{
        event.preventDefault();
        setLoading(true);
     const formData = new FormData();
     formData.append('name',category);
     formData.append('photo',selectedFile);
     axios.post('https://mern-api-k8fz.onrender.com/category',formData,{
      
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
     
     })
     .then(res=>{
        console.log(res);
        setHasError(false);
        setLoading(false);
        navigate('/dashboard');
     })
     .catch(err=>{
        setLoading(false);
        console.log(err);
        setHasError(true);
        setError(err.message);
     })
    
    }
  return (
    <>
    {isLoading && <div>
        <img style={{width:'150px'}} alt='hiha' src={loader}/>
    </div>}
     {!isLoading && !hasError &&   <div>
        <h1>Add New Work</h1>
        <form onSubmit={SubmitHandler} >
            <input onChange={(e)=>{setCategory(e.target.value)}} type='text'/>
            <input onChange={(e)=>{fileHandler(e)}} type='file'/>
            <button type='submit'>Submit</button>
            <br/><br/>
            <img style={{width:'150px'}} alt='defaultimage' src={imageUrl}/>
        </form>
     </div>}

     {hasError && <div>
             <p style={{color:'Red'}}>Error :- {error}</p>
     </div>}
    </>
  )
}

export default AddCategory