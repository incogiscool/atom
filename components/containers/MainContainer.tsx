import { ReactNode } from "react";
import { Navbar } from "../nav/Navbar";
import Image from "next/image";
import LogoBlack from "@/public/atom-black.svg";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const MainContainer = async ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const footerOptions = [
    {
      title: "Get Started",
      link: "/blog/ed29f2f3-8482-4038-a3e0-71ebaa24bf6c",
    },
    {
      title: "Pricing",
      link: "/pricing",
    },
    {
      title: "Blog",
      link: "/blog",
    },
    {
      title: "Sign in",
      link: "/signin",
    },
    {
      title: "Sign up",
      link: "/signup",
    },
  ];

  return (
    <div className={"min-h-screen flex flex-col"}>
      <Navbar />
      <div className="sm:px-20 px-4 pt-8 min-h-screen flex flex-col justify-between">
        <main className={cn("h-full flex-1 my-36", className)}>{children}</main>
        <footer className="h-[100px] bg-black gap-8 p-4 rounded-tr-lg rounded-tl-lg flex items-center justify-center">
          <Link href={"/"}>
            <Image
              src={LogoBlack}
              width={50}
              height={50}
              alt="logo-black"
              className="invert"
            />
          </Link>
          <ul className="flex gap-4">
            {footerOptions.map((option) => (
              <Link href={option.link} key={option.link + option.title}>
                <li className="text-white">{option.title}</li>
              </Link>
            ))}
          </ul>
        </footer>
      </div>
    </div>
  );
};
