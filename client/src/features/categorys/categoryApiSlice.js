import apiSlice from '../../app/apiSlice'


const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getAllCategories: build.query({
            query: () => ({
                url: "/api/category"
            })
        }),
        addCategory: build.mutation({
            query: (category) => ({
                url: '/api/category',
                method: 'POST',
                body: category
            })
        }),
        updateCategory: build.mutation({
            query: (id) => ({
                url: '/api/category',
                method: 'PUT',
                body: id
            })
        }),
        deleteCategory: build.mutation({
            query: (id) => ({
                url: '/api/category',
                method: 'PUT',
                body: id
            })
        })
    })

})

export const { useGetAllCategoriesQuery,
    useAddCategoryMutation,
    useDeleteCategoryMutation,
    useUpdateCategoryMutation } = categoryApiSlice