import Home from "./Pages/Home";
import Panel from "./Pages/Panel";

export const routes = [
  {
    path: "/",
    element: Home,
    isProtected: false,
  },
  {
    path: "/panel",
    element: Panel,
    isProtected: true,
  },
];
