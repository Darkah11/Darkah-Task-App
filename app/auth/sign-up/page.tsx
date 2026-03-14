import Image from "next/image";
import React from "react";
// import lineBg from "../../../public/line-bg.png";
import sideImage from "../../../public/register.jpg";
import SignUpForm from "@/app/_components/SignUpForm";

export default function SignUpPage() {
  return (
    <div className=" ">
      <div className=" h-full flex items-center justify-center ">
        <SignUpForm />
      </div>
    </div>
  );
}
