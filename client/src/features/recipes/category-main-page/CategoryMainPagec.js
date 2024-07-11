import { NavLink, useParams, useLocation } from 'react-router-dom'
import { useGetAllCategoriesQuery } from '../../categories/categoryApiSlice'
import { useGetAllRecipesQuery, useGetAllRecipesShowQuery, useGetLatestRecipesByCategoryIdMutation } from '../RecipeApiSlice'
import useGetFilePath from '../../../hooks/useGetFilePath'
import "./category-main-page.css"
import useAuth from '../../../hooks/useAuth'
import { useEffect, useState } from 'react'

const CategoryMainPagec = () => {
    const { isAdmin, username } = useAuth()
    const { catid } = useParams()
    const location = useLocation(); // ייבוא location
    const { getFilePath } = useGetFilePath()
    const { data, isError, isLoading, isSuccess } = useGetAllCategoriesQuery()
    const { data: datar, isError: iserrorr, isLoading: isloadingr } = useGetAllRecipesShowQuery()
    const [getlatestrecipesbyid, { isSuccess: isSuccessl, isLoading: isLoadingl, data: datal, isError: isErrorl, error: errorl }] = useGetLatestRecipesByCategoryIdMutation()
    const [newRecipes, setnewRecipes] = useState([])

    useEffect(() => {
        if (catid) {
            getlatestrecipesbyid(catid);
        }
    }, [catid, location.pathname]); // מעקב אחרי שינויי כתובת

    useEffect(() => {
        if (isSuccessl && datal) {
            setnewRecipes(datal.data)
        }
    }, [isSuccessl, datal])

    if (isLoading) return
    if (isError) return <h1>משהו קרה בצד שלנו...categories</h1>
    if (isloadingr) return
    if (iserrorr) return <h1>משהו קרה בצד שלנו...recipes</h1>
    if (isLoadingl) return
    if (isErrorl) return <h1>{JSON.stringify(errorl)}</h1>

    const category = data.data?.find(c => c._id === catid)
    const recipes = datar.data?.filter(r => r.category.find(c => c._id === catid))

    return (
        <div className='category-page-container-client'>
            <div className='categoy-title-and-description-and-add-button'>
                <div className='categoy-title-and-description'>
                    <div className='category-title'>
                        {category?.name}
                    </div>
                    <div className='category-description'>
                        {category?.description}
                    </div>
                </div>
                <div className='add-recipe-button-client'>
                    {!username && <div>יש לכם מתכון מוצלח שמתאים לקטגוריה זו? <NavLink to={`/login`} className={'a'}>התחברו למערכת ושתפו אותנו!!</NavLink></div>}
                    {username && <div>יש לכם מתכון מוצלח שמתאים לקטגוריה זו ?
                        <NavLink to={`/client/category/${catid}/add`} className={'a'}> שתפו אותנו !!</NavLink>
                    </div>}
                </div>
            </div>
{/* מבחינת התמונות זה מקביל ל-first-page-container-home מהעמוד הראשון */}
            <div className='all-recipes-container-client'>
                {/* זה דיו לכל הקטגוריות */}
                <div className='recipes-sub-container-client'>
                    {recipes.length === 0 && <h1> אין מתכונים בקטגוריה זו </h1>}
                    {recipes.map(rec => {
                        return (
                            <div className='single-recipe-client-container'>
                                <div className='single-recipe-container-client'>
                                    <NavLink to={`/client/categoty/${catid}/${rec._id}`}>
                                        <div className='single-recipe-img-container-client'>
                                            <img src={getFilePath(rec.imgurl)} />
                                        </div>
                                        {rec.name}
                                    </NavLink>
                                </div>
                            </div>
                        )
                    })}
                </div>
{/* new recipes */}
                <div className='new-recipes-container-client'>
                    {recipes.length !=0&&      <div className="new-recipes-title">מתכונים חדשים בקטגוריה :</div>}
                    {/* מקביל ל-new-recipes-container-home בעמוד הראשון */}
                    <div className='new-recipes-sub-container-client'>
                        {newRecipes.map(rec => {
                            return (
                                <div className='new-single-recipe-container-client'>
                                    <div className='single-recipe-client'>
                                    <NavLink to={`/client/categoty/${catid}/${rec._id}`}>
                                        <div className='new-single-recipe-img-container-client'>
                                            <img src={getFilePath(rec.imgurl)} />
                                        </div>
                                        {rec.name}
                                    </NavLink>
                                </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoryMainPagec
