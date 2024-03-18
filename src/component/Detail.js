import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import loader from '../assets/Preload.gif';


const Detail = () => {
   let params = useParams();

   const [category,setCategory] = useState({});
   const [isLoading , setLoading]=useState(false);
    const [hasError, setHasError]  =useState(false);
    const [error, setError] = useState('');
   console.log(params.id);
    useEffect(()=>{
        setLoading(true);
           axios.get('https://mern-api-k8fz.onrender.com/category/'+ params.id)
           .then(res=>{
            console.log(res.data.category);
            setCategory(res.data.category);
            setLoading(false);
            setHasError(false);
           })
           .catch(err=>{
            console.log(err);
            setLoading(false);
            setError(err.response.data.message);
            setHasError(true);
           })
    },[])
  return (
   <>
   { isLoading &&
    <div>
        <img style={{width:'150px'}} src={loader}/>
    </div>
   }
   {!isLoading && !hasError && <div>
        <img style={{width:'150px' }} src={category.photo}/>
        <h1>{category.name}</h1>
    </div>}
   {hasError && <div>
      <p style={{color:'red'}}>Error:-{error}</p>
    </div>}
   </>
  )
}

export default Detail