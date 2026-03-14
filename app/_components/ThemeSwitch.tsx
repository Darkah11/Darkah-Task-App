"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Prevents UI flash
  }

  return (
    <button
      onClick={() => {
        const newTheme = theme === "dark" ? "light" : "dark";
        setTheme(newTheme);
        console.log("Switching theme to:", newTheme); // Add this line
      }}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
    >
      {theme === "dark" ? "☀️ Light Mode" : "🌙 Dark Mode"}
    </button>
  );
};

export default ThemeSwitch;

// "use client";
// import { useEffect, useState } from "react";

// export default function ThemeToggle() {
//   const [dark, setDark] = useState(false);

//   useEffect(() => {
//     const root = document.documentElement;
//     const stored = localStorage.getItem("theme");

//     if (stored) {
//       const isDark = stored === "dark";
//       root.classList.toggle("dark", isDark);
//       setDark(isDark);
//     } else {
//       // Default: match system preference
//       const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
//       root.classList.toggle("dark", isDark);
//       setDark(isDark);
//     }
//   }, []);
//   const toggleTheme = () => {
//     const root = document.documentElement;
//     root.classList.toggle("dark");
//     const nowDark = root.classList.contains("dark");

//     setDark(nowDark);
//     localStorage.setItem("theme", nowDark ? "dark" : "light");
//   };

//   return (
//     <button
//       onClick={toggleTheme}
//       className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
//     >
//       {dark ? "Light Mode" : "Dark Mode"}
//     </button>
//   );
// }
