"use client";

import { Modal } from "flowbite-react";
import { CornerDownLeft, Headphones, HelpCircle, MessageCircleReply, MessageSquare, Truck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function HelpModal() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className="flex items-center justify-center space-x-1 text-slate-900 dark:text-slate-200"
      >
        {" "}
        <HelpCircle />
      </button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Need Help Shopping</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-y-5">
              <Link
                href="tel:025088874854"
                className=" flex items-center space-x-2 text-slate-800 dark:text-slate-200"
              >
                <div className="flex items-center justify-center w-8 h-8 text-slate-100 dark:text-slate-800
                 bg-slate-500 rounded-full">

                <Headphones className="w-5 h-5" />
                </div>
               <span> Call: 099 898 9999</span>
              </Link>
              <Link
                href="/track"
                className=" flex items-center space-x-2 text-slate-800 dark:text-slate-200"
              >
                <div className="flex items-center justify-center w-8 h-8 text-slate-100 dark:text-slate-800
                 bg-slate-500 rounded-full">

                <Truck className="w-5 h-5" />
                </div>
               <span> Track your Order</span>
              </Link>
              <Link
                href="/"
                className=" flex items-center space-x-2 text-slate-800 dark:text-slate-200"
              >
                <div className="flex items-center justify-center w-8 h-8 text-slate-100 dark:text-slate-800
                 bg-slate-500 rounded-full">

                <MessageCircleReply className="w-5 h-5" />
                </div>
               <span>Returns and Refunds</span>
              </Link>
              <Link
                href="/"
                className=" flex items-center space-x-2 text-slate-800 dark:text-slate-200"
              >
                <div className="flex items-center justify-center w-8 h-8 text-slate-100 dark:text-slate-800
                 bg-slate-500 rounded-full">

                <MessageSquare className="w-5 h-5" />
                </div>
               <span>Chat with Us</span>
              </Link>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
