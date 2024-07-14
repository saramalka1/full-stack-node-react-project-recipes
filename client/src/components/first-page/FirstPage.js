import { NavLink } from "react-router-dom"
import { useGetAllCategoriesQuery } from "../../features/categories/categoryApiSlice"
import './firstpage.css'
import useGetFilePath from "../../hooks/useGetFilePath"
import { useGetAllRecipesQuery, useGetAllRecipesShowQuery, useGetLatestRecipesQuery } from "../../features/recipes/RecipeApiSlice"
import { useEffect, useState } from "react"
function FirstPage() {
  const { data: categories, isError, isLoading, isSuccess, error } = useGetAllCategoriesQuery()
  const { data: recipes, isError: iserrorr, isLoading: isloadingr, error: errorr } = useGetLatestRecipesQuery()
  // const [recipesshow, setrecipesshow] = useState([])
  const { getFilePath } = useGetFilePath()
  
  if (isLoading) return <h1>loading categories</h1>
  if (isError) return <div>משהו קרה בצד שלנו...</div>
  // if (isloadingr) return <h1>loading recipes</h1>
  if (iserrorr) return <div>משהו קרה בצד שלנו...</div>

  
  
  return (

    <div className="first-page-container-home">

      {/* זה דיו לכל הקטגוריות */}
      <div className="categories-container-home">
        {
          categories.data?.map(cat => {

            return (
              <div className="single-category-home-container">
                <div className="single-category-home" >
                  <NavLink to={`/client/category/${cat._id}`} >
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
      {recipes&&<div className="new-recipes-all">
      <div className="new-recipes-title">מתכונים חדשים:</div>
      <div className="new-recipes-container-home">
        
        {
          recipes.data?.map(rec => {

            return (
              <div className="single-recipe-home-container">
                <div className="single-recipe-home" >
                  <NavLink to={`/client/category/${rec.category}/${rec._id}`} >
                    <div className="single-recipe-img-container-home">
                      <img src={getFilePath(rec.imgurl)} />
                    </div>
                    {rec.name}

                  </NavLink>

                </div>
              </div>
            )
          })
        }
      </div>
      </div>}
    </div>

  )
}

export default FirstPage