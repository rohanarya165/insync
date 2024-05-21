import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface Expense {
    id: number;
    type: string;
    category: string;
    amount: number;
    date: string;
    description: string;
}

interface Category {
    id: number;
    name: string;
}

const EditExpense: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useHistory();
    const [expense, setExpense] = useState<Expense | null>(null);
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const fetchExpense = async () => {
            const data: Expense = await fetch(`/api/expenses/${id}`).then(res => res.json());
            setExpense(data);
        };
        fetchExpense();

        const fetchCategories = async () => {
            const data: Category[] = await fetch('/api/categories').then(res => res.json());
            setCategories(data);
        };
        fetchCategories();
    }, [id]);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setExpense(prevState => prevState ? { ...prevState, [name]: value } : null);
    };

    const handleDateChange = (date: Date) => {
        setExpense(prevState => prevState ? { ...prevState, date: date.toISOString() } : null);
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (expense) {
            await fetch(`/api/expenses/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(expense),
            });
            navigate.push('/');
        }
    };

    const handleDelete = async () => {
        await fetch(`/api/expenses/${id}`, {
            method: 'DELETE',
        });
        navigate.push('/');
    };

    if (!expense) return <div>Loading...</div>;

    return (
        <div>
            <h1>Edit Expense</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Type:
                    <select name="type" value={expense.type} onChange={handleChange}>
                        <option value="cash-in">Cash In</option>
                        <option value="cash-out">Cash Out</option>
                    </select>
                </label>
                <label>
                    Category:
                    <select name="category" value={expense.category} onChange={handleChange}>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.name}>{cat.name}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Amount:
                    <input name="amount" type="number" value={expense.amount} onChange={handleChange} />
                </label>
                <label>
                    Date:
                    <DatePicker selected={new Date(expense.date)} onChange={handleDateChange} />
                </label>
                <label>
                    Description:
                    <input name="description" type="text" value={expense.description} onChange={handleChange} />
                </label>
                <button type="submit">Save</button>
                <button type="button" onClick={() => navigate.push('/')}>Cancel</button>
                <button type="button" onClick={handleDelete}>Delete</button>
            </form>
        </div>
    );
};

export default EditExpense;
