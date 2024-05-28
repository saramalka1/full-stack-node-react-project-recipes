import { useNavigate, useParams } from "react-router-dom"
import { useGetAllUsersQuery, useUpdateUserMutation } from "../usersApiSlice";
import { useEffect, useState } from "react";
import "./single-user.css"
const SingleUser = () => {
  const { userid } = useParams()
  const { data: users, isError, isLoading, error } = useGetAllUsersQuery()
  const [updateUser, { isSuccess: isUpdateSuccess }] = useUpdateUserMutation()
  const [err,setErr]=useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (isUpdateSuccess)
      navigate("/users")
  }, [isUpdateSuccess])

  const formSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    const userObj = Object.fromEntries(data.entries())
    if (!userObj.name||!userObj.email){
      setErr("שם ומייל הינם שדות חובה.")
      return
    }
    
    updateUser(userObj)
    
  }

  const resetErr=(e)=>{
      if(e.target.value)
      setErr('')
  }

  if (isLoading) return
  if (isError) return <h3>{JSON.stringify(error)}</h3>

  const user = users.data.find(u => u._id === userid)
  if (!user) return <h2>Not Found</h2>
  return (
    
      
        <div className="single-user-form-container">
          <form className="single-user-form" onSubmit={formSubmit}>
            <input name="id" defaultValue={user._id} type="hidden" />
            <label>שם משתמש</label>
            <input readOnly={true} type="text" name="username" defaultValue={user.username} />

            <label>שם מלא</label>
            <input type="text" name="name" placeholder="שם מלא" defaultValue={user.name} onChange={resetErr}/>

            <label>מייל</label>
            <input type="email" name="email" placeholder="מייל " defaultValue={user.email} onChange={resetErr}/>

            <label>טלפון</label>
            <input type="text" name="phone" placeholder="טלפון " defaultValue={user.phone} />
            <label>הרשאה</label>
            <select name="roles" id="roles" >
              <option value="ADMIN" selected={user.roles === "ADMIN"}>מנהל</option>
              <option value="USER" selected={user.roles === "USER"}>משתמש</option>
            </select>

            <label>פעיל?</label>
            <select name="active" id="active" >
              <option value={true} selected={user.active}>כן</option>
              <option value={false} selected={!user.active}>לא</option>
            </select>
            <h5 className="err">{err}</h5>
            <button >עדכן</button>
          </form>
        </div>
      
    
  )
}

export default SingleUser