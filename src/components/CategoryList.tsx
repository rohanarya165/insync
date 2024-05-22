import React, { useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import {
  categoryList,
  selectCategoryList,
} from "../feature/allCategoryList/allCategoryListSlice";
import { Button, TextField, Modal, Box } from "@mui/material";

export interface CategoryType {
  id: number;
  name: string;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 5,
  pt: 2,
  px: 4,
  pb: 3,
};

const CategoryList: React.FC = () => {
  const [newCategory, setNewCategory] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [categoryToDelete, setCategoryToDelete] = useState<CategoryType | null>(
    null
  );
  const dispatch = useDispatch();
  const count = useSelector(selectCategoryList);

  const handleAddCategory = async () => {
    if (newCategory.length > 0) {
      const newCat: CategoryType = { id: Date.now(), name: newCategory };
      dispatch(categoryList([...count, newCat]));
      setNewCategory("");
    }
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
        <Link to="/" className="absolute right-[18px] top-[18px]">
          <Button sx={{ textTransform: "none" }} variant="contained">
            Expenses
          </Button>
        </Link>
      </div>
      <div className="flex justify-center mt-4 text-[20px] text-blue-500">
        <div>
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
                          className="flex justify-between p-2 gap-4 flex-wrap border-b-2 border-blue-300"
                        >
                          <div>{category.name}</div>
                          <Button
                            sx={{ textTransform: "none" }}
                            variant="contained"
                            color="error"
                            size="small"
                            onClick={() => {
                              setCategoryToDelete(category);
                              setIsModalOpen(true);
                            }}
                          >
                            Remove
                          </Button>
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
          <div className="flex flex-col	gap-4 mt-4">
            <TextField
              id="outlined-basic"
              label="Enter Category"
              variant="outlined"
              value={newCategory}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewCategory(e.target.value)
              }
            />
            <Button
              sx={{ textTransform: "none" }}
              variant="contained"
              onClick={handleAddCategory}
            >
              Add Category
            </Button>
          </div>
        </div>
      </div>
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, maxWidth: 300 }}>
          <h2 className="text-red-500 text-[20px] font-semibold">Confirm Deletion</h2>
          <p>Are you sure you want to delete this category?</p>
          <div className="flex gap-4 mt-4 justify-between">

          <Button
            sx={{ textTransform: "none" }}
            variant="contained"
            size="small"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
            </Button>
            <Button
              sx={{ textTransform: "none" }}
              variant="contained"
              color="error"
              size="small"
              onClick={handleDeleteCategory}
            >
              Yes, delete
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default CategoryList;
