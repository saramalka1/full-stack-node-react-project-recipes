import React, { useEffect, useState } from 'react'
import "./single-recipec.css"
import { useGetAllRecipesShowQuery, useGetRecipeByIdMutation } from '../RecipeApiSlice'
import { useParams } from 'react-router-dom'
import useGetFilePath from '../../../hooks/useGetFilePath'
import { FaClock } from "react-icons/fa"; import { FaConciergeBell } from "react-icons/fa";
import { RxStarFilled } from "react-icons/rx";
import { CgAdidas } from "react-icons/cg"; const SingleRecipec = () => {
    const { recid } = useParams()
    const [getrecipebyid, { data, isSuccess, isLoading, isError }] = useGetRecipeByIdMutation()
    const [recipe, setrecipe] = useState()
    const { getFilePath } = useGetFilePath()
    useEffect(() => {
        if (recid)
            getrecipebyid(recid)
    }, [recid])

    useEffect(() => {
        if (isSuccess && data.data)
            setrecipe(data.data)
    }, [isSuccess, data])

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
                            {
                                recipe.ingredients.map((ing, index) => {
                                    return <div className='single-ingredient'>
                                        {`${index + 1}. ${ing}`}
                                    </div>
                                })
                            }
                        </div>
                        <div className='recipe-instructions-container'>
                            <div className='instructions-title'>הוראות הכנה :</div>
                            {
                                recipe.instructions.map((inst, index) => {
                                    return <div className='single-instruction'>
                                        {`${index + 1}. ${inst}`}
                                    </div>
                                })
                            }
                        </div>
                        <div className='wish'>בהצלחה ובתיאבון !!</div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default SingleRecipec