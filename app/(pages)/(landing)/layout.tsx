import { Footer } from "@/app/_shared/_components";
import { ReactNode } from "react";

interface LandingLayoutProps {
  children: ReactNode;
}

export default function LandingLayout({ children }: LandingLayoutProps) {
  return (
    <>
      {children}
      <Footer />
    </>
  );
}
