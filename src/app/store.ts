import { configureStore } from '@reduxjs/toolkit'
import allExpancesListReducer from '../feature/allExpancesList/allExpancesListSlice'
import allCategoryListReducer from '../feature/allCategoryList/allCategoryListSlice'

export const store = configureStore({
    reducer: {
        allExpances: allExpancesListReducer,
        allCategory: allCategoryListReducer
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch