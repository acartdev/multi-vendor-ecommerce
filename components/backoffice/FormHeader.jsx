"use client";
import React from 'react'
import { X } from "lucide-react";
import { useRouter } from 'next/navigation';


export default function FormHeader({title}) {
  const router = useRouter();
  return (
    <div className="flex justify-between items-center py-6 px-6 sm:px-12 text-slate-600 dark:text-slate-50 bg-white dark:bg-slate-600 rounded-lg shadow-md mb-12">
      <h2 className=" text-xl font-semibold">{title}</h2>
      <button 
      className=' hover:text-red-500 transition-all'
      onClick={()=>router.back()}>
        <X />
      </button>
    </div>
  )
}
