import {
  HomeIcon,
  StatsIcon,
  CreditIcon,
  SupportIcon,
} from "@/components/atoms/icons/all-icons";

const dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <HomeIcon color='inherit' />,
    layout: "/home",
  },
  {
    path: "/savings-account",
    name: "Savings Account",
    icon: <StatsIcon color='inherit' />,
    layout: "/home",
  },
  {
    path: "/credit-card",
    name: "Credit Card",
    icon: <CreditIcon color='inherit' />,
    layout: "/home",
  },
  {
    path: "/apply-card",
    name: "Apply Card",
    icon: <SupportIcon color='inherit' />,
    layout: "/home",
  },
];
export default dashRoutes;
