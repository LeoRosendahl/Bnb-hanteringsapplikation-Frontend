import { useEffect, useState, type ChangeEvent } from 'react'
import { getListings, postListing } from '../services/listings';
import { useContext } from 'react';
import { AuthContext } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import '../App.css'

function RegisterPage() {
    const navigate = useNavigate();
    const { login, isLoggedIn, logout, register } = useContext(AuthContext);
    const [registerdata, setRegisterData] = useState({
        name: "",
        email: "",
        password: ""
    })

    // functions
    const nameInput = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setRegisterData({
            ...registerdata,
            name: inputValue
        })
    }

    const emailInput = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setRegisterData({
            ...registerdata,
            email: inputValue
        })
    }

    const passwordInput = (e: ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setRegisterData({
            ...registerdata,
            password: inputValue
        })
    }

    const registerFunction = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            await register(registerdata.email, registerdata.password,registerdata.name)
            navigate("/login")
        } catch (error) {
            console.error(error, "failed to register user")
        }
    }
    return (
        // <div>
        //     <h1>Register</h1>
        //     <button type='button' onClick={() => { navigate("/") }}>Home</button>
        //     <form onSubmit={registerFunction}>
        //         <input type='text' placeholder='Name' value={registerdata.name} onChange={nameInput} />
        //         <input type='text' placeholder='Email' value={registerdata.email} onChange={emailInput} />
        //         <input type='password' placeholder='password' value={registerdata.password} onChange={passwordInput} />
        //         <button type='submit'>Register</button>
        //     </form>
        //     <div className='registerBoxLgPage'>
        //         <p>Want to log in?</p>
        //         <button type='button' onClick={() => { navigate("/login") }}>Login</button>
        //     </div>
        // </div>
        <div className="loginPageContainer">
      <div className="loginCard">
        <h1 className="loginTitle">Create Account ✨</h1>
        <p className="loginSubtitle">Join RentaPlace and start listing or booking today!</p>

        <form className="loginForm" onSubmit={registerFunction}>
          <input
            type="text"
            placeholder="Name"
            value={registerdata.name}
            onChange={nameInput}
            className="loginInput"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={registerdata.email}
            onChange={emailInput}
            className="loginInput"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={registerdata.password}
            onChange={passwordInput}
            className="loginInput"
            required
          />
          <button type="submit" className="loginButton">
            Register
          </button>
        </form>

        <div className="registerPrompt">
          <p>Already have an account?</p>
          <button
            type="button"
            className="registerButton"
            onClick={() => navigate("/login")}
          >
            Log In
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
    )
}

export default RegisterPage;