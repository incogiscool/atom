import { GoDatabase } from "react-icons/go";
import { IoSettingsOutline, IoWalletOutline } from "react-icons/io5";

export const plans = ["free", "business", "enterprise"] as const;

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

export const maxInputLength = 20;
export const projectTitleMaxLength = 20;

export const baseAPIRoute = "http://localhost:3000/api";
export const mongoDBURI = process.env.MONGO_DB_URI;
