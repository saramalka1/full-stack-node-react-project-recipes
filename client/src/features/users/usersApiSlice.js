import apiSlice from "../../app/apiSlice";


const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getAllUsers: build.query({
            query: () => ({
                url: "/api/users"
            }),
            providesTags:['users']
        }),
        createNewUser:build.mutation({
            query:(user)=>({
                url:'/api/users',
                method:'POST',
                body:user
            }),
            invalidatesTags:['users']
        }),
        updateUser:build.mutation({
            query:(user)=>({
                url:'/api/users',
                method:"PUT",
                body:user
            }),
            invalidatesTags:['users']
        }),
       
        deleteUser:build.mutation({
            query:(id)=>({
                url:`/api/users/${id}`,
                method:"PUT"
            }),
            invalidatesTags:['users']
        })
    })

})

export const {useGetAllUsersQuery,
useCreateNewUserMutation,
useUpdateUserMutation,
useDeleteUserMutation
}=userApiSlice