import Image from "next/image";
import { FaPlus } from "react-icons/fa6";
import { RiCalendarTodoFill } from "react-icons/ri";
import { MdMoreVert } from "react-icons/md";
import Header from "../_components/Header";
import { cookies } from "next/headers";
import { adminAuth } from "../_config/firebase-admin";
import { redirect } from "next/navigation";
import { User } from "../_types/User";
import { verifyUserSession } from "../_lib/sessionHandler";
import TaskList from "../_components/TaskList";

export default async function Home() {
  // const cookieStore = await cookies();
  // const sessionCookie = cookieStore.get("__session")?.value || "";
  // let userDetails: User | null = null;
  // // let userDetails = null;

  // try {
  //   // Verify the cookie on the server
  //   const decodedClaims = await adminAuth.verifySessionCookie(
  //     sessionCookie,
  //     true
  //   );

  //   userDetails = decodedClaims;
  //   console.log(decodedClaims);
  // } catch (error) {
  //   console.log("User is not authenticated (server side check).");
  //   userDetails = null;
  // }

  const userDetails = await verifyUserSession();
  

  return (
    <div className=" h-full flex flex-col">
      <Header user={userDetails} />
      <main className=" w-full flex-1 bg-app-card overflow-x-auto">
        {userDetails === null ? (
          <div className=" h-full flex flex-col items-center justify-center">
            <h1 className=" text-2xl font-bold">Login to Darkah Task App</h1>
            <p>Login to access your boards and tasks</p>
          </div>
        ) : (
          <div className=" h-full flex flex-col items-center justify-center">
            <h1 className=" text-2xl font-bold">Welcome to Darkah Task App</h1>
            <p>Create your boards and assign your tasks to correlating boards</p>
          </div>
        )}
      </main>
    </div>
  );
}
