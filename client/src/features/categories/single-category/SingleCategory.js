import { useParams } from 'react-router-dom'
import { useGetAllCategoriesQuery, useUpdateCategoryMutation } from '../categoryApiSlice'
import { useState } from 'react'
import { useGetAllRecipesQuery, useUpdateRecipeAdminMutation } from '../../recipes/RecipeApiSlice'
import "./single-category.css"
const SingleCategory = () => {
  const [err, setErr] = useState('')
  const { categoryid } = useParams()
  const { isError, error, isLoading, isSuccess, data } = useGetAllCategoriesQuery()
  const { isError: isErrorr, error: errorr, isLoading: isLoadingr, isSuccess: isSuccessr, data: datar } = useGetAllRecipesQuery()
  const [updateCategory, { isSuccess: isSuccessu, isError: isErroru, error: erroru }] = useUpdateCategoryMutation()
  const [updateShow, { }] = useUpdateRecipeAdminMutation()
  if (isError) return <h3>{JSON.stringify(error)}</h3>
  if (isLoading) return ""
  const category = data.data?.find(c => c._id == categoryid)

  if (isErrorr) return <h3>{JSON.stringify(errorr)}</h3>
  if (isLoadingr) return ""

  const recipes = datar.data?.filter(r => r.category.indexOf(categoryid) > -1)
  const formSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    const categoryObj = Object.fromEntries(data.entries())
    if (!categoryObj.name || !categoryObj.img) {
      setErr("חובה למלא שם ותמונה")
      return
    }

    updateCategory(categoryObj)

  }

  const resetErr = (e) => {
    if (e.target.value)
      setErr('')
  }
  return (
    <div className='single-category-container'>
      <div className='category-properties'>
        <h3 className='category-title'>{category.name}</h3>
        <form onSubmit={formSubmit} className='form-category-properties'>
          <input name="id" defaultValue={category._id} type="hidden" />

          <input name="name" defaultValue={category.name} type="text" required placeholder='שם קטגוריה' onChange={resetErr} />
          <input name="description" defaultValue={category.description ? category.description : ""} type="text" placeholder='תיאור' onChange={resetErr} />
          <input name="img" type="text" defaultValue={"p.PNG"} required placeholder='בחר תמונה' onChange={resetErr} />


          <button>שמור שינויים</button>
          {err}

        </form>
      </div>
      <div className='recipes-in-category-container'>
        <h5 className='title-table-recipe'>מתכונים בקטגוריה זו-</h5>
        <table className='recipes-table'>
          <thead>
            <tr>
              <td>שם</td>
              <td>כמות</td>
              <td>סוג</td>
              <td>זמן הכנה</td>
              <td>מוצג?</td>
            </tr>
          </thead>
          <tbody>
            {recipes.map(recipe => {
              return <tr key={recipe._id}>
                <td className='recipes-list-recipe'>
                  <div className='recipe-name-image'>
                    <img
                      src=''
                      width={40}
                      height={40}
                    className='recipe-img'
                    />
                    {recipe.name}

                  </div>
                </td>
                <td>
                  {recipe.amount}

                </td>

                {recipe.type === "PARVE" ? <td>פרווה</td> : "DAIRY" ? <td>חלבי</td> : <td>בשרי</td>}

                <td>
                  {recipe.preparationtime}
                </td>
                <div className='show-td'>
                  {recipe.show ? <td>כן</td> : <td>לא</td>}
                  <button className="change-show" onClick={() => updateShow({ id: recipe._id, show: !recipe.show })}>החלף</button>
                </div>

              </tr>
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SingleCategory