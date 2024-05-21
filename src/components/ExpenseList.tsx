import { Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import type { RootState } from "../app/store";
import { useSelector, useDispatch } from "react-redux";
import { expancesList } from "../feature/allExpancesList/allExpancesListSlice";
import { selectCountList } from "../feature/allExpancesList/allExpancesListSlice";

interface Expense {
  id: number;
  type: string;
  category: string;
  amount: number;
  date: string;
  description: string;
}

interface GroupedExpenses {
  [key: string]: Expense[];
}

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

const ExpenseList: React.FC = () => {
  const [groupedExpenses, setGroupedExpenses] = useState<any>({});
  const dispatch = useDispatch();
  dispatch(expancesList(dummyExpenses));
  const count = useSelector(selectCountList);

  useEffect(() => {
      groupByMonth(count);
  }, []);

  const groupByMonth = (expenses: Expense[]) => {
    const grouped = expenses.reduce<GroupedExpenses>((acc, expense) => {
      const month = new Date(expense.date).toLocaleString("default", {
        month: "long",
        year: "numeric",
      });
      if (!acc[month]) {
        acc[month] = [];
      }
      acc[month].push(expense);
      return acc;
    }, {});
    setGroupedExpenses(grouped);
  };

  const calculateMonthlyTotal = (expenses: Expense[]) => {
    return expenses.reduce((total, expense) => total + expense.amount, 0);
  };

  return (
    <div>
      <div className="p-6 text-center bg-blue-300 relative">
        <h1 className="text-[20px]">Expense Tracking</h1>
        <Link to="/add-expense" className="absolute right-[18px] top-[18px]">
          <Button sx={{ textTransform: "none" }} variant="contained">
            Add
          </Button>
        </Link>
      </div>
      {Object.keys(groupedExpenses).length === 0 && <p>No expenses found.</p>}
      <div className="w-full p-16 flex justify-center gap-10 flex-col">
        {Object.keys(groupedExpenses).map((month) => (
          <div
            key={month}
            className={`${
              Number(calculateMonthlyTotal(groupedExpenses[month]).toFixed(2)) >
              0
                ? "text-blue-500"
                : "text-green-500"
            }`}
          >
            <div className="flex justify-between border-b-4 p-2 text-[20px]">
              <div>{month}</div>
              <div>
                Total: $
                {calculateMonthlyTotal(groupedExpenses[month]).toFixed(2)}
              </div>
            </div>
            <ul className="p-4">
              {groupedExpenses[month].map((expense: any) => (
                <li
                  key={expense.id}
                  style={{ color: expense.amount > 0 ? "blue" : "green" }}
                  className="flex justify-between pt-2"
                >
                  <div>{expense.description}:</div>
                  <div>
                    ${expense.amount}
                    <Link className="pl-4" to={`/edit-expense/${expense.id}`}>
                      Edit
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
          </div>
          <div> <Link className="pl-4" to={`/categories`}>
              Category
          </Link></div>
    </div>
  );
};

export default ExpenseList;
