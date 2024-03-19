"use client";
import { npmPackage } from "@/lib/contants";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { FaDollarSign } from "react-icons/fa";
import { GoCopy } from "react-icons/go";

export const NpmPackageComponent = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "p-3 bg-black rounded-lg text-sm text-white flex gap-4 items-center",
        className
      )}
    >
      <span className="flex gap-1 items-center">
        <FaDollarSign />
        <span>{npmPackage}</span>
      </span>
      <GoCopy
        className="cursor-pointer"
        onClick={() => {
          navigator.clipboard.writeText(npmPackage);
          toast.success("Successfuly copied to clipboard.");
        }}
      />
    </div>
  );
};
