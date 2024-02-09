import { Children, useState } from "react";

import "./App.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./components/navbar/Navbar";
import Homepage from "./components/homepage/Homepage";
import Footer from "./components/footer/Footer";
import Register from "./components/register/Register";
import Login from "./components/login/Login";
import Dashboard from "./components/dashboard/Dashboard";
import SinglePage from "./components/Singles/SinglePage";
import Messages from "./components/messages/Messages";
import SingleStorage from "./components/Singles/Singlestorage";
import Providersreg from "./components/register/Providersreg";

function App() {
  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <div className="app">
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Outlet />
        </QueryClientProvider>
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,

      children: [
        {
          path: "/",
          element: <Homepage />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/singlepage",
          element: <SinglePage />,
        },
        {
          path: "/messages",
          element: <Messages />,
        },
        {
          path: "/singlestorage",
          element: <SingleStorage />,
        },
        {
          path: "/serviceprovidersregister",
          element: <Providersreg />,
        },
        {
          path: "/serviceproviderslogin",
          element: <Providersreg />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
