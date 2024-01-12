import React from 'react'
import {GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth"
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';

export default function OAuth() {

  const dispatch=useDispatch();
  const handleGoogleClick= async ()=>{
    try {
      const auth=getAuth(app);
      const provider=new GoogleAuthProvider();
      const result=await signInWithPopup(auth,provider);
      const username=result.user.displayName;
      const email=result.user.email;
      const pfp=result.user.photoURL;

      const res=await fetch('/api/auth/google',{
        method:'POST',
        headers:{
          'Content-type':'application/json'
        },
        body:JSON.stringify({name:username,email:email,image:pfp})
      })
      const data=await res.json();
      dispatch(signInSuccess(data));

      console.log(data)
    } catch (error) {
     console.log("google login error",error) 
    }
  }

  return (
    <button onClick={handleGoogleClick} type='button' className='bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-90'>
      OAuth
    </button>
  )
}
