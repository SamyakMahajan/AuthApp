import React, { useState } from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { signInStart,signInSuccess,signInFailure } from '../redux/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../components/OAuth.jsx';
export default function Signin() {
  const dispatch=useDispatch();
  const [formData,setFormData]=useState({});
  // const [error,setError]=useState(false);
  // const [loading,setLoading]=useState(false);
  const {loading,error}=useSelector((state)=>state.user);
  const navigate=useNavigate();
  const handleChange= (e)=>{
    // set
    setFormData({ ...formData, [e.target.id]: e.target.value });

  }

  const handleSubmit=async (e)=>{
    e.preventDefault();
    // console.log(formData);
    // console.log(data);

    try{
        dispatch(signInStart());
        // setLoading(true)
        const res= await fetch('/api/auth/signin',
        {
          method:'POST',
          headers: {
            'Content-Type':'application/json'
          },
          body:JSON.stringify(formData)
        }
        );
        const data=await res.json();
        // console.log(data);
        dispatch(signInSuccess(data));
        // setLoading(false)
        // setError(false)
        if(data.success===false){
          // setError(true);
          dispatch(signInFailure());
          return;
        }
        navigate('/')
      }
    catch(err){
      dispatch(signInFailure(err));
    }

  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign in</h1>
    
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        {/* <input type='text' placeholder='Username' id='username' className='bg-slate-100 p-3 rounded-lg ' onChange={handleChange}/> */}
        <input type='email' placeholder='Email' id='email' className='bg-slate-100 p-3 rounded-lg ' onChange={handleChange}/>
        <input type='password' placeholder='Password' id='password' className='bg-slate-100 p-3 rounded-lg ' onChange={handleChange}/>
        <button disabled={loading} type='submit' className='bg-slate-700 text-white p-3 rounded-lg hover:opacity-90 uppercase disabled:opacity-80'>{loading?"Loading...":"Sign In!"}</button>
        <OAuth/>
      </form>

      <div className='flex gap-2 mt-5'>
          <p>Dont have an account?</p>
          <Link to='/sign-up'>
          <span className='text-blue-500'>Sign Up!</span>
          </Link>
      </div>
      <p className='text-red-500 mt-5'>{error? error.message+"Something Went Wrong":""}</p>
    </div>
  )
}
