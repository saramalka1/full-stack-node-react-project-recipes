import React from 'react'
import { Outlet } from 'react-router-dom'
import CategoryMainPagec from '../category-main-page/CategoryMainPagec'

const CategoryLayoutc = () => {
    return (
        <div>
            <div>
                <Outlet />
            </div>
            <div>
                <CategoryMainPagec />
            </div>
        </div>
    )
}

export default CategoryLayoutc