"use client";

import { MdClose, MdLogout, MdMenu } from "react-icons/md";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import ThemeSwitch from "./ThemeSwitch";
import { FaPlus } from "react-icons/fa6";
import { User } from "../_types/User";
import { signOut } from "firebase/auth";
import { auth } from "../_config/firebase";
import { useState } from "react";
import CreateBoard from "./CreateBoard";
import { BoardWithId } from "../_types/Board";
import Loader from "./Loader";

interface MyComponentProps {
  user: null | User;
  boards: BoardWithId[] | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({
  isOpen,
  onClose,
  user,
  boards,
}: MyComponentProps) {
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

      router.push("/");
      router.refresh();
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
      <div
        // className={` hidden  md:hidden h-full justify-between flex-col py-4 pr-2 border-r border-app-gray/30`}
        className={`  z-50 fixed top-0 left-0 h-dvh w-full md:hidden  ${
          isOpen ? " visible" : " invisible"
        }`}
      >
        <div
          onClick={onClose}
          className={`fixed inset-0 bg-black/40 transition-opacity duration-300 md:hidden ${
            isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        />
        <div className=" relative max-w-64 bg-app-bg h-full flex justify-between flex-col py-4 pr-2 border-r border-app-gray/30">
          <Link className=" flex items-center gap-2 ml-3" href="/">
            <h1 className=" block leading-none text-3xl font-bold text-app-primary tracking-widest">
              D<span className=" text-app-text">T</span>A
            </h1>
          </Link>
          <button
            onClick={onClose}
            className=" absolute top-4 right-4 hover:rotate-90 transition-transform duration-300"
          >
            <MdClose className=" text-app-text w-7 h-7 " />
          </button>
          <CreateBoard
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            userId={user?.uid}
          />
          <div className=" mt-10 flex-1 flex justify-between flex-col">
            <div>
              <p className=" font-bold px-3 mb-3">Boards</p>
              {user !== null && boards && boards.length !== 0 && (
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
      </div>
    </>
  );
}
