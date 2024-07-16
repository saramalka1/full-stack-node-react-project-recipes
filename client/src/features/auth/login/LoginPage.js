import './login-page.css'
import { useLoginMutation } from "../authApiSlice"
import { useEffect } from 'react'
import { useNavigate, NavLink, useLocation } from "react-router-dom"
const LoginPage = () => {
  const [login, { isError, error, isLoading, isSuccess, data }] = useLoginMutation()
  const navigate = useNavigate()
  const location = useLocation()
  const fromCategoryPage = location.state?.fromCategoryPage
  const catid = location.state?.catid
  useEffect(() => {
    if (isSuccess) {
      if (fromCategoryPage && catid) {
        navigate('/client/category/' + catid)
      }
      else {
        navigate('/')

      }
    }

  }, [isSuccess])
  const handle_submit = async (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    const userObj = Object.fromEntries(data.entries())
    login(userObj)
  }

  return (
    <div className='login-page-container'>

      <form onSubmit={handle_submit} className='login-page-form'>
        <div>אם אתם עדיין לא רשומים <NavLink id="toregister" to="/login/register">לחצו כאן להרשמה</NavLink>   </div>
        <input type='text' name='username' required placeholder='שם משתמש' />
        <input type='password' name='password' required placeholder='סיסמא' />
        <button type='submit'>התחברות</button>
        {isError && error.data?.message}
      </form>
    </div>
  )
}

export default LoginPage