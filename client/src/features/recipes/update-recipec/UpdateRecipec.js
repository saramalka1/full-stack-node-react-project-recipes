import React, { useEffect, useState } from 'react';
import useAuth from '../../../hooks/useAuth';
import { useNavigate, useParams } from 'react-router-dom';
import './update-recipec.css'
import { useAddRecipeMutation, useGetAllRecipesQuery, useGetAllRecipesShowQuery, useUpdateRecipeUserMutation } from '../../recipes/RecipeApiSlice';

const UpdateRecipec = () => {
  const { catid, recid } = useParams();
  const { data: datar, isError: isErrorr, error: errorr, isLoading: isLoadingr, isSuccess: isSuccessr } = useGetAllRecipesShowQuery()
  const { isAdmin, isUser, username } = useAuth();
  const [updateRecipe, { isSuccess, isError, error }] = useUpdateRecipeUserMutation();
  const [recipe, setrecipe] = useState(null)
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setinstructions] = useState([])
  const navigate = useNavigate()
  const initArrays = (rec) => {
    setIngredients(rec.ingredients)
    setinstructions(rec.instructions)
  }
  useEffect(() => {
    if (isSuccess) {
      navigate(-1)
    }
  }, [isSuccess])
  useEffect(() => {
    if (isSuccessr) {
      const temp = datar.data.find(r => r._id === recid)
      setrecipe(temp)

    }
  }, [isSuccessr])

  useEffect(() => {
    if (recipe)
      initArrays(recipe)
  }, [recipe])
  
  if (isLoadingr)
    return
  if (isErrorr)
    return <h1>משהו קרה בצד שלנו...</h1>
  if (!recipe) return


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
    updateRecipe(data);
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
      <div className='add-title'>{`עדכון מתכון : ${recipe.name}`}</div>
      <div className='add-recipe-form-container'>
        <form onSubmit={handle_submit} className='add-recipe-form-self'>
          <label>שם המתכון</label>
          <input name='name' defaultValue={recipe.name} type='text' placeholder='שם המתכון' />
          <input name='id' defaultValue={recid} type='hidden' placeholder='שם המתכון' />

          <label>תיאור</label>
          <input name='description' defaultValue={recipe.description} type='text' placeholder='תיאור' />
          <label>כמות</label>
          <input name='amount' defaultValue={recipe.amount} type='number' placeholder='מספר מנות' />
          <label className='upload-text'>
            <input name='imgurl' type='file' />
            בחר תמונה
          </label>
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

          <input name='category' type='hidden' value={catid} />

          <select name='type'>
            <option value={'PARVE'} selected={recipe.type === 'PARVE'}>פרווה</option>
            <option value={'DAIRY'} selected={recipe.type === 'DAIRY'}>חלבי</option>
            <option value={'MEAT'} selected={recipe.type === 'MEAT'}>בשרי</option>
          </select>

          <select name='level'>
            <option value={'MEDIUM'} >רמת קושי</option>
            <option value={'EASY'} selected={recipe.level === 'EASY'}>קל</option>
            <option value={'MEDIUM'} selected={recipe.level === 'MEDIUM'}>בינוני</option>
            <option value={'HARD'} selected={recipe.level === 'HARD'}>קשה</option>
          </select>

          <input name='preparationtime' defaultValue={recipe.preparationtime} type='text' placeholder='זמן הכנה' />
          <div className='send-and-cancel-buttons-container'>
            <button type='submit' className='send-button'>שמור שינויים</button>
            <button type='button' className='send-button' onClick={() => navigate(-1)}>ביטול</button>
          </div>
          {isError && error.data.message}
        </form>

      </div >

    </div >
  )
}

export default UpdateRecipec
