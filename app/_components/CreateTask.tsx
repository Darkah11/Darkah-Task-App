"use client";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import { createTask, editTask, getTaskById } from "../_lib/firebase";
import { usePathname, useRouter } from "next/navigation";
import { Subtask, TaskWithId } from "../_types/Task";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string | undefined;
  isEditing?: boolean;
  taskId?: string;
  task?: TaskWithId;
}

export default function CreateTask({
  isOpen,
  onClose,
  userId,
  isEditing,
  taskId,
  task
}: ModalProps) {
  const [title, setTitle] = useState<string>(task && task.title || "");
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState<string>(task && task.description || "");
  const [priority, setPriority] = useState<"low" | "medium" | "high">(task && task.priority || "low");
  const [status, setStatus] = useState<
    "to-do" | "in-progress" | "pending" | "completed"
  >(task && task.status || "to-do");
  const [dueDate, setDueDate] = useState(task && task.dueDate || "");
  const [subtasks, setSubtasks] = useState<Subtask[]>(task && task.subtasks || []);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState("");
  const [boardId, setBoardId] = useState("");
  const router = useRouter();

  // const getCurrentTask = async () => {
  //   if (!taskId) return;
  //   const task = await getTaskById(boardId, userId, taskId);
  //   console.log(task);

  //   if (task) {
  //     setTitle(task.title);
  //     setDescription(task.description || "");
  //     setStatus(task.status);
  //     setPriority(task.priority);
  //     setDueDate(task.dueDate || "");
  //     setSubtasks(task.subtasks || []);
  //   }
  // };

  const pathname = usePathname();
  useEffect(() => {
    const boardId = pathname.substring(1);

    if (boardId) {
      setBoardId(boardId);
    }
  }, [pathname]);

  // useEffect(() => {
  //   if (isEditing) {
  //     getCurrentTask();
  //   }
  // }, [taskId, boardId]);

  // Function to add a new empty input field to the array
  const handleAddSubtaskField = () => {
    if (newSubtaskTitle.trim() === "") return; // Optional: prevent empty fields

    const newSubtask: Subtask = {
      // Use a timestamp or UUID for a unique ID
      id: Date.now().toString(),
      title: newSubtaskTitle.trim(),
      done: false,
    };

    // Add the new subtask object to the state array
    setSubtasks([...subtasks, newSubtask]);
    // Clear the input field for the next entry
    setNewSubtaskTitle("");
  };
  const handleSubtaskChange = (id: string, value: string) => {
    setSubtasks(
      subtasks.map((subtask) =>
        subtask.id === id ? { ...subtask, title: value } : subtask,
      ),
    );
  };

  const handleCreate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoading(true);
    await createTask(boardId, userId, {
      title,
      description,
      status,
      priority,
      subtasks,
      dueDate: dueDate ? dueDate : "",
    });
    setLoading(false);
    setTitle("");
    setDescription("");
    setStatus("to-do");
    setPriority("low");
    setDueDate("");
    setSubtasks([]);

    onClose();
    router.refresh();
  };
  const handleEdit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!taskId) return;
    setLoading(true);
    await editTask(boardId, userId, taskId, {
      title,
      description,
      status,
      priority,
      subtasks,
      dueDate: dueDate ? dueDate : undefined,
    });
    setLoading(false);
    setTitle("");
    setDescription("");
    setStatus("to-do");
    setPriority("low");
    setDueDate("");
    setSubtasks([]);
    onClose();
    router.refresh();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-lg font-semibold mb-4">Add New Task</h2>
      {/* <form onSubmit={handleSignIn} className="mt-8"> */}
      <form className="">
        <div>
          <label htmlFor="title">Task Title</label>
          <input
            id="title"
            name="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 bg-app-card outline-none block w-full rounded-md border border-app-gray/30 p-2 shadow-sm focus:border-app-primary focus:ring-app-primary"
            placeholder="Enter your task title"
          />
        </div>
        <div className=" mt-2">
          <label htmlFor="desc">Description</label>
          <input
            id="desc"
            name="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 bg-app-card outline-none block w-full rounded-md border border-app-gray/30 p-2 shadow-sm focus:border-app-primary focus:ring-app-primary"
            placeholder="Enter your task description"
          />
        </div>

        <div className=" mt-2">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            name="priority"
            value={priority}
            onChange={(e) =>
              setPriority(e.target.value as "low" | "medium" | "high")
            }
            className="mt-1 bg-app-card outline-none block w-full rounded-md border border-app-gray/30 p-2 shadow-sm focus:border-app-primary focus:ring-app-primary"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div className=" mt-2">
          <label htmlFor="priority">Status</label>
          <select
            id="status"
            name="status"
            value={status}
            onChange={(e) =>
              setStatus(
                e.target.value as
                  | "to-do"
                  | "in-progress"
                  | "pending"
                  | "completed",
              )
            }
            className="mt-1 bg-app-card outline-none block w-full rounded-md border border-app-gray/30 p-2 shadow-sm focus:border-app-primary focus:ring-app-primary"
          >
            <option value="to-do">To do</option>
            <option value="in-progress">In progress</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <div className=" mt-3">
          <label htmlFor="dueDate" className="">
            Due Date
          </label>
          <input
            type="datetime-local"
            id="dueDate"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="mt-1 bg-app-card outline-none block w-full rounded-md border border-app-gray/30 p-2 shadow-sm focus:border-app-primary focus:ring-app-primary"
          />
        </div>
        <div className=" mt-3">
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="Enter new subtask title"
              value={newSubtaskTitle}
              onChange={(e) => setNewSubtaskTitle(e.target.value)}
              className="bg-app-card outline-none block w-full rounded-md border border-app-gray/30 p-2 shadow-sm focus:border-app-primary focus:ring-app-primary"
            />
            <button
              onClick={handleAddSubtaskField}
              type="button" // Important: use type="button" to prevent form submission
              className="bg-app-primary text-white p-2 rounded cursor-pointer"
            >
              Add
            </button>
          </div>
          <div className="space-y-1">
            {subtasks.map((subtask) => (
              <div key={subtask.id} className="flex items-center gap-2">
                <input
                  type="text"
                  value={subtask.title}
                  onChange={(e) =>
                    handleSubtaskChange(subtask.id, e.target.value)
                  }
                  className="bg-app-card outline-none block w-full rounded-md border border-app-gray/30 p-2 shadow-sm focus:border-app-primary focus:ring-app-primary"
                  placeholder="Subtask title"
                />
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={isEditing ? handleEdit : handleCreate}
          className="mt-4 cursor-pointer bg-app-primary w-full p-2 rounded text-white font-medium"
        >
          {loading ? "loading..." : isEditing ? "Edit Task" : "Create New Task"}
        </button>
      </form>
    </Modal>
  );
}
