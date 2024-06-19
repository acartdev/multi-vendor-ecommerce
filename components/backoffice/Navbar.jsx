"use client";
import { AlignJustify, Bell, X } from "lucide-react";
import Image from "next/image";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeSwitcherBtn } from "../ThemeSwitcherBtn";
import UserAvatar from "./UserAvatar";
import { useSession } from "next-auth/react";
import Loading from "@/app/api/loading";

export default function Navbar({ showSidebar, setShowSidebar }) {
  const { data: session, status } = useSession();
  if (status === "loading") {
    return <Loading /> ;
  }

  return (
    <div
      className=" flex items-center justify-between sm:justify-end bg-white dark:bg-slate-800
    text-slate-50 h-20 px-8 py-8 fixed top-0 sm:left-64 w-full z-50 sm:pr-[20rem] "
    >
      {/* Icon */}
      <button
        onClick={() => setShowSidebar(!showSidebar)}
        className=" text-green-700 dark:text-green-500 sm:hidden"
      >
        <AlignJustify />
      </button>
      {/* 3 Icon */}
      <div className=" flex space-x-3 ">
        <ThemeSwitcherBtn className="" />
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div
              type="button"
              className="relative inline-flex items-center p-3 text-sm font-medium text-center text-white 
           rounded-lg  bg-transparent"
            >
              <Bell className=" text-black dark:text-slate-200" />
              <span className="sr-only">Notifications</span>
              <div
                className="absolute inline-flex items-center justify-center w-6 h-6 text-xs
          font-bold text-white bg-red-500 rounded-full -top-0 end-5 "
              >
                20
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="py-2 px-4">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div className=" flex justify-center ">
                <Image
                  src="/test.png"
                  alt="User profile"
                  width={200}
                  height={200}
                  className="w-8 h-8 rounded-full  mt-1 mx-2"
                />
                <div className="flex flex-col space-y-1">
                  Yellow Sweet Corn Stock out,
                  <div className="flex items-center space-x-2">
                    <p className="px-3 py-0.5 bg-red-700  text-white rounded-full text-sm">
                      Stoke Out
                    </p>
                    <p>Dec 12 2021 - 12:40PM</p>
                  </div>
                </div>
                <button className="p-2">
                  <X />
                </button>{" "}
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div className=" flex justify-center ">
                <Image
                  src="/test.png"
                  alt="User profile"
                  width={200}
                  height={200}
                  className="w-8 h-8 rounded-full mt-1 mx-2"
                />
                <div className="flex flex-col space-y-1">
                  Yellow Sweet Corn Stock out,
                  <div className="flex items-center space-x-2">
                    <p className="px-3 py-0.5 bg-red-700  text-white rounded-full text-sm">
                      Stoke Out
                    </p>
                    <p>Dec 12 2021 - 12:40PM</p>
                  </div>
                </div>
                <button className="p-2">
                  <X />
                </button>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div className=" flex justify-center ">
                <Image
                  src="/test.png"
                  alt="User profile"
                  width={200}
                  height={200}
                  className="w-8 h-8 rounded-full mt-1 mx-2"
                />
                <div className="flex flex-col space-y-1">
                  Yellow Sweet Corn Stock out,
                  <div className="flex items-center space-x-2">
                    <p className="px-3 py-0.5 bg-red-700  text-white rounded-full text-sm">
                      Stoke Out
                    </p>
                    <p>Dec 12 2021 - 12:40PM</p>
                  </div>
                </div>
                <button className="p-2">
                  <X />
                </button>{" "}
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>

        {status === "authenticated" && <UserAvatar user={session?.user} />}
      </div>
    </div>
  );
}
