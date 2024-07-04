import { NavLink, useParams } from 'react-router-dom'
import { useGetAllCategoriesQuery } from '../../categories/categoryApiSlice'
import { useGetAllRecipesQuery, useGetAllRecipesShowQuery } from '../RecipeApiSlice'
import useGetFilePath from '../../../hooks/useGetFilePath'
import "./category-main-page.css"
import useAuth from '../../../hooks/useAuth'
const CategoryMainPagec = () => {
    const { isAdmin, username } = useAuth()
    const { catid } = useParams()
    const { getFilePath } = useGetFilePath()
    const { data, isError, isLoading, isSuccess } = useGetAllCategoriesQuery()
    const { data: datar, isError: iserrorr, isLoading: isloadingr } = useGetAllRecipesShowQuery()
    if (isLoading) return
    if (isError) return <h1>משהו קרה בצד שלנו...</h1>
    if (isloadingr) return
    if (iserrorr) return <h1>משהו קרה בצד שלנו...</h1>

    const category = data.data?.find(c => c._id === catid)
    const recipes = datar.data?.filter(r => r.category.find(c => c._id === catid))
    // כאן צריך להיות מיון לפי תאריך ולהציג רק 4 ראשונים
    const newRecipes = recipes
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

            <div className='all-recipes-container-client'>
                {/* דיו לכל המתכונים */}
                <div className='recipes-sub-container-client'>
                {recipes.length === 0 && <h1> אין מתכונים בקטגוריה זו </h1>}

                    {
                        newRecipes.map(rec => {
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
                        })
                    }
                </div>

                {/*  דיו לכל המתכונים החדשים*/}
                <div className='new-recipes-container-client'>
                
                    {recipes.length != 0 && <div>מתכונים חדשים בקטגוריה זו:</div>}
                    <div className='new-recipes-sub-container-client'>
                        {
                            recipes.map(rec => {
                                return (
                                    <div className='new-single-recipe-container-client'>
                                        <NavLink to={`/client/categoty/${catid}/${rec._id}`}>
                                            <div className='new-single-recipe-img-container-client'>
                                                <img src={getFilePath(rec.imgurl)} />
                                            </div>
                                            {rec.name}
                                        </NavLink>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoryMainPagec