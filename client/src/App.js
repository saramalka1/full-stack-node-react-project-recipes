import './App.css';
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom"
import MainLayout from './components/common/mainLayout/MainLayout';
import FirstPage from './components/first-page/FirstPage';
import UserList from './features/users/userslist/UserList';
import SingleUser from './features/users/userview/SingleUser';
import AddUser from './features/users/addUser/AddUser';
import CategoriesList from './features/categories/list/CategoriesList';

import { AiOutlineHeart } from 'react-icons/ai';
import AddCategory from './features/categories/addCategory/AddCategory';
import SingleCategory from './features/categories/single-category/SingleCategory';


function App() {




  return (
    <div >
      <Router>
        <Routes>
          <Route path='/' element={<MainLayout />}>
            <Route index element={<FirstPage />} />

            <Route path='/recipes'>

              <Route path='/recipes/:catid' element={<h1>categoryLayout</h1>}>
                {/* //כאן אמור להיות אפשרויות להוספת מתכון,מחיקת מתכון,עדכון מתכון ובגלל שאנחנו רוצים כל הזמן ברקע את המתכונים עשיתי לזה לייאוט */}
                <Route path='recipes/:catid/add' element={<h1>add recipe to this category</h1>} />
              </Route>
              <Route path='/recipes/:catid/:recid' element={<h1>recipeLayout</h1>}>
                {/* כל הזמן יראו את המתכון,ויהיה אפשרות להוסיף הערה */}
                <Route path='/recipes/:catid/:recid/addcomment' element={<h1>add comment</h1>} />
              </Route>


            </Route>

            {/* //users-for admin */}
            <Route path='users' element={<Outlet/>}>
              <Route index element={<UserList/>}/>
              <Route path='add' element={<AddUser/>}/>
              <Route path=':userid' element={<SingleUser/>}/>
            </Route>
{/* //categories and recipes-for admin */}
            <Route path='categories' element={<Outlet/>}>
              <Route index element={<CategoriesList/>}/>
              <Route path='add' element={<AddCategory/>}/>
              <Route path=':categoryid' element={<SingleCategory/>}/>
              {/* <Route path=':categoryid/recipes' element={<h1>dfgh!!!</h1>}/> */}
            </Route>

          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
