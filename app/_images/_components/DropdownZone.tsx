import React, { useRef } from "react";

interface DropdownZoneProps {
  onDrop: (files: FileList | File | null) => void;
  children: React.ReactNode;
  multiple?: boolean; // Prop opcional para permitir múltiples archivos
  className?: string;
}

export function DropdownZone({
  onDrop,
  children,
  multiple = false,
  className,
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
      className={`border-2 border-dashed border-light p-4 ${className}`}
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
