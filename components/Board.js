"use client";

import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Column from "./Column";
import { PlusIcon } from "@heroicons/react/24/solid";

export default function Board() {

  const handleAddList = () => {
    const newListId = `column${Object.keys(boards).length + 1}`;
    setBoards((prevBoards) => ({
      ...prevBoards,
      [newListId]: [], // Initialize the new list with an empty array
    }));
  };

    const [boards, setBoards] = useState({

        column1: [
          "This is sentence 1.",
          "Here comes sentence 2.",
          "We have sentence 3.",
          "This is an additional sentence for column 1.",
          "Here comes another sentence for column 1.",
          "Here comes another sentence for column 1.",
          "Here comes another sentence for column 1.",
          "Here comes another sentence for column 1.",
          "We have yet another sentence for column 1."
        ],
        column2: [
          "This is sentence A.",
          "Here comes sentence B.",
          "We have sentence C."
        ],
        column3: [
          "This is sentence True.",
          "Here comes sentence False."
        ],
        column4: [
          "This is sentence X.",
          "Here comes sentence Y.",
          "We have sentence Z."
        ],
        column5: [
          "This is sentence I.",
          "Here comes sentence II.",
          "We have sentence III."
        ],
        column6: [
          "This is sentence Alpha.",
          "Here comes sentence Beta.",
          "We have sentence Gamma."
        ]
      });
      

  useEffect(() => {
    // getBoards()
  }, []);

  const handleOnDragEnd = () => {

  }

  return (
    <div className="boards overflow-x-auto mx-3 scrollbar-thin scrollbar-thumb-zinc-300">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="board" direction="horizontal" type="column">
          {(provided) => (
            <div className="flex flex-col md:flex-row mb-4">
                <div
                className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-3"
                ref={provided.innerRef}
                {...provided.droppableProps}
                >
                {Object.entries(boards).map(([column, rows], index) => (
                    <Column key={index} rows={rows} column={column} index={index}/>
                ))}
                </div>
                <div className="md:min-w-[300px] mx-3">
                    <div className="p-2 rounded-xl shadow-sm bg-white/50 cursor-pointer hover:bg-white/90">
                        <form className="flex">
                            <PlusIcon className="h-6 w-6" onClick={handleAddList}/>
                            <p>Add another list</p>
                        </form>
                    </div>
                </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
