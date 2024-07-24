import { Outlet } from "react-router-dom"
import Navigation from "../navigation/Navigation"
import { MdOutlineCopyright } from "react-icons/md";

import './mainLayout.css'
import { CgMenu, CgMenuBoxed } from "react-icons/cg";
const MainLayout = () => {
  return (
    <div className="main-layout-container">
      <div className="head">
        <div className="logo">
          ניחוחות
        </div>
        <div>
        <Navigation className='navigation' />
        </div>
      </div>
      <div>
        <Outlet />
      </div>
      <div className="footer">
        כל הזכויות שמורות <MdOutlineCopyright />
      </div>
    </div>
  )
}

export default MainLayout