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
    <Link to='/dashboard'>To Do List</Link>
    <br/>
    <Link to="/dashboard/add-Category">Add New Work</Link>
    <br/>
    <p>Hello {localStorage.getItem('userName')}!!</p>
    <button onClick={logoutHandler}>Logout</button>
    </>
  )
}

export default MainNav