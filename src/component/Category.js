import axios from 'axios'
import React, { useEffect, useState } from 'react';
import loader from '../assets/Preload.gif';
import { useNavigate } from 'react-router-dom';

const Category = () => {
    const [categoryList,setCategoryList] =  useState([]);
    const [isLoading , setLoading]=useState(false);
    const [hasError, setHasError]  =useState(false);
    const [error, setError] = useState('');
     let navigate = useNavigate();
    const detailRouter =(id)=>{
            navigate('detail/'+ id);
    }
    const updateRouter =(id)=>{
      navigate('update/'+ id);
}

const deleteRouter =(id,image)=>{
  if(window.confirm('Are You Sure?'))
{
     axios.delete('https://mern-api-lake.vercel.app/category?id='+id+'&imageUrl='+image)
     .then(res=>{
       console.log(res);
       getData();
     })
     .catch(err=>{
      console.log(err);
     })
}
     
}
const getData=  ()=>{
  console.log(localStorage.getItem('token'))
  const res = axios.get('https://mern-api-lake.vercel.app/category', {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
 
  })
  
  .then(res=>{
    setHasError(false);
    setLoading(false);
    console.log(res.data.category);
    setCategoryList(res.data.category);
  })
  .catch(err=>{
    console.log(err.response.data.message);
    setHasError(true);
    setError(err.response.data.msg);
    setLoading(false);
  })
}



  useEffect(()=>{
    setLoading(true);
    getData();
  },[]);
 

  return (
    <>
    {isLoading && <div>
      <img style={{width:'150px'}} src={loader}/>
    </div>}

   { !isLoading && !hasError && <div>
     <h1>Category List</h1>

        <table>
          <thead>
             <tr>
              <th>Name</th>
              <th>Image</th>
             </tr>
          </thead>
          <tbody>
               {categoryList?.map(data=><Row key={data._id} updateReq={updateRouter} deleteReq={deleteRouter} detailReq={detailRouter} detail={data}/>)}
          </tbody>
        </table>
        </div>}
        {hasError && <div>
             <p style={{color:'Red'}}>Error :- {error}</p>
     </div>}
    </>
  )
}

const Row =(props)=>{
  return (
  <tr>
    <td>{props.detail.name}</td>
    <td>{<img style={{width:'150px' , height:'80px'}} alt='phoyuu' src={props.detail.photo}/>}</td>
    <td><button onClick={()=>{props.detailReq(props.detail._id)}}>Detail</button></td>
    <td><button onClick={()=>{props.updateReq(props.detail._id)}} >Edit</button></td>
    <td><button onClick={()=>{props.deleteReq(props.detail._id,props.detail.photo)}}>Delete</button></td>

  </tr>
  )
}


export default Category