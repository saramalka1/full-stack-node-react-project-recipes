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
import LoginPage from './features/auth/login/LoginPage';
import RegisterPage from './features/auth/register/RegisterPage';
import RequireAuth from './features/auth/RequireAuth';
import PersistLogin from './features/auth/PersistLogin';
import AddRecipe from './features/categories/add-recipe/AddRecipe';
import AddRecipec from './features/recipes/add-recipe/AddRecipec';
import CategoryLayoutc from './features/recipes/categoryLayoutc/CategoryLayoutc';
import UpdateRecipe from './features/categories/update-recipe/UpdateRecipe'
import CheckLoginNotRequired from './features/auth/CheckLoginNotRequired';
import RecipeLayoutc from './features/recipes/recipeLayoutc/RecipeLayoutc.js';
import UpdateRecipec from './features/recipes/update-recipec/UpdateRecipec.js';
import PersonalBookList from './features/personalBook/personalBookList/PersonalBookList.js';

function App() {




  return (
    <div >
      {/*   הערה כללית- תיקיית קטגוריה מתייחס יותר למנהל ותיקיית מתכונים יותר למשתמש כדי להפריד-מה ששיך למשתמש הוספתי אות סי בסוף  */}
      <Router>
        <Routes>
          <Route element={<CheckLoginNotRequired />} >
            <Route path='/' element={<MainLayout />}>

              <Route index element={<FirstPage />} />

              {/* כניסה והרשמה */}
              <Route path='/login' element={<LoginPage />} />
              <Route path='/login/register' element={<RegisterPage />} />


              {/* מתכונים למשתמש */}
              {/* מפנה לקטגוריה מסוימת */}
              <Route path='/client/category/:catid' element={<CategoryLayoutc />}>
                {/* אפשרות הוספה לקטגוריה הנוכחית */}
                <Route element={<PersistLogin />} >
                  <Route element={<RequireAuth allowRoles={['ADMIN', 'USER']} />} >
                    <Route path='add' element={<AddRecipec />} />
                  </Route>
                </Route>
              </Route>
              {/* מפנה למתכון מסוים */}
              <Route path='/client/category/:catid/:recid' element={<RecipeLayoutc />}>
                <Route element={<PersistLogin />}>
                  <Route element={<RequireAuth allowRoles={['USER', 'ADMIN']} />}>
                    <Route path='update' element={<UpdateRecipec />} />
                  </Route>
                </Route>
              </Route>
              {/* דפים עבור ספר מתכונים אישי */}

              <Route path='/client/pbook' element={<Outlet />}>
                <Route index element={<PersonalBookList />} />
                <Route element={<PersistLogin />} >
                  <Route element={<RequireAuth allowRoles={['USER', 'ADMIN']} />}>
                    <Route path=':objid' element={<h1>single recipe in pbook </h1>} />
                  </Route>
                </Route>
              </Route>





              <Route element={<PersistLogin />} >
                <Route element={<RequireAuth allowRoles={['ADMIN']} />} >
                  {/* //users-for admin */}
                  <Route path='users' element={<Outlet />}>
                    <Route index element={<UserList />} />
                    <Route path='add' element={<AddUser />} />
                    <Route path=':userid' element={<SingleUser />} />
                  </Route>
                  {/* //categories and recipes-for admin */}
                  <Route path='categories' element={<Outlet />}>
                    <Route index element={<CategoriesList />} />
                    <Route path='add' element={<AddCategory />} />
                    <Route path=':categoryid' element={<SingleCategory />} />
                    <Route path=':categoryid/addrecipe' element={<AddRecipe />} />
                    <Route path=':categoryid/:recipeid/update' element={<UpdateRecipe />} />
                    {/* <Route path=':categoryid/recipes' element={<h1>dfgh!!!</h1>}/> */}
                  </Route>
                </Route>
              </Route>
            </Route>
          </Route>
        </Routes>
      </Router >
    </div >
  );
}

export default App;
