import { Outlet, useLocation } from "react-router-dom"
import SingleRecipec from "../single-recipec/SingleRecipec"

import './recipe-layoutc.css'
import { useEffect, useState } from "react"
const RecipeLayoutc = () => {
  const location = useLocation()
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    if (location.pathname.includes('update'))
      setIsLoaded(true); // סימון שה-outlet נטען
    else {
      setIsLoaded(false); // סימון שה-outlet לא נטען יותר (אופציונלי)
    }
  }, [location])
  return (
    <div className="single-recipe-layout-container">

      <div className="single-recipe-alwayse">
        <SingleRecipec />
      </div>
      <div className={`update-recipe-outlet${isLoaded ? '.loaded' : ''}`}>
        <Outlet />
      </div>
    </div>
  )
}

export default RecipeLayoutc