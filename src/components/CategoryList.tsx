import React, { useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import Modal from "react-modal";
import { useSelector, useDispatch } from "react-redux";
import {
  categoryList,
  selectCategoryList,
} from "../feature/allCategoryList/allCategoryListSlice";

export interface CategoryType {
  id: number;
  name: string;
}

const CategoryList: React.FC = () => {
  const [newCategory, setNewCategory] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [categoryToDelete, setCategoryToDelete] = useState<CategoryType | null>(
    null
  );
  const dispatch = useDispatch();
    const count = useSelector(selectCategoryList);
    
  const handleAddCategory = async () => {
    const newCat: CategoryType = { id: Date.now(), name: newCategory };
    dispatch(categoryList([...count, newCat]));
    setNewCategory("");
  };

  const handleDeleteCategory = async () => {
    if (categoryToDelete) {
      dispatch(
        categoryList(count.filter((cat) => cat.id !== categoryToDelete.id))
      );
      setIsModalOpen(false);
    }
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(count);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    dispatch(categoryList(items));
  };

  return (
    <div>
      <div className="p-6 text-center bg-blue-300 relative">
        <h1 className="text-[20px]"> Category List</h1>
      </div>
      <Link to="/">Back to Expenses</Link>
      <div>
        <input
          type="text"
          value={newCategory}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setNewCategory(e.target.value)
          }
        />
        <button onClick={handleAddCategory}>Add Category</button>
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="categories">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {count.map((category, index) => (
                <Draggable
                  key={category.id}
                  draggableId={category.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {category.name}
                      <button
                        onClick={() => {
                          setCategoryToDelete(category);
                          setIsModalOpen(true);
                        }}
                      >
                        Remove
                      </button>
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
