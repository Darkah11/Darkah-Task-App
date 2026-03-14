"use client";
import React, { useReducer, useState } from "react";
import Modal from "./Modal";
import { createBoard, editBoard } from "../_lib/firebase";
import { BoardWithId } from "../_types/Board";
import { useRouter } from "next/navigation";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string | undefined;
  isEditing?: boolean;
  board?: BoardWithId | null;
}

export default function CreateBoard({
  isOpen,
  onClose,
  userId,
  isEditing,
  board,
}: ModalProps) {
  const [boardName, setBoardName] = useState((board && board.title) || "");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCreateBoard = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();

    if (boardName === "") {
      alert("Input board name");
    } else {
      setLoading(true);
      await createBoard(boardName, userId);
      alert("Board successfully created");
      setBoardName("");
      setLoading(false);
      onClose();
      router.refresh();
    }
  };
  const handleEditBoard = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();

    if (boardName === "") {
      alert("Input board name");
    } else if (board) {
      setLoading(true);
      await editBoard(boardName, userId, board.id);
      alert("Board successfully edited");
      setBoardName("");
      setLoading(false);
      onClose();
      router.refresh();
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-semibold mb-4">Add New Board</h2>
      {/* <form onSubmit={handleSignIn} className="mt-8"> */}
      <form className="">
        <div>
          <label htmlFor="board-name">Board Name</label>
          <input
            id="board-name"
            name="board-name"
            type="text"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
            className="mt-1 bg-app-card outline-none block w-full rounded-md border border-app-gray/30 p-2 shadow-sm focus:border-app-primary focus:ring-app-primary"
            placeholder="Enter your board name"
          />
        </div>
      </form>
      <button
        onClick={(e) => (isEditing ? handleEditBoard(e) : handleCreateBoard(e))}
        className="mt-4 bg-app-primary w-full p-2 rounded text-white font-medium"
      >
        {loading ? "loading..." : isEditing ? "Edit Board" : "Create New Board"}
      </button>
    </Modal>
  );
}
