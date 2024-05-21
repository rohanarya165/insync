import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'

export const allExpancesListSlice = createSlice({
    name: 'allExpances',
    initialState : [],
    reducers: {
        expancesList: (state, action: PayloadAction<any>) => {
           return state = action.payload
        },
    },
})

// Action creators are generated for each case reducer function
export const { expancesList } = allExpancesListSlice.actions

export const selectCountList = (state : RootState) => state.allExpances

export default allExpancesListSlice.reducer