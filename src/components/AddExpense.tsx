import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useSelector, useDispatch } from 'react-redux'
import { selectCountList } from '../feature/allExpancesList/allExpancesListSlice';

interface Category {
    id: number;
    name: string;
}

const AddExpense: React.FC = () => {
    const [type, setType] = useState<string>('cash-out');
    const [category, setCategory] = useState<string>('');
    const [amount, setAmount] = useState<string>('');
    const [date, setDate] = useState<Date>(new Date());
    const [description, setDescription] = useState<string>('');
    const [categories, setCategories] = useState<Category[]>([]);
    const [buttonClicked, setButtonClicked] = useState("")
    const navigate = useHistory();
    const count = useSelector(selectCountList)

    useEffect(() => {
        const fetchCategories = async () => {
            const data: Category[] = await fetch('/api/categories').then(res => res.json());
            setCategories(data);
        };
        fetchCategories();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newExpense = { type, category, amount: parseFloat(amount), date, description };

        await fetch('/api/expenses', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newExpense),
        });

        navigate.push('/');
    };

    return (
        <div>
            <h1></h1>
            <div className="p-6 text-center bg-blue-300 relative">
                <h1 className="text-[20px]">Add Expense</h1>
            </div>
            <form onSubmit={handleSubmit}>
                <label>
                    Type:
                    <select value={type} onChange={(e) => setType(e.target.value)}>
                        <option value="cash-in">Cash In</option>
                        <option value="cash-out">Cash Out</option>
                    </select>
                </label>
                <label>
                    Category:
                    <select value={category} onChange={(e) => setCategory(e.target.value)}>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.name}>{cat.name}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Amount:
                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
                </label>
                <label>
                    Date:
                    <DatePicker selected={date} onChange={(date : Date) => setDate(date as Date)} />
                </label>
                <label>
                    Description:
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                </label>
                <button type="submit">Add Expense</button>
            </form>
        </div>
    );
};

export default AddExpense;
