import React from 'react'

const AddRecipe = () => {
  return (
    <div className='add-recipe-container'>
      <div className='add-recipe-form-container'>
        <form className='add-recipe-form-self'>
            <input name='name' type='text' placeholder='שם המתכון'/>
            <input name='description' type='text' placeholder='תיאור'/>
            <input name='amount' type='number' placeholder='מספר מנות'/>
            <input name='imgurl' type='file' placeholder='תמונת המתכון'/>
            <input name='ingredients' type='text' placeholder='חומרים'/>
            <input name='instructions' type='text' placeholder='הוראות הכנה'/>
            <input name='writeruser' type='hidden'/>
            <input name='category' type='hidden' />
            <select >
            <option value={'PARVE'}>בחר סוג</option>
              <option value={'DAIRY'}>חלבי</option>
              <option value={'PARVE'}>פרווה</option>
              <option value={'MEAT'}>בשרי</option>
            </select>

            <select >
            <option value={'MEDIUM'}>רמת קושי</option>
              <option value={'EASY'}>קל</option>
              <option value={'MEDIUM'}>בינוני</option>
              <option value={'HARD'}>קשה</option>
            </select>
            <input name='preparationtime' type='text' placeholder='זמן הכנה'/>
<button type='submit'>הוסף</button>
        </form>
        </div>
    </div>
  )
}

export default AddRecipe