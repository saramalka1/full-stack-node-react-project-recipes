import { NavLink } from "react-router-dom"
import { useGetAllCategoriesQuery } from "../../features/categories/categoryApiSlice"
import './firstpage.css'
import useGetFilePath from "../../hooks/useGetFilePath"
import { useGetAllRecipesQuery } from "../../features/recipes/RecipeApiSlice"
import { useState } from "react"
function FirstPage() {
  const { data: categories, isError, isLoading, isSuccess, error } = useGetAllCategoriesQuery()
  const {data:recipes,isError:iserrorr,isLoading:isloadingr,error:errorr}=useGetAllRecipesQuery()
  const [recipesshow,setrecipesshow]=useState([])
  const { getFilePath } = useGetFilePath()
  if (isLoading) return
  if (isError) return <div>{JSON.stringify(error)}</div>
  if (isloadingr) return
  if (iserrorr) return <div>{JSON.stringify(errorr)}</div>

  //sorting new recipes
  return (
    
    <div className="first-page-container-home">
      
      {/* זה דיו לכל הקטגוריות */}
      <div className="categories-container-home">
        {
          categories.data?.map(cat => {

            return (
              <div className="single-category-home-container">
              <div className="single-category-home" >
                <NavLink to={`/recipes/${cat._id}`} >
                  <div className="single-category-img-container-home">
                    <img src={getFilePath(cat.img)} />
                  </div>
                  {cat.name}

                </NavLink>

              </div>
              </div>
            )
          })
        }
      </div>
      {/* new recipes */}
      <div className="categories-container-home">
        {
          recipes.data?.map(cat => {

            return (
              <div className="single-category-home-container">
              <div className="single-category-home" >
                <NavLink to={`/recipes/${cat._id}`} >
                  <div className="single-category-img-container-home">
                    <img src={getFilePath(cat.img)} />
                  </div>
                  {cat.name}

                </NavLink>

              </div>
              </div>
            )
          })
        }
      </div>

    </div>

  )
}

export default FirstPage