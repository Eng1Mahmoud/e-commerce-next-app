"use client";
import { signIn } from 'next-auth/react';
import React from 'react'

const LoginWithGoogle = () => {
    // handle login with google
    const handleLogin = () => { 
        // login with google
        signIn('google', { callbackUrl: '/' })
    }   
  return (
    
  <button onClick={handleLogin}>Login with Google</button>
  )
}

export default LoginWithGoogle