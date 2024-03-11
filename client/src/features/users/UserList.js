import React from 'react'
import { useDeleteUserMutation, useGetAllUsersQuery } from './usersApiSlice'
import { Link } from 'react-router-dom'
const UserList = () => {

    const { data: users, isError, isSuccess, isLoading, error } = useGetAllUsersQuery()
    const [deleteUserf,{error:derror,data:ddata}]=useDeleteUserMutation()
    if (isLoading)
        return
    if (isError)
        return <h1>Error:{JSON.stringify(error)}</h1>

        const deleteUser=(id)=>{
                if(window.confirm("האם אתה בטוח שברצונך למחוק את המשתמש?")){
                    deleteUserf(id)
                }
        }
    return (
        <div className='user-list'>
            <div className='user-list-top'>
                
                <Link to='/users/add' className="users-list-add-button">
                    הוסף משתמש
                </Link>
            </div>
            <table className='users-list-table'>
                <thead>
                    <tr>
                        <td>שם</td>
                        <td>פעיל</td>
                        <td>מייל</td>
                        <td>טלפון</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.data?.map(user => {
                            return(
                            <tr key={user._id}>
                                <td>{user.name}</td>
                                <td>{user.active ? 'פעיל' : "לא פעיל"}</td>
                                <td>{user.email}</td>
                                <td>{user.phone}</td>
                                <td>
                                    <div className='users-list-buttons'>
                                        <Link to={`/users/${user._id}`}>
                                            צפייה
                                        </Link>
                                        <button onClick={()=>deleteUser(user._id)}className='users-list-button users-list-delete'>
                                            מחיקה
                                        </button>
                                    </div>
                                </td>
                            </tr>)
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default UserList