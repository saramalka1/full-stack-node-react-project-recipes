import { useNavigate, NavLink } from "react-router-dom"
import './register-page.css'
import {useRegisterMutation} from "../authApiSlice"
import { useEffect } from 'react'
const RegisterPage = () => {

    const [register, { isError, error, isLoading, isSuccess, data }] = useRegisterMutation()
    const navigate = useNavigate()
useEffect(()=>{
    if(isSuccess)
        navigate('/')
},[isSuccess])
    const handle_submit = async (e) => {
        e.preventDefault()
        const data = new FormData(e.target)
        const userObj = Object.fromEntries(data.entries())
        register(userObj)
    }

    return (
        <div className='register-page-container'>

            <form onSubmit={handle_submit} className='register-page-form'>

                <input type='text' name='username' required placeholder='שם משתמש' />
                <input type='password' name='password' required placeholder='סיסמא' />
                <input type='text' name='name' required placeholder='שם מלא' />

                <input type='email' name='email' required placeholder='אימייל' />
                <input type='text' name='phone' required placeholder='טלפון' />


                <button type='submit'>הרשמה</button>
                {error && error.data?.message}
            </form>
        </div>
    )
}

export default RegisterPage




