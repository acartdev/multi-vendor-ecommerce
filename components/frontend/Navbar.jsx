"use client";
import dynamic from "next/dynamic";

import React from "react";
import SearchForm from "./SearchForm";
import logo from "../../public/logo.png";
import Link from "next/link";
import Image from "next/image";
import { ThemeSwitcherBtn } from "../ThemeSwitcherBtn";
import { User } from "lucide-react";
import HelpModal from "./HelpModal";
import { useSession } from "next-auth/react";
import Loading from "@/app/api/loading";
import UserAvatar from "../backoffice/UserAvatar";

import CartCount from "./CartCount";

export default function Navbar() {
  // const CartCount = dynamic(() => import("./CartCount"), { ssr: false });
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <Loading />;
  }
  return (
    <div className=" w-full bg-gray-50 dark:bg-gray-900 shadow-sm border ">
      <div className="flex items-center justify-between py-3 px-8 gap-8 max-w-xl sm:max-w-6xl mx-auto ">
        <Link className=" flex justify-center " href="/">
          <Image src={logo} alt="snooker logo" className="w-20" />
        </Link>
        <SearchForm />
        <div className="flex gap-4">
          {status === "unauthenticated" ? (
            <Link
              href="/login"
              className=" btn btn-md bg-slate-900 dark:btn-outline text-slate-200 flex items-center justify-center space-x-1 "
            >
              {" "}
              <User />
              <span>Login</span>
            </Link>
          ) : (
            <UserAvatar  user={session.user}/>
          )}

          <HelpModal />
          <CartCount />
          <ThemeSwitcherBtn />
        </div>
      </div>
    </div>
  );
}
