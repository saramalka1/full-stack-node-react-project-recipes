import './App.css';
import { BrowserRouter as Router, Routes, Route, Outlet } from "react-router-dom"
import MainLayout from './components/common/MainLayout';
import FirstPage from './components/first-page/FirstPage';
import UserList from './features/users/UserList';
import UserLayout from './features/users/UserLayout';



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
            <Route path='/users' element={<UserLayout/>}>
              <Route index element={<UserList/>}/>
              <Route path='add' element={<h1>add user</h1>}/>
              <Route path=':userid' element={<h1>single user</h1>}/>
            </Route>

            <Route path='/recipeactions' element={<Outlet/>}>
              <Route index element={<h1>list of links to recipes of categories</h1>}/>
            </Route>

          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
