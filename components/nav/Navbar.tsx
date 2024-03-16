import LogoBlack from "@/public/atom-black.svg";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

export const Navbar = () => {
  const navOptions = [
    {
      title: "Get Started",
      link: "/get-started",
    },
    {
      example: "Blog",
      link: "/blog",
    },
    {
      title: "Pricing",
      link: "/pricing",
    },
  ];

  return (
    <div className="px-20 p-8 w-full fixed z-50">
      <nav className="flex gap-4 justify-between items-center flex-wrap border rounded-full p-4 w-full backdrop-blur-md shadow-lg">
        <div className="flex items-center gap-6">
          <Image src={LogoBlack} width={40} height={40} alt="logo-black" />
          <ul className="flex gap-4 items-center">
            {navOptions.map((option) => {
              return (
                <Link href={option.link}>
                  <li>{option.title}</li>
                </Link>
              );
            })}
          </ul>
        </div>
        <div className="flex gap-6 items-center">
          <Link href={"/signin"}>
            <p>Sign in</p>
          </Link>
          <Link href={"/signup"}>
            <Button className="rounded-full">Sign up</Button>
          </Link>
        </div>
      </nav>
    </div>
  );
};
