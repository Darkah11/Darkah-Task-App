"use client";
import React, { useState } from "react";
import { MdMoreVert } from "react-icons/md";
import { TaskWithId } from "../_types/Task";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa6";
import { deleteTask } from "../_lib/firebase";
import { useRouter } from "next/navigation";
import CreateTask from "./CreateTask";
import ViewTaskModal from "./ViewTaskModal";
interface MyComponentProps {
  task: TaskWithId;
  style: string;
  boardId: string;
  userId: string | undefined;
}

export default function Task({
  task,
  style,
  boardId,
  userId,
}: MyComponentProps) {
  const [moreOption, setMoreOption] = useState<string | null>(null);
  const [viewTask, setViewTask] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const completedCount =
    task.subtasks && task.subtasks.filter((sub) => sub.done).length;
  const router = useRouter();
  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await deleteTask(boardId, userId, task.id);
      router.refresh();
    } catch (err) {
      alert("error deleting task");
      console.log(err);
    }
  };
  return (
    <>
      <div
        onClick={() => setViewTask(true)}
        className={` ${style} cursor-pointer card-shadow flex flex-col justify-between w-[200px] shrink-0 p-3 rounded-md text-black`}
      >
        <div>
          <div className=" flex items-center justify-between mb-3">
            <div className=" bg-white py-1 px-2.5 rounded-full">
              <p
                className={` capitalize text-xs font-bold ${
                  task.priority === "low"
                    ? "text-green-600"
                    : task.priority === "medium"
                      ? "text-yellow-600"
                      : " text-red-600"
                }  text-center`}
              >
                {task.priority}
              </p>
            </div>
            <div className=" relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setMoreOption(task.id);
                }}
                className=" bg-white p-0.5 rounded-md text-base"
              >
                <MdMoreVert />
              </button>
              <div
                className={
                  moreOption && moreOption === task.id
                    ? ` absolute top-5 right-0  `
                    : " hidden"
                }
              >
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setMoreOption(null);
                  }}
                  className=" fixed z-10 top-0 left-0 w-full h-full bg-black/10"
                />
                <div className=" relative z-20 border  border-gray-300/50 rounded-lg bg-white text-sm w-20">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setMoreOption(null);
                      setIsModalOpen(true);
                    }}
                    className=" w-full text-gray-600 flex items-center justify-start gap-1 px-2 py-1"
                  >
                    <FaEdit /> Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(e);
                    }}
                    className=" w-full text-red-600 flex items-center justify-start gap-1 px-2 py-1"
                  >
                    <FaTrash /> Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          <h3 className=" font-semibold line-clamp-1 capitalize">
            {task.title}
          </h3>
        </div>
        <div className=" mt-2">
          <p className=" text-sm">
            {task.subtasks && task.subtasks.length > 0
              ? `${completedCount}/${task.subtasks?.length} Subtasks`
              : "No subtasks"}
          </p>
          <div className=" pt-2 border-t border-black/20 mt-2">
            <p
              className={` ${task.dueDate && new Date(task.dueDate) <= new Date() ? " text-red-600" : ""} text-sm text-gray-600`}
            >
              Due:{" "}
              <span className={`  font-bold`}>
                {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString()
                  : "No date set"}
              </span>{" "}
            </p>
          </div>
        </div>
      </div>
      <CreateTask
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        userId={userId}
        isEditing={true}
        taskId={task.id}
        task={task}
      />
      <ViewTaskModal
        isOpen={viewTask}
        onClose={() => setViewTask(false)}
        task={task}
        userId={userId}
      />
    </>
  );
}
