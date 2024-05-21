import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

export const allCategoryListSlice = createSlice({
    name: 'allCategory',
    initialState : [],
    reducers: {
        categoryList: (state, action: PayloadAction<any>) => {
           return state = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { categoryList } = allCategoryListSlice.actions

export const selectCountList = (state : RootState) => state.allCategory

export default allCategoryListSlice.reducer