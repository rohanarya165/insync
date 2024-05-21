import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../app/store'
import { Expense } from '../../components/ExpenseList';

const dummyExpenses: Expense[] = [
  {
    id: 1,
    type: "cash-out",
    category: "Food",
    amount: -50,
    date: "2023-04-15",
    description: "Groceries",
  },
  {
    id: 2,
    type: "cash-in",
    category: "Salary",
    amount: 2000,
    date: "2023-04-25",
    description: "April Salary",
  },
  {
    id: 3,
    type: "cash-out",
    category: "Utilities",
    amount: -100,
    date: "2023-05-05",
    description: "Electric Bill",
  },
  {
    id: 4,
    type: "cash-out",
    category: "Entertainment",
    amount: -75,
    date: "2023-05-12",
    description: "Movies",
  },
];

export const allExpancesListSlice = createSlice({
    name: 'allExpances',
    initialState : dummyExpenses,
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