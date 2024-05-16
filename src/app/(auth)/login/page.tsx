"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
interface LoginData {
  email: string;
  password: string;
}

const LoginPage = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: '',
  });

  // handle input changes
// handle input changes
const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const { name, value } = e.target;
  setLoginData({ ...loginData, [name]: value });
};

  const handleSubmit =  (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      cache: 'no-cache',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData),
    },
    ).then(async (res) => {
    
        const data = await res.json();
     if(res.ok){
      console.log(data) 
      router.push('/');
     }
    
      if(res.status === 400){
      
        console.log(data.message)
      }
    })
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} >
        <label>
          Email:
          <input type="email" name="email" value={loginData.email} onChange={handleInputChange} required />
        </label>
        <label>
          Password:
          <input type="password" name="password" value={loginData.password} onChange={handleInputChange} required />
        </label>
        <button type='submit'>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;