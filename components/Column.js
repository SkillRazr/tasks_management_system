import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { Draggable, Droppable } from "react-beautiful-dnd";
import TodoCard from "./TodoCard";

const Column = ({ column, rows, index }) => {
  return (
    <Draggable draggableId={column} index={index}>
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
                  {column}
                  <span className="text-gray-500 bg-gray-200 rounded-full px-2 py-1 text-sm">
                    {rows.length}
                  </span>
                </h2>

                <div className="space-y-2 overflow-y-auto scrollbar-thin max-h-[calc(73vh-100px)]">
                  {rows.map((row, index) => (
                    <Draggable key={index} draggableId={row} index={index}>
                      {(provided) => (
                        <TodoCard
                          row={row}
                          index={index}
                          id={row}
                          innerRef={provided.innerRef}
                          draggableProps={provided.draggableProps}
                          dragHandleProps={provided.dragHandleProps}
                        />
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}

                </div>
                <div className="flex items-end justify-end p-2">
                    <button>
                      <PlusCircleIcon className="h-10 w-10"/>
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
