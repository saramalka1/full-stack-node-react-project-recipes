import { NavLink, useParams, useLocation, useSearchParams } from 'react-router-dom'
import { useGetAllCategoriesQuery } from '../../categories/categoryApiSlice'
import { useGetAllRecipesQuery, useGetAllRecipesShowQuery, useGetLatestRecipesByCategoryIdMutation } from '../RecipeApiSlice'
import useGetFilePath from '../../../hooks/useGetFilePath'
import "./category-main-page.css"
import useAuth from '../../../hooks/useAuth'
import { useEffect, useState } from 'react'
import Search from '../../../components/common/search/Search'

const CategoryMainPagec = () => {
    const { isAdmin, username, _id } = useAuth()
    const { catid } = useParams()
    const location = useLocation(); // ייבוא location
    const { getFilePath } = useGetFilePath()
    const { data, isError, isLoading, isSuccess } = useGetAllCategoriesQuery()
    const { data: datar, isError: iserrorr, isLoading: isloadingr } = useGetAllRecipesShowQuery()
    const [getlatestrecipesbyid, { isSuccess: isSuccessl, isLoading: isLoadingl, data: datal, isError: isErrorl, error: errorl }] = useGetLatestRecipesByCategoryIdMutation()
    const [newRecipes, setnewRecipes] = useState([])
    const [searchParams] = useSearchParams()
    const q = searchParams.get('q')
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
    const filteredRecipes = !q ? [...recipes] : recipes.filter(r => r.name.indexOf(q) > -1)
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
<<<<<<< HEAD
                    <div className='search-recipe'>
=======
                    <div>
>>>>>>> e610c7c554dd72914694e2574747fd7c8a406a34
                        <Search placeholder={'חפשו מתכון'} />
                    </div>
                    {!username && <div>יש לכם מתכון מוצלח שמתאים לקטגוריה זו? <NavLink to={`/login`} state={{fromCategoryPage:true,catid}} className={'a'}>התחברו למערכת ושתפו אותנו!!</NavLink></div>}
                    {username && <div>יש לכם מתכון מוצלח שמתאים לקטגוריה זו ?
                        <NavLink to={`/client/category/${catid}/add`} className={'a'}> שתפו אותנו !!</NavLink>
                    </div>}
                </div>
            </div>
            {/* מבחינת התמונות זה מקביל ל-first-page-container-home מהעמוד הראשון */}
            <div className='all-recipes-container-client'>
                {/* זה דיו לכל המתכונים */}
                <div className='recipes-sub-container-client'>
                    {recipes.length === 0 && <h1> אין מתכונים בקטגוריה זו </h1>}
                    {filteredRecipes.map(rec => {
                        return (
                            <div className='single-recipe-client-container'>
                                <div className='single-recipe-container-client'>
                                    <NavLink to={`/client/category/${catid}/${rec._id}`}>
                                        <div className='single-recipe-img-container-client'>
                                            <img src={getFilePath(rec.imgurl)} />
                                        </div>
<<<<<<< HEAD
                                        <div className='rec-name'>{rec.name}</div>
=======
                                        {rec.name}
>>>>>>> e610c7c554dd72914694e2574747fd7c8a406a34
                                    </NavLink>
                                </div>
                            </div>
                        )
                    })}
                </div>
                {/* new recipes */}
                <div className='new-recipes-container-client'>
                    {recipes.length != 0 && <div className="new-recipes-title">מתכונים חדשים בקטגוריה :</div>}
                    {/* מקביל ל-new-recipes-container-home בעמוד הראשון */}
                    <div className='new-recipes-sub-container-client'>
                        {newRecipes.map(rec => {
                            return (
                                <div className='new-single-recipe-container-client'>
                                    <div className='single-recipe-client'>
                                        <NavLink to={`/client/category/${catid}/${rec._id}`}>
                                            <div className='new-single-recipe-img-container-client'>
                                                <img src={getFilePath(rec.imgurl)} />
                                            </div>
<<<<<<< HEAD
                                            <div className='rec-name-new'>{rec.name}</div>
                                            </NavLink>
=======
                                            {rec.name}
                                        </NavLink>
>>>>>>> e610c7c554dd72914694e2574747fd7c8a406a34
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
