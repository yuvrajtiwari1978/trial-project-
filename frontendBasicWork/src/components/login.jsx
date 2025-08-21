import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState(localStorage.getItem("token"));

    useEffect(() => {
        if(token) {
            navigate("/")
        }
        console.log("useEffect running")
    }, [token])

    const loginUser = async () => {
        const response = await fetch("http://localhost:5000/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        })
        if (!response.ok) {
            throw new Error('Login failed')
        }
        const data = await response.json()
        const token = data.token
        if (!token) {
            throw new Error('Missing token')
        }
        localStorage.setItem("token", token)
        setToken(data.token)
        // navigate("/")
        return data
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!email.trim() || !password.trim()) {
            alert('Please Enter Email and password');
            return;
        }
        loginUser()
    }

    return (
        <div className='bg-slate-500 space-y-3'>
            <h1 className='text-white'>Login</h1>
            <form onSubmit={handleSubmit} className='space-y-3 flex flex-col' action="">
                <input type="email" placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} />
                <div className="flex justify-end">
                    <button type='submit' className='text-white bg-blue-700 hover:bg-blue-600 p-3'>Login</button>
                </div>
            </form>
        </div>
    )
}

export default Login
