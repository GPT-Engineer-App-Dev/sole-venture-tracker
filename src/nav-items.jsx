import { Home } from "lucide-react";
import Index from "./pages/Index.jsx";

export const navItems = [
  {
    title: "Sneaker Accounting",
    to: "/",
    icon: <Home className="h-4 w-4" />,
    page: <Index />,
  },
];