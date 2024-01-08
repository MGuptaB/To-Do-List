import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const MainNav = () => {
  let navigate =useNavigate();
  const logoutHandler =()=>{
    localStorage.clear();
      navigate('/login');
  }
  return (
    <>
    <Link to='/dashboard'>Category List</Link>
    <Link to="/dashboard/add-Category">Add New Category</Link>
    <br/>
    <p>Hello {localStorage.getItem('userName')}!!</p>
    <button onClick={logoutHandler}>Logout</button>
    </>
  )
}

export default MainNav