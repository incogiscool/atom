import { GoDatabase } from "react-icons/go";
import { IoSettingsOutline, IoWalletOutline } from "react-icons/io5";
import { Plan, PlanDetailsPlan } from "./types";

export const plans = ["single", "startup", "business"] as const;

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
  process.env.NEXT_PUBLIC_ENV === "prod"
    ? "https://cmsatom.netlify.app/api"
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
    features: ["1 project", "100 total posts", "10,000 character body length"],
    active: false,
    disabled: false,
  },
  {
    title: "Startup",
    id: "startup",
    price: 3.99,
    description: "For startups who want to build their own blog.",
    max_docs: 1000,
    max_body_length: 100000,
    max_projects: 3,
    features: [
      "3 projects",
      "1,000 total posts",
      "25,000 character body length",
      "No watermark",
      "Dedicated support",
    ],
    active: false,
    disabled: true,
  },
  {
    title: "Business",
    id: "business",
    price: 11.99,
    description: "For established businesses and enterprises.",
    max_docs: 2500,
    max_body_length: 500000,
    max_projects: 5,
    features: [
      "5 projects",
      "5,000 total posts",
      "50,000 character body length",
      "No watermark",
      "Dedicated support",
    ],
    active: false,
    disabled: true,
  },
];

export const npmPackage = "npm i atom-nextjs@latest";
