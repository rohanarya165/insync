import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { CategoryType } from '../../components/CategoryList'

let dummyCategoryList : Array<CategoryType>  = [
  {
    id: 1,
    name: "Category 1",
  },
  {
    id: 2,
    name: "Category 2",
  },
  {
    id: 3,
    name: "Category 3",
  },
];

export const allCategoryListSlice = createSlice({
    name: 'allCategory',
    initialState: dummyCategoryList,
    reducers: {
        categoryList: (state, action: PayloadAction<any>) => {
           return state = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { categoryList } = allCategoryListSlice.actions

export const selectCategoryList = (state : RootState) => state.allCategory

export default allCategoryListSlice.reducer