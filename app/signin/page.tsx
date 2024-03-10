import { LoginForm } from "@/components/forms/LoginForm";
import Image from "next/image";
import Link from "next/link";
import { HiArrowLongLeft } from "react-icons/hi2";
import AtomLogoBlack from "@/public/atom-black.svg";

const LoginPage = () => {
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
        <h1 className="text-4xl font-bold">Log in to Atom</h1>
        <p className="text-slate-600 max-w-xl">
          Welcome back! Log in to Atom and get started right away.
        </p>
      </div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
