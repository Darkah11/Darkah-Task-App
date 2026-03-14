import Image from "next/image";
import React from "react";
import SignInForm from "@/app/_components/SignInForm";

export default function SignInPage() {
  return (
    <div className=" h-screen">
      <div className=" h-full flex bg-app-bg items-center justify-center overflow-scroll no-scrollbar">
        <SignInForm />
      </div>
    </div>
  );
}
