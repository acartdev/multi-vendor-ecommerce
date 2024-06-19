"use client";
import Navbar from "@/components/backoffice/Navbar";
import Sidebar from "@/components/backoffice/Sidebar";
import React, { useState } from "react";

export default function Layout({ children }) {
  const [showSidebar, setShowSidebar] = useState(false)
  return (
    <div className=" flex transition-all duration-300">
      {/* sidebar */}
      <div className="">
        <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar}/>
      </div>
      <div className=" ml-0 sm:ml-64 flex-grow bg-slate-100 min-h-screen w-full">
        {/* Header */}
        <Navbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        {/* Main */}

        <main
          className=" p-8 mt-16 flex-grow bg-slate-100 dark:bg-slate-950 text-slate-50 
             min-h-screen "
        >
          {children}
        </main>
      </div>
      {/* Main body */}
    </div>
  );
}
