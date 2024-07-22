import React, { useEffect, useState } from 'react';
import { useAddRecipeMutation } from '../../recipes/RecipeApiSlice';
import useAuth from '../../../hooks/useAuth';
import { useNavigate, useParams } from 'react-router-dom';
import './add-recipe.css'
import { useGetCategoryByIdMutation } from '../categoryApiSlice';

const AddRecipe = () => {
  const { categoryid } = useParams();
  const { isAdmin, isUser, username } = useAuth();
  const [addrecipe, { isSuccess, isError, error }] = useAddRecipeMutation();
  const [getCategoryById,{isSuccess:isSuccesscategory,data:datacategory,isLoading:isLoadingcategory,isError:isErrorcategory}]=useGetCategoryByIdMutation()
  const [ingredients, setIngredients] = useState(['']);
  const [instructions, setinstructions] = useState([''])
  const [categoryName,setcategoryName]=useState('')
  
  const navigate = useNavigate()
  useEffect(() => {
    if (isSuccess) {
      navigate('/categories/' + categoryid)
    }
  }, [isSuccess])
// getCategoryById אם יש כבר את קוד הקטגוריה ניתן להפעיל את הפונקציה
  useEffect(()=>{
    if(categoryid)
      getCategoryById(categoryid)
  },[categoryid])

  useEffect(()=>{
    if(isSuccesscategory)
      setcategoryName(datacategory.data.name)
  },[isSuccesscategory])

  if(isLoadingcategory) return
  if(isErrorcategory) return <h1>משהו קרה בצד שלנו...</h1>
  
  const handle_submit = (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    //הוספת המרכיבים
    ingredients.forEach((ingredient, index) => {
      data.append(`ingredients[${index}]`, ingredient);
    });
    //הוספת ההוראות
    instructions.forEach((instruction, index) => {
      data.append(`instructions[${index}]`, instruction)
    });
    // console.log(data);
    addrecipe(data);
  }

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = value;
    setIngredients(newIngredients);
  }

  const handleInstructionChange = (index, value) => {
    const newInstructions = [...instructions]
    newInstructions[index] = value
    setinstructions(newInstructions)
  }

  const addIngredient = () => {
    setIngredients([...ingredients, '']);
  }

  const addInstruction = () => {
    setinstructions([...instructions, ''])
  }

  const removeIngredient = (index) => {
    const newIngredients = ingredients.filter((_, i) => i !== index);
    setIngredients(newIngredients);
  }

  const removeInstruction = (index) => {
    const newInstructions = instructions.filter((_, i) => i !== index)
    setinstructions(newInstructions)
  }

  return (
    
    <div className='add-recipe-container'>
      <div className='add-title'>הוספת מתכון לקטגוריה : {categoryName}</div>
      <div className='add-recipe-form-container'>
        <form onSubmit={handle_submit} className='add-recipe-form-self'>
          <input name='name' type='text' placeholder='שם המתכון' />
          <input name='description' type='text' placeholder='תיאור' />
          <input name='amount' type='number' placeholder='מספר מנות' />
          <label>            בחר תמונה
          </label>
          <input name='imgurl' type='file' />
          <div className='ingredients-and-instructions-container'>
            {/* המרכיבים */}
            <div className='ingredients-container'>
            {ingredients.map((ingredient, index) => (
              <div key={index} className='ingredient-input'>
                <input
                  type='text'
                  placeholder='שם המרכיב'
                  value={ingredient}
                  onChange={(e) => handleIngredientChange(index, e.target.value)}
                />
                <button type='button' onClick={() => removeIngredient(index)}>x</button>
              </div>
            ))}
            <button type='button' onClick={addIngredient} className='add-ingredient-button'>הוסף מרכיבים</button>
          </div>
          {/* ההוראות הכנה */}
          <div className='instructions-container'>
            {
              instructions.map((instruction, index) => (
                <div key={index} className='instruction-input'>
                  <input
                    type='text'
                    placeholder='הוראת הכנה'
                    value={instruction}
                    onChange={(e) => handleInstructionChange(index, e.target.value)}
                  />
                  <button type='button' onClick={() => removeInstruction(index)}>x</button>
                </div>
              ))

            }

            <button type='button' onClick={addInstruction} className='add-instruction-button'>הוסף הוראות</button>
          </div>
      </div>

      <input name='category' type='hidden' value={categoryid} />

      <select name='type'>
        <option value={'PARVE'}>פרווה</option>
        <option value={'DAIRY'}>חלבי</option>
        <option value={'MEAT'}>בשרי</option>
      </select>

      <select name='level'>
        <option value={'MEDIUM'}>רמת קושי</option>
        <option value={'EASY'}>קל</option>
        <option value={'MEDIUM'}>בינוני</option>
        <option value={'HARD'}>קשה</option>
      </select>

      <input name='preparationtime' type='text' placeholder='זמן הכנה' />
      <div className='send-and-cancel-buttons-container'>
      <button type='submit' className='send-button'>הוסף</button>
      <button type='button' className='send-button' onClick={()=>navigate('/categories/'+categoryid)}>ביטול</button>
      </div>
      { isError && error.data.message}
    </form>
    
      </div >
  
    </div >
    
  )
}

export default AddRecipe
