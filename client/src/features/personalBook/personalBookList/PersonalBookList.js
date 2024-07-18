
import { NavLink } from 'react-router-dom'
import useAuth from '../../../hooks/useAuth'
import { useDeletefromPBookMutation, useGetPBookQuery } from '../personalBookApiSlice'
import './personal-book.css'
import useGetFilePath from '../../../hooks/useGetFilePath'
const PersonalBookList = () => {
    const { username } = useAuth()
    const { data, isLoading, isError, error } = useGetPBookQuery()
    const [deleteFromBook,{isError:isErrord,isSuccess:isSuccessd,error:errord}]=useDeletefromPBookMutation()
    const { getFilePath } = useGetFilePath()

    const deleteClick=(objId)=>{
        deleteFromBook({objId:objId})
    }
    if (isLoading) return
    //אם יש משתמש רשום,אז תבדוק אם יש שגיאה כלשהיא
    //אם אין עכשיו משתמש רשום אז ודאי יהיה שגיאה 
    // כי אין לו אופציה להשתמש בפונקציית הבאת הנתונים כי זה לא יעבור במידלווייר
    //אבל בגלל שאני רוצה שיהיה לו אופציה להכנס לדף 
    //אז כשאני עוברת בלולאה על כל המתכונים
    //הוספתי סימן שאלה על הדאטה
    //כלומר שאם אין דאטה-אז הוא לא עובר על המתכונים
    //וכך-מצד אחד זה לא יציג את השגיאה כי כתבתי שרק אם יש שם משתמש רק אז הוא בודק אם יש שגיאה לא צפויה
    //-וכך הוא יכול להכנס לדף אפילו שהוא לא רשום
    // אבל לא תהיה בעיה במעבר על המתכונים כי אם אין דאטה הוא לא יעבור
    if (username && isError) return <h1>{error.data.message}</h1>
    if(isErrord) return <h1>משהו קרה בצד שלנו...</h1>
    return (
        <div className='pbook-main-container'>
            <div className='pbook-main-sub-container'>
                <div className='pbook-main-head-container'>
                    <div className='pbook-main-head-title'>
                        מתכונים שמורים
                    </div>
                    <div className='pbook-main-head-sub-title'>
                        כאן תוכלו לראות את המתכונים ששמרתם . יש להתחבר למערכת כדי לראות את המתכונים ששמרתם וכדי להוסיף מתכונים נוספים.
                    </div>
                </div>
                <div className='pbook-main-all-recipes-container'>
                    {/* אם יש משתמש אבל אין לו עדיין מתכונים שמורים */}
                    {username && !data?.data && <h1>אין מתכונים שמורים</h1>}
                    {
                        data?.data?.map(pb =>
                            <div className='single-obj-in-pbook-main-container'>
                                <div className='single-obj-in-pbook-main-sub-container'>
                                    <NavLink to={`/client/pbook/${pb._id}`}>
                                        <div className='single-recipe-in-pbook-img-container'>
                                            <img src={getFilePath(pb.recipe.imgurl)} />
                                        </div>
                                        {pb.recipe.name}
                                    </NavLink>
                                    <div className="delete-icon" onClick={() => deleteClick(pb._id)}>
                                        <span className="delete-icon-text">×</span>
                                        <span className="tooltip-text">מחיקה</span>
                                    </div>
                                </div>

                            </div>)
                    }
                </div>
            </div>
        </div>
    )
}

export default PersonalBookList