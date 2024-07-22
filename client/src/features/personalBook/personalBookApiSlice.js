import apiSlice from "../../app/apiSlice";

const personalBookApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getPBook: build.query({
            query: () => ({
                url: '/api/users/pbook'
            }),
            providesTags: ['pbookAllItems']
        }),
        getPBookItem: build.mutation({
            query: (id) => ({
                url: '/api/users/pbook/' + id,
                method: 'GET'
            }),
            providesTags: ['pbookItem']
        }),
        addRecipeToPBook: build.mutation({
            query: (recipeId) => ({
                url: '/api/users/pbook/addrecipetopbook',
                method: 'PUT',
                body: recipeId
            }),
            invalidatesTags: ['pbookAllItems']
        }),
        deletefromPBook: build.mutation({
            query: (objId) => ({
                url: '/api/users/pbook/deleterecipefrombook',
                method: 'PUT',
                body: objId
            }),
            invalidatesTags: ['pbookAllItems']
        }),
        updateComment: build.mutation({
            query: (objIdAndComment) => ({
                url: '/api/users/pbook/updatecomment',
                method: 'PUT',
                body: objIdAndComment
            }),
            invalidatesTags: ['pbookItem', 'pbookAllItems']
        })
    })
})

export const {
    useGetPBookQuery,
    useGetPBookItemMutation,
    useAddRecipeToPBookMutation,
    useUpdateCommentMutation,
    useDeletefromPBookMutation
} = personalBookApiSlice
