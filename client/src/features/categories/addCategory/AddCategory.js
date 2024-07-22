import { useEffect, useState } from "react"
import { useAddCategoryMutation } from "../categoryApiSlice"
import { useNavigate } from "react-router-dom"
import "./addCategory.css"
function AddCategory() {
    const [addCategory,{isSuccess,isError,data:dataAdd}]=useAddCategoryMutation()
    const navigate=useNavigate()
    const [err,seterr]=useState("")
    useEffect(()=>{
        if(isSuccess)
        
        navigate('/categories')
    },[isSuccess])

    const submitForm=(e)=>{
        e.preventDefault()
        const data=new FormData(e.target)
        //const categoryObj=Object.fromEntries(data.entries())
        addCategory(data)
        
        
    }
  return (
    <div className="add-category-container">
        <form onSubmit={submitForm} className="add-category-form-container">
            <label>שם קטגוריה</label>
            <input type="text" name="name" required placeholder="שם הקטגוריה"/>
            <label>תיאור</label>

            <input type="text" name="description" placeholder="תיאור"/>
            <label>תמונה</label>

            <input type="file" name="img" required/>
            <button>הוסף</button>

        </form>
    </div>
    
  )
}

export default AddCategory