import React from "react";
import { MdMoreVert } from "react-icons/md";
import { RiCalendarTodoFill } from "react-icons/ri";
import { TaskWithId } from "../_types/Task";
import Task from "./Task";
import { deleteTask } from "../_lib/firebase";

interface MyComponentProps {
  tasks: TaskWithId[];
  boardId: string;
  userId: string | undefined;
}

export default function TaskList({ tasks, boardId, userId }: MyComponentProps) {
  return (
    <section className="  flex flex-col lg:flex-row bg-app-card w-full px-3 py-5">
      <div className=" bg-app-card p-2 rounded-b-md">
        <div className=" flex gap-2 items-center text-purple-400 rounded-md font-bold">
          <RiCalendarTodoFill />
          <p>To Do</p>
        </div>
        <div className=" flex lg:flex-col gap-3 overflow-x-auto no-scrollbar py-5">
          {tasks.filter((task) => task.status === "to-do").length > 0 ? (
            tasks
              .filter((task) => task.status === "to-do")
              .map((task) => (
                <Task
                  key={task.id}
                  task={task}
                  style=" bg-white bg-linear-to-b from-app-todo from-60% to-app-todo/50"
                  userId={userId}
                  boardId={boardId}
                />
              ))
          ) : (
            <div className=" h-[150px]  lg:h-auto w-full lg:w-[200px] flex justify-center items-center">
              <p className=" font-semibold">No tasks here.</p>
            </div>
          )}
        </div>
      </div>
      <div className=" bg-app-card p-2 rounded-b-md">
        <div className=" flex gap-2 items-center text-orange-400 rounded-md font-bold">
          <RiCalendarTodoFill />
          <p>In Progress</p>
        </div>
        <div className=" flex lg:flex-col gap-3 overflow-x-auto no-scrollbar py-5">
          {tasks.filter((task) => task.status === "in-progress").length > 0 ? (
            tasks
              .filter((task) => task.status === "in-progress")
              .map((task) => (
                <Task
                  key={task.id}
                  task={task}
                  style=" bg-white bg-linear-to-b from-app-progress from-60% to-app-progress/50"
                  userId={userId}
                  boardId={boardId}
                />
              ))
          ) : (
            <div className=" h-[150px]  lg:h-auto w-full lg:w-[200px] flex justify-center items-center">
              <p className=" font-semibold">No tasks here.</p>
            </div>
          )}
        </div>
      </div>
      <div className=" bg-app-card p-2 rounded-b-md">
        <div className=" flex gap-2 items-center text-yellow-400 rounded-md font-bold">
          <RiCalendarTodoFill />
          <p>Pending</p>
        </div>
        <div className=" flex lg:flex-col gap-3 overflow-x-auto no-scrollbar py-5">
          {tasks.filter((task) => task.status === "pending").length > 0 ? (
            tasks
              .filter((task) => task.status === "pending")
              .map((task) => (
                <Task
                  key={task.id}
                  task={task}
                  userId={userId}
                  boardId={boardId}
                  style=" bg-white bg-linear-to-b from-app-pending from-60% to-app-pending/50"
                />
              ))
          ) : (
            <div className=" h-[150px]  lg:h-auto w-full lg:w-[200px] flex justify-center items-center">
              <p className=" font-semibold">No tasks here.</p>
            </div>
          )}
        </div>
      </div>
      <div className=" bg-app-card p-2 rounded-b-md">
        <div className=" flex gap-2 items-center text-blue-400 rounded-md font-bold">
          <RiCalendarTodoFill />
          <p>Completed</p>
        </div>
        <div className=" flex lg:flex-col gap-3 overflow-x-auto no-scrollbar py-5">
          {tasks.filter((task) => task.status === "completed").length > 0 ? (
            tasks
              .filter((task) => task.status === "completed")
              .map((task) => (
                <Task
                  key={task.id}
                  task={task}
                  userId={userId}
                  boardId={boardId}
                  style=" bg-white bg-linear-to-b from-app-completed from-60% to-app-completed/50"
                />
              ))
          ) : (
            <div className=" h-[150px]  lg:h-auto w-full lg:w-[200px] flex justify-center items-center">
              <p className=" font-semibold">No tasks here.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
