import { Outlet } from "react-router-dom"
import Navigation from "./Navigation"
import "./layout.css"
const MainLayout = () => {
  return (
    <div className="main-layout-container">
      <div >
        <div>
          logo
        </div>
        <div>
          <Navigation />
        </div>
      </div>
      <div>
        <Outlet />
      </div>
      <div>
        footer
      </div>
    </div>
  )
}

export default MainLayout