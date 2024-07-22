import apiSlice from "../../app/apiSlice"
import { logout, setToken } from "./authSlice"
const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        register:build.mutation({
            query:(userData)=>({
                url:"/api/auth/register",
                method:"POST",
                body: userData
            })
        }),
        login: build.mutation({
            query: (userData) => ({
                url: "/api/auth/login",
                method: "POST",
                body: userData
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    if (data.accessToken)
                        dispatch(setToken({accessToken:data.accessToken}))
                } catch (err) {
                    console.log("error");
                    console.log(err);
                }
            },
        }),
        sendLogout: build.mutation({
            query: () => ({
                url: "/api/auth/logout",
                method: "POST"
            }),
            async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                    dispatch(logout())
                    setTimeout(() => {
                        dispatch(apiSlice.util.resetApiState())
                    }, 1000)
                } catch (err) {
                    console.log(err);
                }


            },
        }),
        refresh: build.mutation({
            query: () => ({
                url: "api/auth/refresh",
                method: "GET"
            }), async onQueryStarted(args, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    if (data.accessToken)
                        dispatch(setToken({accessToken:data.accessToken}))
                } catch (err) {
                    console.log("error");
                    console.log(err);
                }
            },
        }),
    })
})

export const {useRegisterMutation, useLoginMutation, useSendLogoutMutation, useRefreshMutation} = authApiSlice