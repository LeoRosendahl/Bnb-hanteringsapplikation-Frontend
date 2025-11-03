import { useEffect, useState, type ChangeEvent } from 'react'
import { getListings, postListing } from '../services/listings';
import { useContext } from 'react';
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import '../App.css'

function LoginPage() {
    const navigate = useNavigate();
    // states
  const { login, isLoggedIn, logout } = useContext(AuthContext);
  const [loginData, setLogindata] = useState({
    email: "",
    password: ""
  })

// functions
  const emailInput = (e: ChangeEvent<HTMLInputElement>) => {
     const inputValue = e.target.value
    setLogindata({
        ...loginData,
        email: inputValue
    })
  }

  const passwordInput = (e: ChangeEvent<HTMLInputElement>) => {
     const inputValue = e.target.value
    setLogindata({
        ...loginData,
        password: inputValue
    })
  }
//   login function 
  const loginFunction = async(e: React.FormEvent) => {
    e.preventDefault()
try {
    //sends logins values to login funkction in authContext navigate then sends user to listing page
    await login(loginData.email, loginData.password)
    navigate("/")
}catch (error) {
    console.error(error)
}
}
    return (
        <div>
            <button type='button' onClick={() => { navigate("/") }}>Home</button>
            <h1>Login</h1>
            <form onSubmit={loginFunction}>
                <input type='text' placeholder='Email' onChange={emailInput} value={loginData.email} />
                <input type='password' placeholder='Password' onChange={passwordInput} value={loginData.password} />
                <button type='submit'>Login</button>
            </form>
            <div className='registerBoxLgPage'>
                <p>New here?</p>
                <button type='button' onClick={() => { navigate("/register") }}>Register</button>
            </div>
        </div>
    )
}

export default LoginPage;