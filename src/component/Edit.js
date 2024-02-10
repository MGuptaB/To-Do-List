import axios from 'axios';
import React, { useEffect, useState } from 'react'
import image from '../assets/94ed985e6ee5bd3559afdb3c49435420.jpg';
import loader from '../assets/Preload.gif';
import { useNavigate, useParams } from 'react-router-dom';

const Edit = () => {

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
    let params = useParams();
    useEffect(()=>{
        setLoading(true);
         axios.get('http://localhost:3000/category/'+ params.id)
           .then(res=>{
            console.log(res.data.category);
            setCategory(res.data.category.name);
            setImageUrl(res.data.category.photo)
            setLoading(false);
            setHasError(false);
           })
           .catch(err=>{
            console.log(err);
            setLoading(false);
            setError(err.response.data.message);
            setHasError(true);
           })
    },[params.id])
    
    const SubmitHandler=(event)=>{
        event.preventDefault();
        setLoading(true);
     const formData = new FormData();
     formData.append('name',category);
     formData.append('photo',selectedFile);
     axios.put('http://localhost:3000/category/'+params.id,formData)
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
    //  try {
        //     const res = await axios.post('http://localhost:3000/category', formData);
        //     console.log(res.data);
        //  } catch (error) {
        //     console.error(error);
        //  }
    }
  return (
    <>
    {isLoading && <div>
        <img style={{width:'150px'}} alt='hiha' src={loader}/>
    </div>}
     {!isLoading && !hasError &&               <div>
        <h1>Update Category</h1>
        <form onSubmit={SubmitHandler} >
            <input value={category} onChange={(e)=>{setCategory(e.target.value)}} type='text'/>
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

export default Edit