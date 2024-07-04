import apiSlice from '../../app/apiSlice'


const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getAllCategories: build.query({
            query: () => ({
                url: "/api/category"
            }),
            providesTags:['categories']
        }),
        getCategoryById: build.mutation({
            query: (id) => ({
                url: `/api/category/${id}`,
                method: 'GET',
            }),
            
        }),
        addCategory: build.mutation({
            query: (category) => ({
                url: '/api/category',
                method: 'POST',
                body: category
            }),
            invalidatesTags:['categories']
        }),
        updateCategory: build.mutation({
            query: (id) => ({
                url: '/api/category',
                method: 'PUT',
                body: id
            }),
            invalidatesTags:['categories']

        }),
        deleteCategory: build.mutation({
            query: (id) => ({
                url: `/api/category/${id}`,
                method: 'PUT',
                
            }),
            invalidatesTags:['categories']

        })
    })

})

export const { useGetAllCategoriesQuery,
    useGetCategoryByIdMutation,
    useAddCategoryMutation,
    useDeleteCategoryMutation,
    useUpdateCategoryMutation } = categoryApiSlice