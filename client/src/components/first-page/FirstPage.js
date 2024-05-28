import { NavLink } from "react-router-dom"
import { useGetAllCategoriesQuery } from "../../features/categories/categoryApiSlice"
import './firstpage.css'
function FirstPage() {
    const {data:categories,isError,isLoading,isSuccess,error}=useGetAllCategoriesQuery()
    if(isLoading)return
    if(isError)return error

  return (
    <div className="first-page-container">
      {/* זה דיו לכל הקטגוריות */}
      <div className="categories-container">
        {
            categories.data?.map(cat=>{
              
                return <div className="single-category" >
                <NavLink to={`/recipes/${cat._id}`} ><h1>{cat.name}</h1>
                  </NavLink> 
                 
                  </div> 
            })
        }
        </div>
    </div>
    
  )
}

export default FirstPage