import { Outlet } from "react-router-dom"
import Navigation from "../navigation/Navigation"
import { MdOutlineCopyright } from "react-icons/md";

import './mainLayout.css'
const MainLayout = () => {
  return (
    <div className="main-layout-container">
      <div className="head">
        <div className="logo">
          ניחוחות
        </div>
        <div className="navigation">
          <Navigation />
        </div>
      </div>
      <div>
        <Outlet />
      </div>
      <div className="footer">
        כל הזכויות שמורות <MdOutlineCopyright/>
      </div>
    </div>
  )
}

export default MainLayout