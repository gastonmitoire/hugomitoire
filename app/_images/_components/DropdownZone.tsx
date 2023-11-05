import React, { useRef } from "react";

interface DropdownZoneProps {
  onDrop: (files: FileList) => void;
  children: React.ReactNode;
  multiple?: boolean; // Prop opcional para permitir múltiples archivos
}

export function DropdownZone({
  onDrop,
  children,
  multiple = false,
}: DropdownZoneProps) {
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
        multiple={multiple} // Utiliza el prop "multiple" para habilitar/deshabilitar la carga múltiple
        className="hidden"
        onChange={handleFileInput}
      />
      {children}
    </div>
  );
}
