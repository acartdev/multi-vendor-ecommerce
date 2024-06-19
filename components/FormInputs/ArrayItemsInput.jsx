"use client";
import React, { useState } from "react";
import { Plus, X } from "lucide-react";

export default function ArrayItemsInput({ setItems, items = [], itemTitle }) {
  const [item, setItem] = useState("");
  const [showItemsForm, setShowItemsForm] = useState(false);

  const addItem = () => {
    if (!item) return;
    setItems([...items, item]);
    setItem("");
  };

  const removeItem = (index) => {
    const newItem = [...items];
    newItem.splice(index, 1);
    setItems(newItem);
  };

  return (
    <div className="sm:col-span-2">
      {showItemsForm ? (
        <div className="flex items-center w-full">
          <div className="relative w-full">
            <input
              value={item}
              onChange={(e) => setItem(e.target.value)}
              type="text"
              id="voice-search"
              className="block py-3  ps-10 text-sm text-gray-900 border-2 border-gray-300
            rounded-lg  bg-white focus:ring-slate-700 focus:border-slate-700
           dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white
           dark:focus:ring-slate-400 dark:focus:border-slate-400 w-full shadow-inner"
              placeholder={`Create a ${itemTitle}`}
            />
          </div>
          <button
            onClick={addItem}
            type="button"
            className=" transition-all inline-flex items-center rounded-lg
          py-3 px-3 ms-2 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800
          dark:bg-gray-900  hover:dark:bg-gray-800 "
          >
            <Plus
              className="w4
           h-4 me-2"
            />{" "}
            Add
          </button>

          <button
            onClick={() => setShowItemsForm(false)}
            type="button"
            className=" transition-all inline-flex items-center rounded-full
          py-2 px-2 ms-2 text-sm font-medium text-white bg-red-700 hover:bg-red-900
          dark:bg-red-600  hover:dark:bg-red-600 "
          >
            <X />
          </button>
        </div>
      ) : (
        <button
          onClick={() => setShowItemsForm(true)}
          type="button"
          className=" flex items-center space-x-2
      text-slate-800 dark:text-slate-300 py-2 px-4 "
        >
          <Plus /> <span>Add {itemTitle}</span>
        </button>
      )}
      <div className="flex flex-wrap gap-4 w-full mt-4">
        {items.map((it, i) => {
          return (
            <div
              key={i}
              onClick={() => removeItem(i)}
              className="flex space-x-2 items-center text-gray-700
          dark:text-gray-50  bg-gray-200 dark:bg-gray-600 px-4 py-2
          rounded-lg cursor-pointer shadow-sm"
            >
              <p>{it}</p>
              <X className="w-4 h-4" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
