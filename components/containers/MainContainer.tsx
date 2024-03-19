import { ReactNode } from "react";
import { Navbar } from "../nav/Navbar";
import Image from "next/image";
import LogoBlack from "@/public/atom-black.svg";
import Link from "next/link";

export const MainContainer = async ({ children }: { children: ReactNode }) => {
  const footerOptions = [
    {
      title: "Get Started",
      link: "/get-started",
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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="px-20 pt-8">
        <main className="h-full flex-1 my-36">{children}</main>
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
              <Link href={option.link}>
                <li className="text-white">{option.title}</li>
              </Link>
            ))}
          </ul>
        </footer>
      </div>
    </div>
  );
};
