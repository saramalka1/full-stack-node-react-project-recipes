import { Outlet } from "react-router-dom"
import Navigation from "../navigation/Navigation"
import './mainLayout.css'
const MainLayout = () => {
  return (
    <div className="main-layout-container">
      <div className="head">
        <div className="logo">
          logo
        </div>
        <div className="navigation">
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