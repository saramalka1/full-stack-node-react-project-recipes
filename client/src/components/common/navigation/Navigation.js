import { NavLink } from "react-router-dom"
import { useGetAllCategoriesQuery } from "../../../features/categories/categoryApiSlice"
import { IoMdContact } from "react-icons/io";
import './navigation.css'
export const Navigation = () => {

  const { data: categories, isError, isLoading, isSuccess, error } = useGetAllCategoriesQuery()
  if (isLoading) return
  if (isError) return <h1>{JSON.stringify(console.error)}</h1>
  return (

    <div className="navigation-main-container">
     
      <NavLink to="/">ראשי</NavLink>
      <div className="navigation-recipes-container">
        
        מתכונים
        
        <div className="navigation-recipes">
          {
            categories.data?.map(cat => {
              return <NavLink to={`recipes/${cat._id}`}>{cat.name}</NavLink>
            })
          }
        </div>
      </div>

      <NavLink to='/pbook/:id'>חוברת מתכונים</NavLink>

      <div className="navigation-adminActions-container">
        פעולות

        <div className="navigation-adminActions">
          <NavLink to='/users'>משתמשים</NavLink>
          <NavLink to='/categories'>מתכונים</NavLink>

        </div>
      </div>
      <div className="login">
      התחברות/הרשמה
      <IoMdContact  className="login-icon" size={"3.5vh"}/>
      </div>
    </div>
  )
}
export default Navigation