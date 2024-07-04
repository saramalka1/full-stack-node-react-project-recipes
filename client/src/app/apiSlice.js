import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import {setToken} from "../features/auth/authSlice"

const baseQuery=fetchBaseQuery({
    baseUrl:"http://localhost:7001",
    credentials:'include',
    prepareHeaders:(headers,{getState})=>{
       
        const token=getState().auth.token
        console.log({"token":token});
        //if(token){
            headers.set("Authorization",`Bearer ${token}`)
       // }
        return headers
    }
})

 const baseQueryWithReauth=async( args,api,extreOptions)=>{
    let result=await baseQuery(args,api,extreOptions)
    // אם הבנתי נכון-זה אומר שאם יש איזושהי בעיה אם הטוקן כלומר-זה בעצם נתקע במידל וייר אז תשלח רפרש-טוקן
    if(result?.error?.status===403){
        console.log("sending refresh token");
        //the new token
        const refreshResult=await baseQuery('/api/auth/refresh',api,extreOptions)
        if(refreshResult?.data){
            api.dispatch(setToken({...refreshResult.data}))
            result=await baseQuery(args,api,extreOptions)
        }
        else{
            if(refreshResult?.error?.status===403){
                //console.log("azr",refreshResult);
                refreshResult.error.data.message=" your login has expired."
                

            }
            return refreshResult
        }
    }
    return result
 } 
const apiSlice = createApi({
    reducerPath: "api",
    baseQuery:baseQueryWithReauth,
    endpoints: () => ({})
})

export default apiSlice