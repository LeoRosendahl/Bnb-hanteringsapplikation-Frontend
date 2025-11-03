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
        <div>
            <h1>Register</h1>
            <button type='button' onClick={() => { navigate("/") }}>Home</button>
            <form onSubmit={registerFunction}>
                <input type='text' placeholder='Name' value={registerdata.name} onChange={nameInput} />
                <input type='text' placeholder='Email' value={registerdata.email} onChange={emailInput} />
                <input type='password' placeholder='password' value={registerdata.password} onChange={passwordInput} />
                <button type='submit'>Register</button>
            </form>
            <div className='registerBoxLgPage'>
                <p>Want to log in?</p>
                <button type='button' onClick={() => { navigate("/login") }}>Login</button>
            </div>
        </div>
    )
}

export default RegisterPage;