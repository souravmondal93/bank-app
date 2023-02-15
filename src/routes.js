// import
// import Dashboard from "views/Dashboard/Dashboard.js";
// import Tables from "views/Dashboard/Tables.js";
// import Billing from "views/Dashboard/Billing.js";
// import RTLPage from "views/RTL/RTLPage.js";
// import Profile from "views/Dashboard/Profile.js";
// import SignIn from "views/Pages/SignIn.js";
// import SignUp from "views/Pages/SignUp.js";

import {
  HomeIcon,
  StatsIcon,
  CreditIcon,
  PersonIcon,
  DocumentIcon,
  RocketIcon,
  SupportIcon,
} from "@/components/Icons/Icons";

const dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: <HomeIcon color='inherit' />,
    // component: Dashboard,
    layout: "/home",
  },
  {
    path: "/savings-account",
    name: "Savings Account",
    icon: <StatsIcon color='inherit' />,
    // component: Tables,
    layout: "/home",
  },
  {
    path: "/credit-card",
    name: "Credit Card",
    icon: <CreditIcon color='inherit' />,
    // component: Billing,
    layout: "/home",
  },
  {
    path: "/apply-card",
    name: "Apply Card",
    icon: <SupportIcon color='inherit' />,
    // component: RTLPage,
    layout: "/home",
  },
  {
    name: "ACCOUNT PAGES",
    category: "account",
    state: "pageCollapse",
    views: [
      {
        path: "/profile",
        name: "Profile",
        icon: <PersonIcon color='inherit' />,
        secondaryNavbar: true,
        // component: Profile,
        layout: "/home",
      },
      {
        path: "/signin",
        name: "Sign In",
        icon: <DocumentIcon color='inherit' />,
        // component: SignIn,
        layout: "/auth",
      },
      {
        path: "/signup",
        name: "Sign Up",
        icon: <RocketIcon color='inherit' />,
        secondaryNavbar: true,
        // component: SignUp,
        layout: "/auth",
      },
    ],
  },
];
export default dashRoutes;
