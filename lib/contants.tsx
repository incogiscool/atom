import { GoDatabase } from "react-icons/go";
import { IoSettingsOutline, IoWalletOutline } from "react-icons/io5";
import { Plan, PlanDetailsPlan } from "./types";

export const plans = ["single", "business"] as const;

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

export const baseAPIRoute =
  process.env.ENV === "prod"
    ? "https://atomcms.vercel.app/api"
    : "http://localhost:3000/api";

export const mongoDBURI = process.env.MONGO_DB_URI;

export const planDetails: PlanDetailsPlan[] = [
  {
    title: "Single",
    id: "single",
    price: null,
    description: "For writers who are just getting started.",
    max_docs: 100,
    max_body_length: 10000,
    max_projects: 2,
    features: [
      "2 projects",
      "100 posts per project",
      "10,000 character body length",
    ],
    active: false,
    disabled: false,
  },
  {
    title: "Business",
    id: "business",
    price: 12,
    description: "For established businesses and startups.",
    max_docs: 2500,
    max_body_length: 500000,
    max_projects: 5,
    features: [
      "5 projects",
      "2,500 posts per project",
      "50,000 character body length",
      "No watermark",
      "Dedicated support",
    ],
    active: false,
    disabled: true,
  },
];

export const npmPackage = "npm i atom-nextjs@latest";
