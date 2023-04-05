import React, { useState } from "react";
import { FaUpload } from "react-icons/fa";

type ImageUploaderProps = {
  onUpload: (file: File) => void;
};

const ImageUploader: React.FC<ImageUploaderProps> = ({ onUpload }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      onUpload(file);
      const reader = new FileReader();
      reader.onload = () => {
        setImageUrl(reader.result as string);
        const base64String = reader.result?.toString().split(";base64,")[1];
        console.log("Base 64", base64String); // base64 string of the selected image
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-row items-center gap-6 mt-4">
      <label
        title="Upload your photo"
        className="relative w-9/12 h-32 bg-[#DDD] rounded-lg cursor-pointer"
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="w-0 h-0"
        />

        {selectedFile ? (
          <span className="abs-center"> {selectedFile.name}</span>
        ) : (
          <div className="abs-center flex flex-col gap-3 items-center justify-center">
            <FaUpload size={50} className="text-[#EEE]" />
            <span className="text-[13px] text-text_light opacity-60">
              Click Here to upload photo
            </span>
          </div>
        )}
      </label>

      <div className="relative w-32 h-32 rounded-lg border">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Selected file"
            className="w-32 h-32 rounded-lg z-20"
          />
        ) : (
          <span className="text-[11px] text-center abs-center opacity-60 z-10">
            Your image will be displayed here
          </span>
        )}
      </div>
    </div>
  );
};

export default ImageUploader;
