import Image from "next/image";
import LogoBlack from "@/public/atom-black.svg";
import Link from "next/link";
import { navOptions } from "@/lib/contants";
import { NavOptionIds } from "@/lib/types";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { signoutUser } from "@/lib/client/auth/signoutUser";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export const AppSidebarNav = ({
  active,
  email,
  name,
}: {
  active: NavOptionIds;
  email: string;
  name: string;
}) => {
  const router = useRouter();

  async function signout() {
    try {
      await signoutUser();

      router.push("/signin");
    } catch (err: any) {
      console.log(err);

      toast.error(err.message || err);
    }
  }

  return (
    <nav className="flex flex-col justify-between items-center h-screen p-6 py-12 w-[250px] border-r">
      <div className="flex flex-col items-center w-full">
        <Image height={40} width={40} alt="logo-black" src={LogoBlack} />
        <div className="mt-8 space-y-2 w-full">
          {navOptions.map((navOption) => (
            <Link
              href={navOption.link}
              key={navOption.id}
              className={`flex gap-4 items-center p-3 px-6 rounded-lg w-full hover:bg-black/75 transition hover:text-white ${
                active === navOption.id && "bg-black text-white"
              }`}
            >
              {navOption.icon}
              <p>{navOption.title}</p>
            </Link>
          ))}
        </div>
      </div>

      <Popover>
        <PopoverTrigger>
          <div className="w-full border text-left hover:bg-slate-100 transition p-3 rounded-lg text-slate-800">
            <p className="font-medium text-sm">{name}</p>
            <p className="text-slate-800 text-[12px] text-wrap break-all">
              {email}
            </p>
          </div>
        </PopoverTrigger>
        <PopoverContent className="w-[200px]">
          <p
            className="w-full hover:bg-slate-100 rounded-lg transition p-1 px-2 cursor-pointer"
            onClick={signout}
          >
            Sign out
          </p>
        </PopoverContent>
      </Popover>
    </nav>
  );
};
