"use client";

import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Column from "./Column";
import { PlusIcon } from "@heroicons/react/24/solid";
import { getBoard, postBoard, postList, updateBoard } from "@/services";

export default function Board() {
  const [board, setBoard] = useState();

  const handleAddList = async () => {
    const newListId = `column${Object.keys(lists).length + 1}`;
    setLists((prevLists) => ({
      ...prevLists,
      [newListId]: [], // Initialize the new list with an empty array
    }));
    const res = await postList({
      id: newListId,
      title: newListId,
    });
  };

  useEffect(() => {
    const fetchBoard = async () => {
      const res = await getBoard();
      const board = res.data;
      setBoard(board);
      const lists = {};
      for (const list of board.settings) {
        lists[list.title] = [];
        for (const card of board.cards) {
          if (card.listId === list.id) {
            lists[list.title].push(card);
          }
        }
      }
      setLists(lists);
    };

    fetchBoard();
  }, []);

  const fetchBoard = async (board) => {
    const lists = {};
    for (const list of board.settings) {
      lists[list.title] = [];
      for (const card of board.cards) {
        if (card.listId === list.id) {
          lists[list.title].push(card);
        }
      }
    }
    setLists(lists);
  };

  const [lists, setLists] = useState({});

  const handleOnDragEnd = async (result) => {
    const { destination, source, type } = result;
    // console.log( destination, source, type );

    if (type === "column") {
      const entries = Array.from(board.settings.entries());
      const [removed] = entries.splice(source.index, 1);
      entries.splice(destination.index, 0, removed);
      const rearranged = entries.map(([key, value]) => ({ key, ...value }));
      const b = { ...board, settings: rearranged };
      setBoard(b);
      fetchBoard(b);
      const res = await updateBoard(b)
    }

    try {
      const start = board.settings[Number(source.droppableId)];
      const end = board.settings[Number(destination.droppableId)];
      const startCard = lists[start.title][source.index];
      // const endCard = lists[end.title][destination.index]
      const cards = board.cards;
      const updatedCards = cards.map((card) => {
        if (card === startCard) {
          return { ...card, listId: end.title };
        }
        return card;
      });
  
      const updatedBoard = { ...board, cards: updatedCards };
      setBoard(updatedBoard);
      fetchBoard(updatedBoard);
      const res = await updateBoard(updatedBoard);
    } catch (error) {  
      console.log(error.message);
    }

  };

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
                {Object.entries(lists).map(([column, rows], index) => (
                  <Column
                    key={index}
                    rows={rows}
                    column={column}
                    index={index}
                  />
                ))}
              </div>
              <div className="md:min-w-[300px] mx-3">
                <div className="p-2 rounded-xl shadow-sm bg-white/50 cursor-pointer hover:bg-white/90">
                  <form className="flex">
                    <PlusIcon className="h-6 w-6" onClick={handleAddList} />
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
