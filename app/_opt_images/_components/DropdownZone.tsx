import React, { useRef } from "react";

interface DropdownZoneProps {
  onDrop: (files: FileList) => void;
  children: React.ReactNode;
}

export function DropdownZone({ onDrop, children }: DropdownZoneProps) {
  const dropZoneRef = useRef(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const { files } = e.dataTransfer;
    onDrop(files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files) {
      onDrop(files);
    }
  };

  return (
    <div
      ref={dropZoneRef}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{ border: "2px dashed #ccc", padding: "20px" }}
    >
      <input
        type="file"
        accept="image/*"
        multiple={true}
        className="hidden"
        onChange={handleFileInput}
      />
      {children}
    </div>
  );
}
