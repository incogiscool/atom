import { ReactNode } from "react";
import { Navbar } from "../nav/Navbar";

export const MainContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="px-20 p-8 pt-36 pb-12">
        <main className="h-full flex-1">{children}</main>
        <footer>footer</footer>
      </div>
    </div>
  );
};
