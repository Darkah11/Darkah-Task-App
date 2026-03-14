import Header from "@/app/_components/Header";
import TaskList from "@/app/_components/TaskList";
import { getBoardById, getTasks } from "@/app/_lib/firebase";
import { verifyUserSession } from "@/app/_lib/sessionHandler";
import { redirect } from "next/navigation";

export default async function BoardPage({ params }: any) {
  const { id } = await params;

  const userDetails = await verifyUserSession();
  userDetails === null && redirect("/");

  const tasks = await getTasks(id, userDetails?.uid);
  const board = await getBoardById(id, userDetails?.uid)
  console.log(board);
  

  return (
    <div className=" h-full flex flex-col">
      <Header user={userDetails} board={board} />
      <main className=" w-full flex-1 bg-app-card overflow-x-auto">
        <TaskList tasks={tasks} boardId={id} userId={userDetails?.uid} />
      </main>
    </div>
  );
}
