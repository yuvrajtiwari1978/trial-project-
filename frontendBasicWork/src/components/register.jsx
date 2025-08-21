import React, { useState } from 'react'

function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const registerUser = async (userData) => {
        try {
            const response = await fetch('http://localhost:5000/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
            if (!response.ok) {
                throw new Error('Registration failed')
            }
            const data = await response.json()
            console.log('Registration successful:', data)
            alert('Registration successful')
        } catch (error) {
            console.log('Error during registration:', error)
            alert('An error occurred during registration')
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (name.trim() === '' || email.trim() === '' || password.trim() === '') {
            alert('Please fill all fields')
            return;
        }
        registerUser({ name, email, password })
    }
    return (
        <div className='flex flex-col items-center justify-center bg-blue-500 space-y-5 p-4 m-2 rounded-md'>
            <h1 className='text-white'>Register</h1>
            <form onSubmit={handleSubmit} className='flex flex-col space-y-3'>
                <input type="text" className='p-2 rounded-md' placeholder='username' value={name} onChange={e => setName(e.target.value)} name="" id="" />
                <input type="text" className='p-2 rounded-md' placeholder='email' value={email} onChange={e => setEmail(e.target.value)} name="" id="" />
                <input type="text" className='p-2 rounded-md' placeholder='password' value={password} onChange={e => setPassword(e.target.value)} name="" id="" />
                <div className='flex justify-center items-center'>
                    <button className='bg-white text-blue-500 p-2 rounded-md' type='submit'>Register</button>
                </div>
            </form>
        </div>
    )
}

export default Register
