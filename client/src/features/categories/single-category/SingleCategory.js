import { NavLink, useParams } from 'react-router-dom'
import { useGetAllCategoriesQuery, useUpdateCategoryMutation } from '../categoryApiSlice'
import { useEffect, useState } from 'react'
import { useDeleteRecipeMutation, useGetAllRecipesQuery, useUpdateRecipeAdminMutation, } from '../../recipes/RecipeApiSlice'
import "./single-category.css"
import { Button, Modal } from 'antd';
import useGetFilePath from '../../../hooks/useGetFilePath'
import { IoTrashOutline } from 'react-icons/io5'
import { FaCheck } from 'react-icons/fa'
const SingleCategory = () => {
  const [err, setErr] = useState('')
  const { categoryid } = useParams()
  const { getFilePath } = useGetFilePath()
  const { isError, error, isLoading, isSuccess, data } = useGetAllCategoriesQuery()
  const { isError: isErrorr, error: errorr, isLoading: isLoadingr, isSuccess: isSuccessr, data: datar } = useGetAllRecipesQuery()
  const [updateCategory, { isSuccess: isSuccessu, isError: isErroru, error: erroru }] = useUpdateCategoryMutation()
  const [deleteRecipef,{isSuccess:isSuccessd,isError:isErrord,error:errord}]=useDeleteRecipeMutation()
  const [updateShow, { }] = useUpdateRecipeAdminMutation()
  const [showSuccessUpdate,setshowSuccessUpdate]=useState(false)

  useEffect(()=>{
    if(isSuccessu)
    setshowSuccessUpdate(true)
    setTimeout(()=>{
      setshowSuccessUpdate(false)
    },1000)
  },[isSuccessu])
  
  
  if (isError) return <h3>{JSON.stringify(error)}</h3>
  if (isLoading) return ""
  const category = data.data?.find(c => c._id == categoryid)
  console.log(category);
  if (isErrorr) return <h3>{JSON.stringify(errorr)}</h3>
  if (isLoadingr) return ""

  const recipes = datar.data?.filter(r => r.category.find(c => c._id === categoryid))
  console.log(recipes);
  const formSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    

    updateCategory(data)

  }


  const deleteRecipe = (id) => {
    Modal.confirm({
        title: 'האם אתה בטוח שברצונך למחוק את המתכון?',
        okText: 'אני רוצה למחוק',
        okType: 'danger',
        cancelText: 'ביטול',
        // icon: <ExclamationCircleOutlined className="custom-icon" />,          
              className: 'custom-modal', // קבוצת הסגנון שלי
        okButtonProps: { className: 'custom-ok-button' }, // סגנון הכפתור "מחק"
        cancelButtonProps: { className: 'custom-cancel-button' }, // סגנון הכפתור "בטל"
        onOk() {
            deleteRecipef(id);
        },
        onCancel() {
            console.log('בוטל מחיקת המתכון');
        },
    });
};


  

  
  return (
    <div className='single-category-container'>
      <div className='single-category-properties'>
        <div className='single-category-info'>
          <div className='single-category-img-container'>
            <img src={getFilePath(category.img) || ''} alt='' fill />
          </div>
          {category.name}
        </div>
        <div>
          
          <form onSubmit={formSubmit} className='form-category-properties'>
            <input name="id" defaultValue={category._id} type="hidden" />

            <input name="name" defaultValue={category.name} type="text" required placeholder='שם קטגוריה' />
            <input name="description" defaultValue={category.description ? category.description : ""} type="text" placeholder='תיאור' />
            <input name="img" type="file" placeholder='בחר תמונה' />


            <button >{showSuccessUpdate?<FaCheck />:"שמור שינויים"}</button>
            {err}

          </form>
        </div>
      </div>
      <div className='recipes-in-category-container'>
        <div className='title-and-add-button-container'>
        <h5 className='title-table-recipe'> מתכונים בקטגוריה זו:</h5>
        <NavLink to={'addrecipe'} className={"add-recipe-button"}>הוסף מתכון</NavLink>
        </div>
        <table className='recipes-table'>
          <thead>
            <tr>
              <td>שם</td>
              <td>כמות</td>
              <td>סוג</td>
              <td>זמן הכנה</td>
              <td>מוצג?</td>
              <td>פעולות</td>
            </tr>
          </thead>
          <tbody>
            {recipes.map(recipe => {
              return <tr key={recipe._id}>
                <td className='recipes-list-recipe'>
                  <div className='recipe-name-image'>
                    <img
                      src={getFilePath(recipe.imgurl)}
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
                <td>
<button onClick={()=>deleteRecipe(recipe._id)} className='delete-recipe-button'><IoTrashOutline/></button>
<NavLink to={`/categories/${categoryid}/${recipe._id}/update`} className={"edit-recipe-button"}>עריכה</NavLink>
</td>
              </tr>
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default SingleCategory