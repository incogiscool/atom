import { SignupForm } from "@/components/forms/SignupForm";
import { Metadata } from "next";
import AtomLogoBlack from "@/public/atom-black.svg";
import Image from "next/image";
import { HiArrowLongLeft } from "react-icons/hi2";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign up to Atom",
  description:
    "Sign up to Atom - You're one step closer to using the CMS designed for NextJS developers, by NextJS developers.",
};

const Signup = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6 p-12">
      <Link href={"/"} className="absolute top-0 left-0 m-12">
        <div className="flex gap-2 items-center border py-3 px-5 text-center hover:bg-slate-100 transition rounded-md">
          <HiArrowLongLeft className="text-2xl" />
          <p>Back to home</p>
        </div>
      </Link>
      <Image src={AtomLogoBlack} width={50} height={50} alt="atom-black" />
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold">Sign up to Atom</h1>
        <p className="text-slate-600 max-w-xl">
          You&#39;re one step closer to using the CMS designed for NextJS
          developers, by NextJS developers.
        </p>
      </div>
      <SignupForm />
    </div>
  );
};

export default Signup;
