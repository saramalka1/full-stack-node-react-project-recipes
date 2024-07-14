

import React, { useEffect, useState } from 'react'
import "./single-recipec.css"
import { useDeleteRecipeMutation, useGetAllRecipesShowQuery, useGetRecipeByIdMutation } from '../RecipeApiSlice'
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom'
import useGetFilePath from '../../../hooks/useGetFilePath'
import { FaClock } from "react-icons/fa"; import { FaConciergeBell } from "react-icons/fa";
import { RxStarFilled } from "react-icons/rx";
import { CgAdidas } from "react-icons/cg";
import useAuth from '../../../hooks/useAuth'
import { Modal } from 'antd'

const SingleRecipec = () => {
    const { isAdmin, _id } = useAuth()
    const { recid ,catid} = useParams()
    
    const [getrecipebyid, { data, isSuccess, isLoading, isError }] = useGetRecipeByIdMutation()
    const [deleteRecipef,{isSuccess:isSuccessd,isError:isErrord,error:errord}]=useDeleteRecipeMutation()

    const [recipe, setrecipe] = useState()
    const [doneIngredients, setDoneIngredients] = useState({})
    const [doneInstructions, setDoneInstructions] = useState({})
    const { getFilePath } = useGetFilePath()
    const location=useLocation()
const navigate=useNavigate()
    useEffect(() => {
        if (recid)
            getrecipebyid(recid)
    }, [recid,location])

    useEffect(() => {
        if (isSuccess && data.data)
            setrecipe(data.data)
    }, [isSuccess, data])

    const handleIngredientClick = (index) => {
        setDoneIngredients(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }))
    }

    const handleInstructionClick = (index) => {
        setDoneInstructions(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }))
    }

    const clickdelete = (id) => {
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
                // navigate(`/client/category/${catid}`)
                //ניווט לעמוד הקודם
                navigate(-1)
            },
            onCancel() {
                console.log('בוטל מחיקת המתכון');
            },
        });
    };

    if (isError)
        return <h1>משהו קרה בצד שלנו</h1>
    if (isLoading) return
    if (!recipe)
        return
    return (
        
        <div className='single-recipec-page-container'>
            
            <div className='single-recipec-page-sub-container'>
                <div className='recipe-head-container'>
                    <div className='recipe-head-info'>
                        <div className='recipe-name-and-description'>
                            <div className='recipe-name'>{recipe.name}</div>
                            <div className='recipe-description'>{recipe.description}</div>
                        </div>
                        <div className='recipe-from-and-date'>
                            <div className='recipe-from'>{`מאת:${recipe.writeruser.name} `}</div>
                            <div className='recipe-date'>{` בתאריך :(${recipe.createdAt}) `}</div>
                        </div>
                    </div>
                    <div className='recipe-head-img-container'>
                        <img src={getFilePath(recipe.imgurl)} />
                    </div>
                </div>
                <div className='recipe-icons-ingredientd-and-instructions-container'>

                    <div className='recipe-time-count-type-level-container'>
                        <div className='time-container'>
                            <FaClock className='icon' />
                            <div>
                                {recipe.preparationtime}
                            </div>
                        </div>
                        <div className='count-container'>
                            <FaConciergeBell className='icon' />
                            <div>
                                {`${recipe.amount} מנות`}
                            </div>
                        </div>
                        <div className='type-container' id={recipe.type}>
                            <RxStarFilled className='icon' />
                            {recipe.type === 'PARVE' && 'פרווה'}
                            {recipe.type === 'DAIRY' && 'חלבי'}
                            {recipe.type === 'MEAT' && 'בשרי'}
                        </div>
                        <div className='level-container' id={recipe.level}>
                            <CgAdidas className='icon' />
                            {recipe.level === 'HARD' && 'קשה'}
                            {recipe.level === 'EASY' && 'קל'}
                            {recipe.level === 'MEDIUM' && 'בינוני'}
                        </div>
                    </div>
                    <div className='recipe-ingredients-and-instructions'>
                        <div className='recipe-ingredients-container'>
                            <div className='ingredients-title'>אז מה צריך :</div>
                            {recipe.ingredients.map((ing, index) => (
                                <div className={`single-ingredient ${doneIngredients[index] ? 'done' : ''}`} key={index}>
                                    <input
                                    className='chekbox-done'
                                        type='checkbox'
                                        checked={doneIngredients[index] || false}
                                        onChange={() => handleIngredientClick(index)}
                                    />
                                    {`${index + 1}. ${ing}`}
                                </div>
                            ))}
                        </div>
                        <div className='recipe-instructions-container'>
                            <div className='instructions-title'>הוראות הכנה :</div>
                            {recipe.instructions.map((inst, index) => (
                                <div className={`single-instruction ${doneInstructions[index] ? 'done' : ''}`} key={index}>
                                    <input
                                        type='checkbox'
                                        checked={doneInstructions[index] || false}
                                        onChange={() => handleInstructionClick(index)}
                                    />
                                    {`${index + 1}. ${inst}`}
                                </div>
                            ))}
                        </div>
                        <div className='wish-and-actions'>
                            {(isAdmin || _id === recipe.writeruser) &&
                                <div className='owner-actions'>
                                    <div><NavLink to={`/client/category/${catid}/${recid}/update`}>עריכה</NavLink></div>
                                    <div onClick={()=>clickdelete(recipe._id)}>מחיקה</div>
                                </div>
                            }
                            <div className='wish'>
                                בתיאבון !
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleRecipec
