"use client";
import React, { useState } from "react";
import { Modal } from "flowbite-react";
import {
  Headphones,
  MessageCircleReply,
  MessageSquare,
  Share2,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { ShareSocial } from "react-share-social";

export default function ProductShareButton({urlToShare}) {
  const [openModal, setOpenModal] = useState(false);
  const style = {
    root: {
      background: 'transparent',
      borderRadius: 3,
      border: 0,
      color: 'white',
    },
    copyContainer: {
      border: '1px solid blue ',
      background: 'rgb(0,0,0,0.6)'
    },
    title: {
      color: 'blue',
      fontStyle: 'italic'
    }
  };
  
  return (
    <>
      <button
        onClick={() => setOpenModal(true)}
        className="flex items-center justify-center space-x-1 text-slate-900 dark:text-slate-200"
      >
        {" "}
        <Share2 />
      </button>
      <Modal show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Share social</Modal.Header>
        <Modal.Body>
            <ShareSocial
              url={urlToShare}
              socialTypes={["facebook", "line", "whatsapp"]}
              style={style}
            />
        </Modal.Body>
      </Modal>
    </>
  );
}
