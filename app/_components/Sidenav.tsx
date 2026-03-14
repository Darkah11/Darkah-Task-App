// app/ui/dashboard/sidenav.tsx

"use client"; // This is a Client Component, which uses hooks like usePathname

import Image from "next/image";
import { MdOutlineDashboard, MdDashboard, MdLogout } from "react-icons/md";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import ThemeSwitch from "./ThemeSwitch";
import { FaPlus } from "react-icons/fa6";
// import { User } from "../_types/User";
// import { cookies } from "next/headers";
import { adminAuth } from "../_config/firebase-admin";
import { User } from "../_types/User";
import { signOut } from "firebase/auth";
import { auth } from "../_config/firebase";
import Modal from "./Modal";
import { useState } from "react";
import CreateBoard from "./CreateBoard";
import { BoardWithId } from "../_types/Board";
import Loader from "./Loader";

// import menu from "../../public/icons/menu.svg";
// import logo from "../../public/logo.png";


interface MyComponentProps {
  user: null | User;
  boards: BoardWithId[];
}

export default function SideNav({ user, boards }: MyComponentProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    setLoading(true);
    try {
      // 1. Sign out on the Firebase client side
      await signOut(auth);
      await fetch("/api/logout", {
        method: "POST",
      });
      
      router.push('/');
      router.refresh()
      setLoading(false);
    } catch (error) {
      console.error("Logout error:", error);
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className=" hidden  md:flex h-full justify-between flex-col py-4 pr-2 border-r border-app-gray/30">
        <Link className=" flex items-center gap-2 ml-3" href="/">
          {/* <Image src={logo} alt="tss logo" className=" w-10" /> */}
          <h1 className=" block leading-none text-3xl font-bold text-app-primary tracking-widest">
            D<span className=" text-app-text">T</span>A
          </h1>
        </Link>
        {/* <button className=" md:hidden"> */}
        {/* <Image src={menu} alt=" menu icon" className=" w-10" /> */}
        {/* </button> */}
        {/* <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        >
          <h2 className="text-lg font-semibold mb-4">Login to your account</h2>
          <p>This is where your login form goes.</p>
          <button
            onClick={() => setIsModalOpen(false)}
            className="mt-4 bg-gray-300 p-2 rounded"
          >
            Close
          </button>
        </Modal> */}
        <CreateBoard
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          userId={user?.uid}
        />
        <div className=" mt-10 flex-1 flex justify-between flex-col">
          <div>
            <p className=" font-bold px-3 mb-3">Boards</p>
            {user !== null && boards.length !== 0 && (
              <div className=" flex flex-col gap-y-3 ">
                {boards.map((board, index) => {
                  // const LinkIcon = link.icon;
                  return (
                    <Link
                      key={board.id}
                      href={`/${board.id}`}
                      className={`
                rounded-r-full text-sm font-medium flex gap-2 items-center justify-start p-3
                ${
                  pathname === `/${board.id}`
                    ? "bg-app-primary text-white "
                    : " text-app-gray hover:text-app-primary "
                }
              `}
                    >
                      {/* <p className=" text-xl">
                        {pathname === link.href ? link.activeIcon : link.icon}
                      </p> */}

                      <p className=" font-semibold text-lg">{board.title}</p>
                    </Link>
                  );
                })}
              </div>
            )}
            <button
              onClick={() => setIsModalOpen(true)}
              disabled={user === null}
              className={` ${
                user === null
                  ? " cursor-not-allowed opacity-50"
                  : " opacity-100 cursor-pointer hover:text-app-text"
              } mt-5  w-full font-semibold flex items-center 
                justify-center gap-1 px-3 bg-app-card rounded-r-full py-2 text-app-primary  transition-colors duration-300`}
            >
              <span>Create New Board</span> <FaPlus />
            </button>
          </div>
          <div>
            <ThemeSwitch />
            <button
              onClick={logout}
              className={` ${
                user === null ? " hidden" : " block"
              } hover:text-red-500 text-app-text ml-3 mt-3 cursor-pointer font-semibold flex items-center gap-x-1`}
            >
              <MdLogout /> <p>Log out</p>{" "}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
