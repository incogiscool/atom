"use client";
import { PlanDetailsPlan } from "@/lib/types";
import { Button } from "../ui/button";
import { IoIosCheckmark } from "react-icons/io";
import { useRouter } from "next/navigation";

export const PricingPlanCard = ({ plan }: { plan: PlanDetailsPlan }) => {
  const router = useRouter();

  async function onPlanButtonClick() {
    router.push("/app/settings/billing");
  }

  return (
    <div
      className={`h-[350px] w-[325px] p-4 border rounded-lg ${
        plan.active && "bg-black text-white"
      }`}
    >
      <p className="font-medium">{plan.title}</p>
      <p className="text-2xl font-semibold">
        {plan.price ? `$${plan.price}` : "Free, forever"}
      </p>
      <p className={`text-sm ${plan.active ? "text-white" : "text-slate-500"}`}>
        {plan.price && "per month"}
      </p>
      <p
        className={`text-sm mt-2 ${
          plan.active ? "text-white" : "text-slate-500"
        }`}
      >
        {plan.description}
      </p>

      <Button
        onClick={onPlanButtonClick}
        className={`my-4 w-full ${
          plan.active && "bg-white text-black hover:bg-slate-50"
        }`}
        disabled={plan.disabled}
      >
        {plan.disabled ? "Coming soon" : "Get started"}
      </Button>
      <ul className="space-y-1">
        {plan.features.map((feature) => (
          <li className="flex gap-2 items-center" key={feature}>
            <span
              className={`flex items-center justify-center ${
                plan.active ? "bg-white text-black" : "bg-black text-white"
              } w-[20px] h-[20px] rounded-full`}
            >
              <IoIosCheckmark fontSize={20} />
            </span>
            {feature}
          </li>
        ))}
      </ul>
    </div>
  );
};
