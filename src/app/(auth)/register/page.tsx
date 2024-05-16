"use client";
import React, { useState } from 'react';

interface UserData {
  username: string;
  email: string;
  password: string;
}

const RegisterPage = () => {
  const [userData, setUserData] = useState<UserData>({
    username: '',
    email: '',
    password: '',
  });
   const [error, setError] = useState<string | null>(null);
   console.log(error)
  // handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    
    }).then((res) =>{
      if(res.status === 400){
         console.log("User already exists")
         setError("User already exists")
      }
    
  });
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" name="username" value={userData.username} onChange={handleInputChange} required />
        </label>
        <label>
          Email:
          <input type="email" name="email" value={userData.email} onChange={handleInputChange} required />
        </label>
        <label>
          Password:
          <input type="password" name="password" value={userData.password} onChange={handleInputChange} required />
        </label>
        <button type="submit">Register</button>
        {
          error && <p>{error}</p>
        }
      </form>
    </div>
  );
};

export default RegisterPage;