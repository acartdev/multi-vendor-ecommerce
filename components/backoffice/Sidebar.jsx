"use client";
import {
  BadgePercent,
  BarChart3,
  Boxes,
  Building2,
  ChevronDown,
  ChevronRight,
  CircleDollarSign,
  ExternalLink,
  LayoutGrid,
  LayoutList,
  LogOut,
  MonitorPlay,
  SendToBack,
  Settings,
  Slack,
  Truck,
  User,
  UserSquare2,
  Users,
  Warehouse,
} from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import logo from "../../public/logo.png";
import { usePathname, useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import Loading from "@/app/api/loading";

export default function Sidebar({ showSidebar, setShowSidebar }) {
  const { data: session, status } = useSession();
  const [openCollapsible, setOpenCollapsible] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push("/");
  };

  if (status === "loading") {
    return <Loading />;
  }
  const role = session?.user?.role;
  // let userLink;
  let sidebarLink = [
    {
      title: "Customers",
      icon: Users,
      href: "/dashboard/customers",
    },
    {
      title: "Markets",
      icon: Warehouse,
      href: "/dashboard/markets",
    },
    {
      title: "Farmers",
      icon: UserSquare2,
      href: "/dashboard/farmers",
    },
    {
      title: "Orders",
      icon: Truck,
      href: "/dashboard/orders",
    },
    {
      title: "Sales",
      icon: BarChart3,
      href: "/dashboard/sales",
    },
    {
      title: "Staff",
      icon: User,
      href: "/dashboard/staffs",
    },
    {
      title: "Community",
      icon: Building2,
      href: "/dashboard/community",
    },
    {
      title: "Wallet",
      icon: CircleDollarSign,
      href: "/dashboard/wallet",
    },
    {
      title: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
    },
    {
      title: "Online Store",
      icon: ExternalLink,
      href: "/dashboard/online-store",
    },
  ];

  let catalogueLink = [
    {
      title: "Products",
      icon: Boxes,
      href: "/dashboard/products",
    },
    {
      title: "Categories",
      icon: LayoutList,
      href: "/dashboard/categories",
    },
    {
      title: "Coupons",
      icon: BadgePercent,
      href: "/dashboard/coupons",
    },
    {
      title: "Store Banners",
      icon: MonitorPlay,
      href: "/dashboard/banners",
    },
  ];

  if (role === "FARMER") {
    sidebarLink = [
      // {
      //   title: "Customers",
      //   icon: Users,
      //   href: "/dashboard/customers",
      // },
      // {
      //   title: "Markets",
      //   icon: Warehouse,
      //   href: "/dashboard/markets",
      // },
      // {
      //   title: "Sales",
      //   icon: BarChart3,
      //   href: "/dashboard/sales",
      // },
      // {
      //   title: "Community",
      //   icon: Building2,
      //   href: "/dashboard/community",
      // },
      // {
      //   title: "Wallet",
      //   icon: CircleDollarSign,
      //   href: "/dashboard/wallet",
      // },
      // {
      //   title: "Settings",
      //   icon: Settings,
      //   href: "/dashboard/settings",
      // },
      // {
      //   title: "Online Store",
      //   icon: ExternalLink,
      //   href: "/dashboard/online-store",
      // },


      {
        title: "Customers",
        icon: Users,
        href: "/dashboard/customers",
      },
      {
        title: "Markets",
        icon: Warehouse,
        href: "/dashboard/markets",
      },
      {
        title: "Farmers",
        icon: UserSquare2,
        href: "/dashboard/farmers",
      },
      {
        title: "Orders",
        icon: Truck,
        href: "/dashboard/orders",
      },
      {
        title: "Sales",
        icon: BarChart3,
        href: "/dashboard/sales",
      },
      {
        title: "Staff",
        icon: User,
        href: "/dashboard/staffs",
      },
      {
        title: "Community",
        icon: Building2,
        href: "/dashboard/community",
      },
      {
        title: "Wallet",
        icon: CircleDollarSign,
        href: "/dashboard/wallet",
      },
      {
        title: "Settings",
        icon: Settings,
        href: "/dashboard/settings",
      },
      {
        title: "Online Store",
        icon: ExternalLink,
        href: "/dashboard/online-store",
      },
    ];
    catalogueLink = [
      // {
      //   title: "Products",
      //   icon: Boxes,
      //   href: "/dashboard/products",
      // },
      // {
      //   title: "Coupons",
      //   icon: BadgePercent,
      //   href: "/dashboard/coupons",
      // },

      {
        title: "Products",
        icon: Boxes,
        href: "/dashboard/products",
      },
      {
        title: "Categories",
        icon: LayoutList,
        href: "/dashboard/categories",
      },
      {
        title: "Coupons",
        icon: BadgePercent,
        href: "/dashboard/coupons",
      },
      {
        title: "Store Banners",
        icon: MonitorPlay,
        href: "/dashboard/banners",
      },
    ];
  
  }
  if (role === "USER") {
    sidebarLink = [
      {
        title: "My Orders",
        icon: Truck,
        href: "/dashboard/orders",
      },
      {
        title: "Profile",
        icon: User,
        href: "/dashboard/profile",
      },
      {
        title: "Online Store",
        icon: ExternalLink,
        href: "/dashboard/online-store",
      },
    ];
    catalogueLink = [];
  }
  return (
    <div
      className={
        showSidebar
          ? "mt-20 sm:mt-0 bg-slate-50 dark:bg-slate-800 space-y-3 w-64 h-screen text-slate-800 dark:text-slate-300 fixed left-0 top-0 shadow-md overflow-y-scroll z-40"
          : "hidden sm:block mt-20 sm:mt-0 bg-slate-50 dark:bg-slate-800 space-y-3 w-64 h-screen text-slate-800 dark:text-slate-300 fixed left-0 top-0 shadow-md overflow-y-scroll z-40"
      }
    >
      <Link className=" flex justify-center " href="/">
        <Image src={logo} alt="snooker logo" className="w-36" />
      </Link>
      <div className="space-y-3 flex flex-col ">
        <Link
          onClick={() => setShowSidebar(false)}
          href="/dashboard"
          className={
            pathname === "/dashboard"
              ? "flex items-center space-x-3 px-6 py-2 border-l-4 border-green-600 text-green-700 dark:text-green-400"
              : "flex items-center space-x-3 px-6 py-2  "
          }
        >
          <LayoutGrid />
          <span>Dashboard</span>
        </Link>
        {catalogueLink.length !== 0 && (
          <Collapsible className=" px-6">
            <CollapsibleTrigger
              onClick={() => setOpenCollapsible(!openCollapsible)}
            >
              {" "}
              <div className="flex items-center space-x-3 py-2 ">
                <div className=" flex items-center space-x-3">
                  <Slack />
                  <span>Catalogue</span>
                </div>
                {openCollapsible ? <ChevronDown /> : <ChevronRight />}
              </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="p-3 pl-6 bg-slate-200 text-slate-600 dark:bg-slate-900 dark:text-slate-400 shadow-inner rounded-md">
              {catalogueLink.map((item, i) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={i}
                    onClick={() => setShowSidebar(false)}
                    href={item.href}
                    className={
                      item.href == pathname
                        ? "flex items-center space-x-3 py-1 text-sm  text-green-700 dark:text-green-400"
                        : "flex items-center space-x-3 py-1 text-sm  "
                    }
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.title}</span>
                  </Link>
                );
              })}
            </CollapsibleContent>
          </Collapsible>
        )}

        {sidebarLink.map((item, i) => {
          const Icon = item.icon;
          return (
            <Link
              href={item.href}
              onClick={() => setShowSidebar(false)}
              key={i}
              className={
                item.href == pathname
                  ? "flex items-center space-x-3 px-6 py-2 border-l-4 border-green-600 text-green-700 dark:text-green-400"
                  : "flex items-center space-x-3 px-6 py-2  "
              }
            >
              <Icon />
              <span>{item.title}</span>
            </Link>
          );
        })}
        <div className="px-6 py-2">
          <button
            onClick={() => handleLogout()}
            className=" flex items-center space-x-3 px-6 py-2  bg-green-500 text-white rounded-md "
          >
            <LogOut />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
}
