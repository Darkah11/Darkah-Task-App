import React from "react";
interface MyComponentProps {
  noBg?: boolean;
}
export default function Loader({ noBg }: MyComponentProps) {
  return (
    <div
      className={`h-screen w-screen flex items-center justify-center ${
        noBg ? " bg-transparent" : "bg-black/30"
      }  absolute top-0 left-0 z-50`}
    >
      <div className="loader"></div>
    </div>
  );
}
