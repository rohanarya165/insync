import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Link } from "react-router-dom"
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import Modal from "react-modal"

interface Category {
    id: number;
    name: string;
}

const CategoryList: React.FC = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [newCategory, setNewCategory] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [categoryToDelete, setCategoryToDelete] = useState<Category | null>(null);

    useEffect(() => {
        const fetchCategories = async () => {
            const data: Category[] = await fetch('/api/categories').then(res => res.json());
            setCategories(data);
        };
        fetchCategories();
    }, []);

    const handleAddCategory = async () => {
        const newCat: Category = { id: Date.now(), name: newCategory };

        // Add category to the API or local storage
        const createdCat: Category = await fetch('/api/categories', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newCat),
        }).then(res => res.json());

        setCategories([...categories, createdCat]);
        setNewCategory('');
    };

    const handleDeleteCategory = async () => {
        if (categoryToDelete) {
            // Delete category in the API or local storage
            await fetch(`/api/categories/${categoryToDelete.id}`, {
                method: 'DELETE',
            });

            setCategories(categories.filter(cat => cat.id !== categoryToDelete.id));
            setIsModalOpen(false);
        }
    };

    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) return;

        const items = Array.from(categories);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setCategories(items);
    };

    return (
        <div>
            <h1>Category List</h1>
            <Link to="/">Back to Expenses</Link>
            <div>
                <input
                    type="text"
                    value={newCategory}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => setNewCategory(e.target.value)}
                />
                <button onClick={handleAddCategory}>Add Category</button>
            </div>
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="categories">
                    {(provided) => (
                        <ul {...provided.droppableProps} ref={provided.innerRef}>
                            {categories.map((category, index) => (
                                <Draggable key={category.id} draggableId={category.id.toString()} index={index}>
                                    {(provided) => (
                                        <li ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                            {category.name}
                                            <button onClick={() => {
                                                setCategoryToDelete(category);
                                                setIsModalOpen(true);
                                            }}>Remove</button>
                                        </li>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </DragDropContext>
            <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
                <h2>Confirm Deletion</h2>
                <p>Are you sure you want to delete this category?</p>
                <button onClick={handleDeleteCategory}>Yes, delete</button>
                <button onClick={() => setIsModalOpen(false)}>Cancel</button>
            </Modal>
        </div>
    );
};

export default CategoryList;
