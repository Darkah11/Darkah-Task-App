"use client";
import React, { useState } from "react";
import { MdMoreVert } from "react-icons/md";
import { FaPlus, FaTrash } from "react-icons/fa6";
import { User } from "../_types/User";
import Link from "next/link";
import CreateTask from "./CreateTask";
import { usePathname, useRouter } from "next/navigation";
import { FaEdit } from "react-icons/fa";
import CreateBoard from "./CreateBoard";
import { BoardWithId } from "../_types/Board";
import { deleteBoard } from "../_lib/firebase";

interface MyComponentProps {
  user: null | User;
  board?: BoardWithId | null;
}

export default function Header({ user, board }: MyComponentProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editBoardModal, setEditBoardModal] = useState(false);
  const [moreOption, setMoreOption] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!board || !user) return;
    try {
      await deleteBoard(board?.id, user?.uid);
      router.refresh();
      router.replace("/");
    } catch (err) {
      alert("error deleting board");
      console.log(err);
    }
  };
  return (
    <div className=" w-full flex justify-between items-center pl-12 md:pl-3 px-3 py-5 border-b border-app-gray/30">
      <div>
        <h2 className=" text-xl font-bold">
          {user === null || !board?.title ? "Select Board" : board.title}
        </h2>
      </div>
      <div className=" flex items-center gap-2">
        <Link
          href={"/auth/sign-in"}
          className={` ${
            user === null ? " block" : " hidden"
          } bg-app-primary text-white cursor-pointer font-semibold px-4 py-2 rounded-md text-sm`}
        >
          Sign In
        </Link>
        <button
          disabled={user == null || pathname === "/"}
          onClick={() => setIsModalOpen(true)}
          // onClick={() => console.log('clicked')}
          className={`${
            user === null || pathname === "/"
              ? "opacity-30 cursor-not-allowed "
              : "opacity-100 cursor-pointer"
          } py-2 px-3 rounded-lg bg-app-primary text-white`}
        >
          <FaPlus />
        </button>
        <div className=" relative flex items-center">
          <button
            onClick={() => setMoreOption(true)}
            disabled={user == null ? true : false}
            className={`${
              user === null ? "opacity-30 cursor-not-allowed " : "opacity-100"
            } text-2xl`}
          >
            <MdMoreVert />
          </button>
          <div className={moreOption ? ` absolute top-10 right-0` : " hidden"}>
            <div
              onClick={(e) => {
                e.stopPropagation();
                setMoreOption(false);
              }}
              className=" fixed z-10 top-0 left-0 w-full h-full bg-black/10"
            />
            <div className=" relative z-20 border  border-gray-300/50 rounded-lg bg-white text-sm w-32">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMoreOption(false);
                  setEditBoardModal(true);
                }}
                className=" w-full text-gray-600 flex items-center justify-start gap-1 px-3 py-2"
              >
                <FaEdit /> Edit Board
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(e);
                }}
                className=" w-full text-red-600 flex items-center justify-start gap-1 px-3 py-2"
              >
                <FaTrash /> Delete Board
              </button>
            </div>
          </div>
        </div>
      </div>
      <CreateTask
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userId={user?.uid}
      />
      <CreateBoard
        isOpen={editBoardModal}
        onClose={() => setEditBoardModal(false)}
        userId={user?.uid}
        isEditing={true}
        board={board}
      />
    </div>
  );
}
