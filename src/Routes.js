import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import App from "./components/App";
import Todo from "./pages/Todo";

export default [
  {
    ...App,
    routes: [
      {
        ...Home,
        path: "/",
        exact: true
      },
      {
        ...About,
        path: "/about"
      },
      {
        ...Todo,
        path: "/todo"
      },
      {
        ...NotFound
      }
    ]
  }
];
