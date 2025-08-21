import React from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { useEffect } from 'react'

import { useState } from 'react'

function UnProtectedRoute() {
    const navigate = useNavigate()
    const [token, setToken] = useState(localStorage.getItem("token"))
    useEffect(() => {
        if (token) {
            navigate("/")
        }
    }, [])
    return (
        <Outlet />
    )
}

export default UnProtectedRoute
