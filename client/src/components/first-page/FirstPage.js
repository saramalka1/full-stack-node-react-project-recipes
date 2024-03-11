import { NavLink } from "react-router-dom"
import { useGetAllCategoriesQuery } from "../../features/categorys/categoryApiSlice"

function FirstPage() {
    const {data:categories,isError,isLoading,isSuccess,error}=useGetAllCategoriesQuery()
    if(isLoading)return
    if(isError)return error

  return (
    <div>FirstPage
      {/* זה דיו לכל הקטגוריות */}
      <div>
        {
            categories.data?.map(cat=>{
                return <NavLink to={`/recipes/${cat._id}`}><h1>{cat.name}</h1>
                //כאן אמורים לראות את התמונה
                <img src={cat?.img||""}/>
                  </NavLink>  
            })
        }
        </div>
    </div>
    
  )
}

export default FirstPage