import { cookies } from "next/headers";
import SideNav from "../_components/Sidenav";
import { adminAuth } from "../_config/firebase-admin";
import { User } from "../_types/User";
import { verifyUserSession } from "../_lib/sessionHandler";
import { getBoards } from "../_lib/firebase";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userDetails: User | null = await verifyUserSession();
  const boards = await getBoards(userDetails?.uid);
  return (
    <div className="flex h-screen flex-row  md:overflow-hidden">
      <div className=" md:w-64">
        <SideNav user={userDetails} boards={boards} />
      </div>
      <div className=" md:flex-1 grow overflow-y-auto">{children}</div>
    </div>
  );
}
