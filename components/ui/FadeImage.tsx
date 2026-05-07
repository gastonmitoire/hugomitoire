"use client";

import React, { useEffect, useRef, useState } from "react";
import NextImage, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";

type FadeImageProps = ImageProps & {
  duration?: number;
  finalOpacity?: number;
};

export function FadeImage({
  className,
  style,
  duration = 700,
  finalOpacity = 1,
  onLoad,
  ...props
}: FadeImageProps) {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (ref.current?.complete) setLoaded(true);
  }, []);

  return (
    <NextImage
      ref={ref}
      {...props}
      className={cn(className)}
      style={{
        ...style,
        opacity: loaded ? finalOpacity : 0,
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`,
      }}
      onLoad={(e) => {
        setLoaded(true);
        onLoad?.(e);
      }}
    />
  );
}
