"use client";
import React, { useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { Draggable, Droppable } from "react-beautiful-dnd";
import TodoCard from "./TodoCard";
import { addCard } from "@/services";

const Column = ({ column, title, rows, index }) => {
  const [textFields, setTextFields] = useState([]);
  const [add, setAdd] = useState(false);
  const [currentText, setCurrentText] = useState("");

  const handleAddTextField = () => {
    setTextFields([...textFields, ""]); // Add an empty string to the array
    setAdd(true);
  };

  const handleTextFieldChange = (event, index) => {
    const updatedTextFields = [...textFields];
    updatedTextFields[index] = event.target.value;
    setCurrentText(event.target.value);
    setTextFields(updatedTextFields);
  };

  const handleCardAdd = async () => {
    try {
      const response = await addCard({
        id: currentText,
        activity: currentText,
        createdOn: new Date().toISOString(),
        description:"",
        boardId: "RVqKBADpFoUaXfKSabUX",
        listId: column,
        position: 0,
        status: "pending",
        dueDate: "tmmrw",
      })
    } catch (error) {
      console.log(error);
    }
  }
  console.log('columne', column);

  return (
    <Draggable key={column} draggableId={column} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="md:min-w-[272px] h-[75vh]"
        >
          <Droppable droppableId={index.toString()} type="card">
            {(provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`p-2 rounded-2xl flex flex-col shadow-lg ${
                  snapshot.isDraggingOver ? "bg-pink-300" : "bg-white/50"
                }`}
              >
                <h2 className="capitalize flex justify-between font-bold text-xl p-2">
                  {title}
                  <span className="text-gray-500 bg-gray-200 rounded-full px-2 py-1 text-sm">
                    {rows.length}
                  </span>
                </h2>

                <div className="space-y-2 overflow-y-auto scrollbar-thin max-h-[calc(73vh-100px)]">
                  {rows.map((row, index) => (
                    <Draggable key={row.id} draggableId={row.id} index={index}>
                      {(provided) => (
                        <TodoCard
                          row={row}
                          index={index}
                          id={row.id}
                          innerRef={provided.innerRef}
                          draggableProps={provided.draggableProps}
                          dragHandleProps={provided.dragHandleProps}
                        />
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}
                </div>
                <div className="p-2">
                  {textFields.map((textField, index) => (
                    <div key={index} className="mb-2">
                      <textarea
                        value={textField}
                        onChange={(event) =>
                          handleTextFieldChange(event, index)
                        }
                        className="rounded-lg p-2 border-2 border-gray-300 focus:border-gray-500 focus:outline-none w-full"
                        style={{ resize: "none" }}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  {
                    add &&
                    <button className="bg-black rounded text-white px-2 py-1" onClick={handleCardAdd}>Add</button>
                  }
                  <button onClick={handleAddTextField}>
                    <PlusCircleIcon className="h-10 w-10" />
                  </button>
                </div>
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
};

export default Column;
