import apiSlice from "../../app/apiSlice";

const recipeApiSlice = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getAllRecipes: build.query({
            query: () => ({
                url: "/api/recipes"
            }),
            providesTags: ['recipes']
        }),
        getAllRecipesShow: build.query({
            query: () => ({
                url: "/api/recipes/recipesshow"
            }),
            providesTags: ['recipesShow']
        }),
        getLatestRecipes: build.query(
            {
                query: () => ({
                    url: "/api/recipes/latestrecipes"
                }),
                providesTags: ['latestRecipes']
            }
        ),
        getLatestRecipesByCategoryId: build.mutation({
            query: (id) => ({
                url: "/api/recipes/latestrecipesbycategoryid/" + id,
                method: 'GET'
            }),
            providesTags: ['latestRecipesByCategoryId']
        }),
        getRecipeById: build.mutation({
            query: (id) => ({
                url: "/api/recipes/" + id,
                method: 'GET'
            })
        }),
        addRecipe: build.mutation({
            query: (recipe) => ({
                url: "/api/recipes",
                method: "POST",
                body: recipe
            }),
            invalidatesTags: ['recipes', 'latestRecipesByCategoryId', 'latestRecipes', 'recipesShow']
        }),
        //i  use this function (updateRecipeAdmin) for update shoe recipe
        updateRecipeAdmin: build.mutation({
            query: (recipe) => ({
                url: "/api/recipes/adminupdaterecipe",
                method: 'PUT',
                body: recipe
            }),
            invalidatesTags: ['recipes', 'latestRecipesByCategoryId', 'latestRecipes', 'recipesShow']
        }),
        updateRecipeUser: build.mutation({
            query: (recipe) => ({
                url: "/api/recipes/userupdaterecipe",
                method: 'PUT',
                body: recipe
            }),
            invalidatesTags: ['recipes', 'latestRecipesByCategoryId', 'latestRecipes', 'recipesShow']
        }),
        deleteRecipe: build.mutation({
            query: (id) => ({
                url: `/api/recipes/${id}`,
                method: "PUT"
            }),
            invalidatesTags: ['recipes', 'latestRecipesByCategoryId', 'latestRecipes', 'recipesShow']
        })
    })
})

export const { useGetAllRecipesQuery,
    useAddRecipeMutation,
    useUpdateRecipeAdminMutation,
    useUpdateRecipeUserMutation,
    useDeleteRecipeMutation,
    useGetAllRecipesShowQuery,
    useGetLatestRecipesQuery,
    useGetLatestRecipesByCategoryIdMutation,
    useGetRecipeByIdMutation } = recipeApiSlice