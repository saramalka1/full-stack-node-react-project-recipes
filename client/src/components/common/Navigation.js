import { NavLink } from "react-router-dom"
import { useGetAllCategoriesQuery } from "../../features/categorys/categoryApiSlice"
import "./layout.css"

export const Navigation = () => {

  const {data:categories,isError,isLoading,isSuccess,error}=useGetAllCategoriesQuery()
  if(isLoading) return 
  if(isError) return <h1>{JSON.stringify(console.error)}</h1>
  return (

    <div>
     { console.log(categories.data)}
     {/* { console.log(data.data)} */}

      <NavLink to="/">ראשי</NavLink>
      <div>
        מתכונים
        <div>
          {
            categories.data?.map(cat=>{
              return <NavLink to={`recipes/${cat._id}`}>{cat.name}</NavLink>
            })
          }
        </div>
      </div>
     
      <NavLink to='/pbook/:id'>חוברת מתכונים</NavLink>
          //רק למנהל:
          <div>
            פעולות
          </div>
          <div>
          <NavLink to='/users'>משתמשים</NavLink>
          <NavLink to='/recipeactions'>מתכונים</NavLink>

          </div>
      
    </div>
  )
}
export default Navigation