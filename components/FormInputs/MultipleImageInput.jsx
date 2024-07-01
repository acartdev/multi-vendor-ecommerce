import { UploadDropzone } from "@/lib/uploadthing";
import { Pencil, XCircle } from "lucide-react";
import Image from "next/image";
import React from "react";
import toast from "react-hot-toast";

export default function MultipleImageInput({
  label,
  imagesUrl = [],
  setImagesUrl,
  className = "col-span-full",
  endpoint = "",
  
}) {

const handleImageRemove=(imageIndex)=>{
  const updateImages = imagesUrl.filter((image,i)=> i !== imageIndex) 
  setImagesUrl(updateImages)
}
  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-4">
        <label
          htmlFor="course-image"
          className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-50 mb-2 "
        >
          {label}
        </label>
      </div>
      {imagesUrl.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-4">
          {imagesUrl.map((imageUrl, i) => {
            return (
              <div className=" relative " key={i}>
                <button className="absolute -top-4 -right-4 bg-white text-slate-950 rounded-full p-1" onClick={()=>handleImageRemove(i)}>
                  <XCircle />
                </button>
                <Image
                  src={imageUrl}
                  alt="Item image"
                  width={1000}
                  height={667}
                  className="w-full h-auto sm:h-32 object-cover"
                />
              </div>
            );
          })}
        </div>
      ) : (
        <UploadDropzone
          className=" transition-all duration-300 cursor-pointer border-2 
        hover:border-slate-700 dark:border-slate-500  hover:dark:border-slate-400 
        ut-upload-icon:text-slate-700
        dark:ut-upload-icon:text-slate-400
        ut-label:text-slate-800
        dark:ut-label:text-slate-300
        dark:ut-allowed-content:ut-ready:text-slate-300
        dark:ut-allowed-content:ut-readying:text-slate-300
        dark:ut-allowed-content:ut-uploading:text-slate-300
        ut-button:text-slate-50
        ut-button:bg-slate-700
        dark:ut-button:text-slate-900
        dark:ut-button:bg-slate-400"
          endpoint={endpoint}
          onClientUploadComplete={(res) => {
            // Do something with the response
            const urls = res.map((item) => item.url);
            setImagesUrl(urls);
            toast.success("Upload Completed");
            console.log("Files: ", res);
            console.log("Upload Completed");
          }}
          onUploadError={(error) => {
            // Do something with the error.
            toast.error("Upload Failed, Try Again");
            console.log(`ERROR! ${error.message}`, error);
          }}
        />
      )}
    </div>
  );
}
