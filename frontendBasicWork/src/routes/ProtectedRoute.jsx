import React, { useEffect } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'
import { EditContextProvider } from '../context/use-blogdata'

function ProtectedRoute() {
    const navigate = useNavigate()
    const token = localStorage.getItem("token")

    useEffect(() => {
        if (!token) {
            navigate("/auth/register")
        }
    }, [])

    return (
        <EditContextProvider>
            <Outlet />
        </EditContextProvider>
    )
}

export default ProtectedRoute
