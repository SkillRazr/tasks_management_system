import React from "react";

const TodoCard = ({
  row,
  index,
  id,
  innerRef,
  draggableProps,
  dragHandleProps,
}) => {
  return (
    <div
      className="bg-white rounded-md space-y-2 drop-shadow-md"
      {...dragHandleProps}
      {...draggableProps}
      ref={innerRef}
    >
        <div className="flex items-center justify-between p-5">
            <p>{row}</p>
        </div>
    </div>
  );
};

export default TodoCard;
