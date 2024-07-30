import React from 'react'
import { useDeleteUserMutation, useGetAllUsersQuery } from '../usersApiSlice'
import { Link, useSearchParams } from 'react-router-dom'
import Search from '../../../components/common/search/Search'
import { Button, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

import { IoTrashOutline } from "react-icons/io5";
import "./users-list.css"

const UserList = () => {

    const { data: users, isError, isSuccess, isLoading, error } = useGetAllUsersQuery()
    const [deleteUserf, { error: derror, data: ddata, isSuccess: disSuccess }] = useDeleteUserMutation()
    const [searchParams] = useSearchParams()
    const q = searchParams.get("q")
    if (isLoading)
        return
    if (isError)
        return <h1>Error:{JSON.stringify(error)}</h1>

    
        const deleteUser = (id) => {
            Modal.confirm({
                title: 'האם אתה בטוח שברצונך למחוק את המשתמש?',
                okText: 'אני רוצה למחוק',
                okType: 'danger',
                cancelText: 'ביטול',
                icon: <ExclamationCircleOutlined className="custom-icon" />,                className: 'custom-modal', // קבוצת הסגנון שלי
                okButtonProps: { className: 'custom-ok-button' }, // סגנון הכפתור "מחק"
                cancelButtonProps: { className: 'custom-cancel-button' }, // סגנון הכפתור "בטל"
                onOk() {
                    deleteUserf(id);
                },
                onCancel() {
                    console.log('בוטל מחיקת המשתמש');
                },
            });
        };
    // const deleteUser = (id) => {
    //     if (window.confirm("האם אתה בטוח שברצונך למחוק את המשתמש?")) {
    //         deleteUserf(id)
    //     }
    // }
    const filteredData = !q ? [...users.data] : users.data.filter(user => (user.name.indexOf(q) > -1) || (user.email.indexOf(q) > -1))

    return (
        <div className='users-list'>
            <div className='users-list-top'>
                <Search placeholder="חפש משתמש" className={'search-user'}/>
                <Link to='/users/add' className="users-list-add-button">
                    הוסף משתמש
                </Link>
            </div>
            <table className='users-list-table'>
                <thead>
                    <tr>
                        <td>שם משתמש</td>
                        <td>שם</td>
                        <td>מייל</td>
                        <td>טלפון</td>
                        <td>פעיל</td>
                        <td>הרשאה</td>
                        <td>נוצר ב</td>
                        <td>פעולות</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        filteredData.map(user => {
                            return (
                                <tr key={user._id}>
                                    <td>{user.username}</td>
                                    <td><div className="users-list-user">{user.name}</div></td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.active ? 'כן' : "לא"}</td>
                                    <td>{user.roles === "ADMIN" ? "מנהל" : "משתמש"}</td>
                                    <td>{user.createdAt?.toString().slice(4, 16)}</td>

                                    <td>
                                        <div className='users-list-buttons'>
                                            <Link className='users-list-button users-list-view' to={`/users/${user._id}`}>
                                                צפייה
                                            </Link>
                                            <button onClick={() => deleteUser(user._id)} className='users-list-button users-list-delete'>
                                                <IoTrashOutline/>
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