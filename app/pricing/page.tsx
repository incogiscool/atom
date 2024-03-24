import { PricingPlanCard } from "@/components/cards/PricingPlanCard";
import { MainContainer } from "@/components/containers/MainContainer";
import { Button } from "@/components/ui/button";
import { planDetails } from "@/lib/contants";
import Link from "next/link";
import { IoIosCheckmark } from "react-icons/io";

const Page = () => {
  return (
    <MainContainer>
      <div className="flex flex-col items-center justify-center">
        <div className="gap-2 text-center flex flex-col items-center justify-center">
          <p className="text-xl font-medium">Pricing</p>
          <div className="h-[1px] w-[50px] bg-black" />
          <h1 className="text-4xl font-semibold">Plans for all your needs.</h1>
          <p className="max-w-lg">
            Build your blogs and articles 10x faster and easier. Get started for
            free, or upgrade to a paid plan
          </p>
        </div>
        <div className="mt-12 flex gap-12 justify-center">
          {planDetails.map((plan) => (
            <PricingPlanCard plan={plan} key={plan.id} />
          ))}
        </div>
      </div>
    </MainContainer>
  );
};

export default Page;
