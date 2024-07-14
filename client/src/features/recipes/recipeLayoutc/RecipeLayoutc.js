import { Outlet } from "react-router-dom"
import SingleRecipec from "../single-recipec/SingleRecipec"
import './recipe-layoutc.css'
const RecipeLayoutc = () => {
  return (
    <div className="single-recipe-layout-container">
       
        <div className="single-recipe-alwayse">
            <SingleRecipec/>
        </div>
        <div className="update-recipe-outlet">
        <Outlet/>
        </div>
    </div>
  )
}

export default RecipeLayoutc