"use client";
import { LayoutDashboard, LogOut, Settings, Truck, User } from "lucide-react";
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
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { generateInitials } from "@/lib/generateInitials";

export default function UserAvatar({ user = {} }) {
  const router = useRouter();
  const { name, image } = user;
  const initial = generateInitials(name);
  const role = user?.role;

  // console.log("user",user);
  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {" "}
        <div className=" btn btn-circle bg-slate-200 hover:bg-slate-400 dark:bg-slate-600 dark:hover:bg-slate-700">
          {image ? (
            <Image
              src={image}
              alt={name}
              width={200}
              height={200}
              className="w-8 h-8 rounded-full"
            />
          ) : (
            <div className="font-semibold text-black dark:text-white ">
              {initial}
            </div>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="py-2 px-4">
        <DropdownMenuLabel>{name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href="/dashboard" className=" flex justify-center space-x-2">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link
            href="/dashboard/profile"
            className=" flex justify-center space-x-2"
          >
            <User className="mr-2 h-4 w-4" />
            <span>Edit Profile</span>
          </Link>
        </DropdownMenuItem>
        {role === "USER" && (
          <DropdownMenuItem>
            <Link
              href="/dashboard/orders"
              className=" flex justify-center space-x-2"
            >
              <Truck className="mr-2 h-4 w-4" />
              <span>My Orders</span>
            </Link>
          </DropdownMenuItem>
        )}
        <DropdownMenuItem>
          <button
            onClick={() => handleLogout()}
            className=" flex justify-center space-x-2"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Logout</span>
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
