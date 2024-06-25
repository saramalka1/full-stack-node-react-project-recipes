import { useEffect, useState } from "react"
import { useCreateNewUserMutation } from "../usersApiSlice"
import { useNavigate } from "react-router-dom"
import "./add-user.css"
const AddUser = () => {
    let [addUser,{data:da,isError:addError,isSuccess,error}]=useCreateNewUserMutation()
    const [err,setErr]=useState('')
    const navigate=useNavigate()

    useEffect(()=>{
        if(isSuccess)
        navigate('/users')
    },[isSuccess])
    const submitForm=(e)=>{
        e.preventDefault()
        const data=new FormData(e.target)
        const userObj=Object.fromEntries(data.entries())
        if(!userObj.name||!userObj.username || !userObj.email ||!userObj.password){
          setErr('שם משתמש,סיסמא,שם ומייל הינם שדות חובה.')
          return
        }
       addError= addUser(userObj)
       if(addError){
        setErr("שם משתמש קיים במערכת,נא לבחור שם משתמש יחודי")
        console.log(da)
       }
    
    }
    const resetErr=(e)=>{
      if(e.target.value)
        setErr('')
    }
  return (
    <div className="add-user-container" onSubmit={submitForm}>
        <form className="add-user-form">
        <label>שם משתמש</label>
            <input type="text" placeholder="שם משתמש" name="username" required onChange={resetErr}/>
            <label>סיסמא</label>
            <input type="password" placeholder="סיסמא" name="password" required onChange={resetErr}/>
            <label>שם מלא</label>
            <input type="text" placeholder="שם מלא" name="name" required onChange={resetErr}/>
            <label>מייל</label>
            <input type="email" placeholder="אימייל" name="email" required onChange={resetErr}/>
            <label>טלפון</label>
            <input type="text" placeholder="טלפון" name="phone"/>
            <label>הרשאה</label>
            <select name="roles">
                <option value={'ADMIN'} >מנהל</option>
                <option value={'USER'} selected>משתמש</option>
            </select>
            <label>פעיל?</label>
            <select name="active">
            <option value={true} selected>פעיל</option>
            <option value={false} >לא פעיל</option>
            </select>
            <h5>{err}</h5>
            {error&&error.data.message}
            <button>הוסף</button>
        </form>
    </div>
  )
}

export default AddUser