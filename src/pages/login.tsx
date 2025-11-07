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
  const loginFunction = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      //sends logins values to login funkction in authContext navigate then sends user to listing page
      await login(loginData.email, loginData.password)
      navigate("/")
    } catch (error) {
      console.error(error)
    }
  }
  return (
<div className="loginPageContainer">
      <div className="loginCard">
        <h1 className="loginTitle">Welcome Back 👋</h1>
        <p className="loginSubtitle">Log in to explore new stays</p>

        <form className="loginForm" onSubmit={loginFunction}>
          <input
            type="email"
            placeholder="Email"
            onChange={emailInput}
            value={loginData.email}
            className="loginInput"
            required
          />
          <input
            type="password"
            placeholder="Password"
            onChange={passwordInput}
            value={loginData.password}
            className="loginInput"
            required
          />
          <button type="submit" className="loginButton">
            Log In
          </button>
        </form>

        <div className="registerPrompt">
          <p>New here?</p>
          <button
            type="button"
            className="registerButton"
            onClick={() => navigate("/register")}
          >
            Create Account
          </button>
        </div>

        <button
          type="button"
          className="homeButton"
          onClick={() => navigate("/")}
        >
          ← Back to Home
        </button>
      </div>
    </div>
  );
}

export default LoginPage;