import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Auth from "./components/Auth";
import Hero from "./components/Hero";
import Home from "./components/Home";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: localStorage.getItem("isLoggedIn")==="true"?(<Navigate to='/home'/>):(<Hero />)},
    { path: "/login", element: localStorage.getItem("isLoggedIn")==="true"?(<Navigate to='/home'/>):(<Auth type="login"/>) },
    { path: "/register", element: localStorage.getItem("isLoggedIn")==="true"?(<Navigate to='/home'/>):(<Auth type="register"/>) },
    { path: "/home/*", element: (<Home />)},
    { path: "/logout", element: (<Hero logout={true} />)}
  ]);
  return (
    <RouterProvider router={router} />
  );
}

export default App;
