import { GoDatabase } from "react-icons/go";
import { IoSettingsOutline, IoWalletOutline } from "react-icons/io5";
import { Plan } from "./types";

export const plans = ["free", "business"] as const;

export const navOptions = [
  {
    title: "Projects",
    id: "projects",
    link: "/app",
    icon: <GoDatabase />,
  },
  {
    title: "Billing",
    id: "billing",
    link: "/app/settings/billing",
    icon: <IoWalletOutline />,
  },
  {
    title: "Settings",
    id: "settings",
    link: "/app/settings",
    icon: <IoSettingsOutline />,
  },
] as const;

export const maxInputLength = 30;
export const projectTitleMaxLength = 50;

export const baseAPIRoute = "http://localhost:3000/api";
export const mongoDBURI = process.env.MONGO_DB_URI;

export const planDetails: {
  title: string;
  id: Plan;
  price: number | null;
  description: string;
}[] = [
  {
    title: "Free",
    id: "free",
    price: null,
    description: "idk tis is the free pla",
  },
  {
    title: "Business",
    id: "business",
    price: 12,
    description: "bruh thsi the busiens plan",
  },
];
