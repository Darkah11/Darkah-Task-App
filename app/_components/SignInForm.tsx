// src/components/LoginForm.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
// import logo from "../../public/logo.jpg";
import google from "@/public/google.svg";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../_config/firebase";
import { useRouter } from "next/navigation";
import Loader from "./Loader";

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      alert("all fields are required");
    } else {
      try {
        setLoading(true);
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        const idToken = await userCredential.user.getIdToken();
        console.log(idToken);

        const res = await fetch("/api/session", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ idToken, rememberMe }),
        });

        router.push("/");
        setLoading(false);
      } catch (error) {
        console.log("Login failed:", error);
        setLoading(false);
      }
    }
  };


  return (
    <>
    {loading && <Loader />}
      <div className="w-full max-w-md  lg:max-w-[400px] mx-auto overflow-scroll no-scrollbar py-8 text-app-text">
        <div className="mb-8 flex lg:justify-center ">
          {/* <Image src={logo} alt="TSS Logo" className=" lg:w-20 w-[50px]" /> */}
        </div>

        <h2 className="text-3xl font-semibold mt-12 lg:mt-0">
          Welcome Back 👋
        </h2>
        <p className="mt-2 text-app-gray text-sm">
          Enter your email and password to access your account.
        </p>

        <form onSubmit={handleSignIn} className="mt-8">
          <div>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 bg-app-card outline-none block w-full rounded-md border border-app-gray/30 p-2 shadow-sm focus:border-app-primary focus:ring-app-primary"
              placeholder="Enter your email"
            />
          </div>

          <div className=" mt-5">
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 bg-app-card outline-none block w-full rounded-md border border-app-gray/30 p-2 shadow-sm focus:border-app-primary focus:ring-app-primary"
              placeholder="••••••••"
            />
          </div>

          <div className="flex items-center justify-between text-sm mt-3">
            <div className="flex items-center">
              <input
                id="remember"
                name="remember"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 rounded border-app-gray text-indigo-600 focus:ring-indigo-500"
              />
              <label
                htmlFor="remember"
                className="ml-2 font-medium text-app-gray"
              >
                Remember me
              </label>
            </div>
            <Link href="#" className="font-medium text-accent hover:opacity-80">
              Forgot password
            </Link>
          </div>

          <div className=" mt-10">
            <button
              onClick={handleSignIn}
              type="submit"
              className="w-full rounded-md bg-app-primary py-2 font-semibold text-white shadow-sm hover:bg-primary-50 outline-none"
            >
              Sign In
            </button>
            <button className=" mt-3 flex w-full items-center justify-center rounded-md bg-white py-2 font-medium text-gray-700 shadow-[1px_1px_3px_rgba(0,0,0,0.2)] hover:bg-gray-50">
              <Image src={google} alt="Google Logo" width={20} height={20} />
              <span className="ml-2">Sign in with Google</span>
            </button>
          </div>
        </form>

        <div className="mt-12 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link
            href="/auth/sign-up"
            className="font-medium text-app-primary hover:opacity-80"
          >
            Sign up
          </Link>
        </div>
      </div>
    </>
  );
}
