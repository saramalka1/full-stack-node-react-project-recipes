import { useSelector } from "react-redux"
import { selectToken } from "./authSlice"
import { useEffect, useRef, useState } from "react"
import { useRefreshMutation } from "./authApiSlice"
import { Outlet } from "react-router-dom"

const CheckLoginNotRequired = () => {
    const token = useSelector(selectToken)
    const effectRan = useRef(false)

    const [trueSuccess, setTrueSuccess] = useState(false)

    const [refresh, {
        isUninitialized,
        isLoading,
        isSuccess,
        isError,
        error
    }] = useRefreshMutation()

    useEffect(() => {
        if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
            const verifyRefreshToken = async () => {
                console.log("verifying refresh token ");
                try {
                    await refresh()
                    setTrueSuccess(true)
                }
                catch (err) {
                    console.log(err);
                }
            }
            if (!token) verifyRefreshToken()
        }
        return () => effectRan.current = true
    }, [])

    let content
    if(isLoading){
        console.log('loading');
        content=<h1>Loading</h1>
    }
    else{
        content=<Outlet/>
    }
    return content
}

export default CheckLoginNotRequired