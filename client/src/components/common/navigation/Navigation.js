import { NavLink, useNavigate } from "react-router-dom"
import { useGetAllCategoriesQuery } from "../../../features/categories/categoryApiSlice"
import { IoMdContact } from "react-icons/io";
import './navigation.css'
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { useSendLogoutMutation } from "../../../features/auth/authApiSlice";
import { MdLogout } from "react-icons/md";
export const Navigation = () => {
  const { username, name, email, phone, isAdmin } = useAuth()
  const { data: categories, isError, isLoading, isSuccess, error } = useGetAllCategoriesQuery()
  const [logout,{}]=useSendLogoutMutation()
  const navigate=useNavigate()
  if (isLoading) return
  if (isError) return <h1>{JSON.stringify(console.error)}</h1>

const logoutClick=()=>{
logout()
navigate('/')
}
  return (

    <div className="navigation-main-container">

      <NavLink to="/">ראשי</NavLink>
      <div className="navigation-recipes-container">

        מתכונים

        <div className="navigation-recipes">
          {
            categories.data?.map(cat => {
              return <NavLink to={`recipes/${cat._id}`} className={'single-link-to-category-navigation'}>{cat.name}</NavLink>
            })
          }
        </div>
      </div>

      <NavLink to='/pbook/:id'>חוברת מתכונים</NavLink>

      {isAdmin && <div className="navigation-adminActions-container">
        פעולות

        <div className="navigation-adminActions">
          <NavLink to='/users' className={'single-link-to-action-navigation'}>משתמשים</NavLink>
          <NavLink to='/categories' className={'single-link-to-action-navigation'}>מתכונים</NavLink>

        </div>
      </div>}

      {!username && <NavLink to={"/login"} className="login" >
        התחברות/הרשמה

        {/* //בלחיצה כאן אני רוצה שיגיע לדף אחר אבל עדיין יראו ברקע אפור את הדף הקודם , אבל אפשר לבוא לשם מכל דף כלשהוא כי את העמוד הזה רואים כל הזמן, אז השאלה איך עושים את זה?אולי כדאי לבדוק באתר של אפרת סיאצי אם אצלה זה עובר לנתיב אחר , כי אולי זה פשוט קומפוננטה שקופצת לדף ולא בנתיב אחר */}
        <IoMdContact className="login-icon" size={"3.5vh"} />

      </NavLink>}
      {
        
      username &&
       <div className="user-in-container">
        <div> שלום {name} </div>
      <button onClick={logoutClick} className="logout-button">
        {/* <div className="user-exit-in-button"> */}
        
      <MdLogout/>
        {/* </div> */}
      </button>
      </div>
      
      }
       
       

    </div>
  )
}
export default Navigation