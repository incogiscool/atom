import LogoBlack from "@/public/atom-black.svg";
import { FaArrowRightLong, FaGithub } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { validateRequest } from "@/lib/server/lucia/functions/validaterequest";
import { connectToDatabase } from "@/lib/server/mongo/init";
import { User } from "lucia";

export const Navbar = async () => {
  let user: User | null = null;

  try {
    await connectToDatabase();
    const res = await validateRequest();
    user = res.user;
  } catch (err: any) {}

  const navOptions = [
    {
      title: "Get started",
      link: "/blog/id-rigthhere",
    },
    {
      title: "Pricing",
      link: "/pricing",
    },
    {
      title: "Blog",
      link: "/blog",
    },
  ];

  return (
    <div className="px-20 p-8 w-full fixed z-50">
      <nav className="flex gap-4 justify-between items-center flex-wrap border rounded-full p-4 w-full backdrop-blur-md shadow-lg">
        <div className="flex items-center gap-8">
          <Link href={"/"}>
            <Image src={LogoBlack} width={40} height={40} alt="logo-black" />
          </Link>
          <ul className="flex gap-6 items-center">
            {/* <a href="youtubevideo" target="_blank">
              <li>Tutorial</li>
            </a> */}

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
          <a href="https://github.com/incogiscool/atom" target="_blank">
            <FaGithub fontSize={24} />
          </a>

          {user ? (
            <Link href={"/app"}>
              <Button className="flex items-center gap-2">
                Go to app <FaArrowRightLong />
              </Button>
            </Link>
          ) : (
            <div className="flex gap-6 items-center">
              <Link href={"/signin"}>
                <p>Sign in</p>
              </Link>
              <Link href={"/signup"}>
                <Button className="rounded-lg">Sign up</Button>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};
