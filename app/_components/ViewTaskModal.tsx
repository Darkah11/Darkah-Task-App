"use client";
import { useEffect, useState } from "react";
import { TaskWithId } from "../_types/Task";
import Modal from "./Modal";
import { editTask } from "../_lib/firebase";
import { usePathname, useRouter } from "next/navigation";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: TaskWithId;
  userId: string | undefined;
}

export default function ViewTaskModal({
  isOpen,
  onClose,
  task,
  userId,
}: ModalProps) {
  const [subtasks, setSubtasks] = useState(task.subtasks);
  const [boardId, setBoardId] = useState("");
  const router = useRouter();
  const pathname = usePathname();
  const handleToggle = (index: number) => {
    setSubtasks(
      (prev) =>
        prev &&
        prev.map((sub, i) => (i === index ? { ...sub, done: !sub.done } : sub)),
    );
  };
  const handleUpdate = async () => {
    if (!task.subtasks || !userId) return;
    await editTask(boardId, userId, task.id, {
      title: task.title,
      description: task.title,
      status: task.status,
      priority: task.priority,
      subtasks,
      dueDate: task.dueDate || '',
    });
    onClose();
    router.refresh();
  };
  useEffect(() => {
    const boardId = pathname.substring(1);

    if (boardId) {
      setBoardId(boardId);
    }
  }, [pathname]);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div>
        <div className=" flex items-center gap-x-3">
          <div className=" bg-gray-200 py-1 px-2.5 rounded-full w-fit">
            <p
              className={` capitalize text-xs font-bold  ${
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
          <p className="text-sm">
            Due Date:{" "}
            <span
              className={` ${task.dueDate && new Date(task.dueDate) <= new Date() ? " text-red-600" : ""} text-sm `}
            >
              {task.dueDate
                ? new Date(task.dueDate).toLocaleDateString()
                : "No Due Date"}
            </span>
          </p>
        </div>
        <h3 className=" capitalize font-semibold line-clamp-1 mt-5 text-lg">
          {task.title}
        </h3>
        <p className=" text-sm mt-3">{task.description}</p>
        {task.subtasks && task.subtasks.length > 0 ? <div className=" mt-7">
          <h3>Subtasks</h3>
          <div className=" flex flex-col">
            {subtasks &&
              subtasks.map((sub, index) => (
                <label className=" capitalize" key={sub.id}>
                  <input
                    type="checkbox"
                    checked={sub.done}
                    onChange={() => handleToggle(index)}
                  />{" "}
                  {sub.title}
                </label>
              ))}
          </div>
        </div> : <p className=" mt-5 text-gray-400">No subtasks</p>}
        <button
          onClick={handleUpdate}
          className="mt-4 cursor-pointer bg-app-primary w-full p-2 rounded text-white font-medium"
        >
          Update
        </button>
      </div>
    </Modal>
  );
}
