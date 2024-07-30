import './personal-pbook-item.css'
import { useParams } from 'react-router-dom'
import useGetFilePath from '../../../hooks/useGetFilePath'
import { FaCheck, FaClock, FaConciergeBell } from "react-icons/fa"; 
import { CgAdidas } from "react-icons/cg";
import useAuth from '../../../hooks/useAuth'
import { useGetPBookItemMutation, useUpdateCommentMutation } from '../../personalBook/personalBookApiSlice'
import { useEffect, useState } from 'react';
import { RxStarFilled } from 'react-icons/rx';

const PersonalPBookItem = () => {
    const { isAdmin, _id } = useAuth()
    const { objid } = useParams()
    const [issaved,setissaved]=useState(false)
    const [getPBookItem, { data, isSuccess, isLoading, isError, error }] = useGetPBookItemMutation()
    const [updateComment, { isError: isErroru, error: erroru,isSuccess:isSuccessu }] = useUpdateCommentMutation()
    const [recipeobj, setRecipeobj] = useState()
    const [doneIngredients, setDoneIngredients] = useState({})
    const [doneInstructions, setDoneInstructions] = useState({})
    const [comment, setComment] = useState('')

    const { getFilePath } = useGetFilePath()

    useEffect(() => {
        if (objid) getPBookItem(objid)
    }, [objid])

    useEffect(() => {
        if (isSuccess && data.data) {
            setRecipeobj(data.data)
            setComment(data.data.comment)
        }
    }, [isSuccess, data])

    useEffect(()=>{
        if(isSuccessu)
            setissaved(true)
    },[isSuccessu])

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

    const updateCommentClick = () => {
        updateComment({ objId:objid, comment })
        
        setTimeout(() => {
            setissaved(false); 
        }, 1000);
    }

    if (isError || isErroru) return <h1>משהו קרה בצד שלנו...</h1>
    if (isLoading) return null
    if (!recipeobj) return null

    return (
        <div className='pb'>
            <div className='pbook-item'>
                <div className='single-recipec-page-container'>
                    <div className='single-recipec-page-sub-container'>
                        <div className='recipe-head-container'>
                            <div className='recipe-head-info'>
                                <div className='recipe-name-and-description'>
                                    <div className='recipe-name'>{recipeobj.recipe.name}</div>
                                    <div className='recipe-description'>{recipeobj.recipe.description}</div>
                                </div>
                                <div className='recipe-from-and-date'>
                                    <div className='recipe-from'>{`מאת:${recipeobj.recipe.writeruser.name} `}</div>
                                    <div className='recipe-date'>{` בתאריך :(${recipeobj.recipe.createdAt}) `}</div>
                                </div>
                            </div>
                            <div className='recipe-head-img-container'>
                                <img src={getFilePath(recipeobj.recipe.imgurl)} alt='Recipe' />
                            </div>
                        </div>
                        <div className='recipe-icons-ingredientd-and-instructions-container'>
                            <div className='recipe-time-count-type-level-container'>
                                <div className='time-container'>
                                    <FaClock className='icon' />
                                    <div>{recipeobj.recipe.preparationtime}</div>
                                </div>
                                <div className='count-container'>
                                    <FaConciergeBell className='icon' />
                                    <div>{`${recipeobj.recipe.amount} מנות`}</div>
                                </div>
                                <div className='type-container' id={recipeobj.recipe.type}>
                                    <RxStarFilled className='icon' />
                                    {recipeobj.recipe.type === 'PARVE' && 'פרווה'}
                                    {recipeobj.recipe.type === 'DAIRY' && 'חלבי'}
                                    {recipeobj.recipe.type === 'MEAT' && 'בשרי'}
                                </div>
                                <div className='level-container' id={recipeobj.recipe.level}>
                                    <CgAdidas className='icon' />
                                    {recipeobj.recipe.level === 'HARD' && 'קשה'}
                                    {recipeobj.recipe.level === 'EASY' && 'קל'}
                                    {recipeobj.recipe.level === 'MEDIUM' && 'בינוני'}
                                </div>
                            </div>
                            <div className='recipe-ingredients-and-instructions'>
                                <div className='recipe-ingredients-container'>
                                    <div className='ingredients-title'>אז מה צריך :</div>
                                    {recipeobj.recipe.ingredients.map((ing, index) => (
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
                                    {recipeobj.recipe.instructions.map((inst, index) => (
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
                            </div>
                            <div className='comment-container'>
                                <div className='comment-title'>ההערות שלי:</div>
                                <textarea
                                    className='comment-textarea'
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                />
                                <button className='save-button' onClick={updateCommentClick}>{issaved ? <FaCheck /> : 'שמור שינויים'} </button>
                            </div>
                            <div className='wish-and-actions'>
                                <div className='wish'>
                                    בתיאבון !
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PersonalPBookItem
