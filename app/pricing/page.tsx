import { MainContainer } from "@/components/containers/MainContainer";
import { Button } from "@/components/ui/button";
import { planDetails } from "@/lib/contants";
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
            <div
              className={`h-[350px] w-[325px] p-4 border rounded-lg ${
                plan.active && "bg-black text-white"
              }`}
            >
              <p className="font-medium">{plan.title}</p>
              <p className="text-2xl font-semibold">
                {plan.price ? `$${plan.price}` : "Free, forever"}
              </p>
              <p
                className={`text-sm ${
                  plan.active ? "text-white" : "text-slate-500"
                }`}
              >
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
                className={`my-4 w-full ${
                  plan.active && "bg-white text-black hover:bg-slate-50"
                }`}
              >
                Get started
              </Button>
              <ul className="space-y-1">
                {plan.features.map((feature) => (
                  <li className="flex gap-2 items-center">
                    <span
                      className={`flex items-center justify-center ${
                        plan.active
                          ? "bg-white text-black"
                          : "bg-black text-white"
                      } w-[20px] h-[20px] rounded-full`}
                    >
                      <IoIosCheckmark fontSize={20} />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </MainContainer>
  );
};

export default Page;
