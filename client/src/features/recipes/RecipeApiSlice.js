import apiSlice from "../../app/apiSlice";

const recipeApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getAllRecipes: build.query({
            query: () => ({
                url: "/api/recipes"
            }),
            providesTags: ['recipes']
        }),
        addRecipe: build.mutation({
            query: (recipe) => ({
                url: "/api/recipes",
                method: "POST",
                body: recipe
            }),
            invalidatesTags: ['recipes']
        }),
        updateRecipeAdmin: build.mutation({
            query: (recipe) => ({
                url: "/api/recipes/adminupdaterecipe",
                method: 'PUT',
                body: recipe
            }),
            invalidatesTags: ['recipes']
        }),
        updateRecipeUser: build.mutation({
            query: (recipe) => ({
                url: "/api/recipes/userupdaterecipe",
                method: 'PUT',
                body: recipe
            }),
            invalidatesTags: ['recipes']
        }),
        deleteRecipe: build.mutation({
            query: (id) => ({
                url: `/api/recipes/${id}`,
                method: "PUT"
            }),
            invalidatesTags: ['recipes']
        })
    })
})

export const { useGetAllRecipesQuery,
useAddRecipeMutation,
useUpdateRecipeAdminMutation,
useUpdateRecipeUserMutation,
useDeleteRecipeMutation}=recipeApiSlice