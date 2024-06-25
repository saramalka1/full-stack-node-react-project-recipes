import React from 'react'
import useAuth from '../../hooks/useAuth'
import { Navigate, Outlet } from 'react-router-dom'

const RequireAuth = ({allowRoles}) => {
   const {roles}=useAuth()
   const userAllowed=allowRoles.includes(roles)
  return (
    userAllowed?<Outlet/>:<Navigate to='/' replace/>
  )
}

export default RequireAuth