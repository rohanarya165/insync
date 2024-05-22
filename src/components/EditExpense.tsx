import React, { useState, useEffect} from "react";
import { useParams, useHistory } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import {
  expancesList,
  selectCountList,
} from "../feature/allExpancesList/allExpancesListSlice";
import { selectCategoryList } from "../feature/allCategoryList/allCategoryListSlice";
import moment from "moment";
import { Button } from "@mui/material";

const EditExpense: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [category, setCategory] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [description, setDescription] = useState<string>("");
  const [buttonClicked, setButtonClicked] = useState("cash-in");
  const navigate = useHistory();
  const count = useSelector(selectCountList);
  const catCount = useSelector(selectCategoryList);
  const dispatch = useDispatch();

  useEffect(() => {
    count.map((item: any) => {
      if (item.id === Number(id)) {
        setCategory(item.category);
        setAmount(item.amount.toString());
        setDate(new Date(item.date));
        setDescription(item.description);
        setButtonClicked(item.type);
      }
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newExpense = {
      id,
      type: buttonClicked,
      category,
      amount: parseFloat(amount),
      date: moment(date).format("YYYY-MM-DD"),
      description,
    };
    let newData = count.filter((cat) => cat.id !== Number(id));
    dispatch(expancesList([...newData, newExpense]));
    navigate.push("/");
  };

  const handleDelete = async () => {
    dispatch(expancesList(count.filter((cat) => cat.id !== Number(id))));
    navigate.push("/");
  };

  return (
    <div>
      <div className="p-6 text-center bg-blue-300 relative">
        <h1 className="text-[20px]">Add Expense</h1>
        <div
          onClick={handleDelete}
          className="absolute right-[18px] top-[18px]"
        >
          <Button sx={{ textTransform: "none" }} variant="contained">
            Remove
          </Button>
        </div>
      </div>
      <div className="p-16">
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Type:
              <div className="flex w-full rounded-md overflow-hidden cursor-pointer m-2">
                <div
                  className={`w-1/2 text-center p-2 ${buttonClicked === "cash-in"
                      ? "bg-blue-500 text-white"
                      : "bg-blue-300"
                    }`}
                  onClick={() => {
                    setButtonClicked("cash-in");
                  }}
                >
                  Cash-In
                </div>
                <div
                  className={`w-1/2 text-center p-2 ${buttonClicked === "cash-out"
                      ? "bg-blue-500 text-white"
                      : "bg-blue-300"
                    }`}
                  onClick={() => {
                    setButtonClicked("cash-out");
                  }}
                >
                  Cash-Out
                </div>
              </div>
            </label>
          </div>
          <div className="flex justify-center w-full">
            <div>
              <div className="p-4 ">
                <label className="flex gap-4 justify-between">
                  <div>
                    Category:
                  </div>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="p-2 border mx-4 rounded-md"
                  >
                    {catCount.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="p-4 ">
                <label className="flex gap-4 justify-between">
                  <div>
                    Amount:
                  </div>
                  <input
                    type="number"
                    className="p-2 border mx-4 rounded-md"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                </label>
              </div>
              <div className="p-4 ">
                <label className="flex gap-4 justify-between">
                  <div>
                    Date:
                  </div>
                  <DatePicker
                    className="p-2 border mx-4 rounded-md"
                    selected={date}
                    onChange={(date: Date) => setDate(date as Date)}
                  />
                </label>
              </div>
              <div className="p-4 ">
                <label className="flex gap-4 justify-between">
                  <div>
                    Description:
                  </div>
                  <input
                    type="text"
                    className="p-2 border mx-4 rounded-md"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-center w-full">
            <Button
              type="submit"
              sx={{ textTransform: "none" }}
              variant="contained"
            >
              Add Expense
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditExpense;
