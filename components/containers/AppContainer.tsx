import { NavOptionIds, Plan } from "@/lib/types";
import { AppSidebarNav } from "../sidebars/AppSidebarNav";
import { ReactNode } from "react";

export const AppContainer = ({
  active,
  email,
  first_name,
  plan,
  children,
}: {
  active: NavOptionIds;
  email: string;
  first_name: string;
  plan: Plan;
  children: ReactNode;
}) => {
  return (
    <div className="flex gap-12">
      <AppSidebarNav
        active={active}
        email={email}
        name={first_name}
        plan={plan}
      />
      <main className="flex-1 h-screen py-12 p-6">{children}</main>
    </div>
  );
};
