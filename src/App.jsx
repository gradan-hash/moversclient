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
import ProvidersDash from "./components/ProvidersDashboard/ProvidersDash";
import CurrentOrders from "./components/Orders/CurrentOrders";
import OngoingOrders from "./components/Orders/OngoingOrders";
import Reports from "./components/Orders/Reports";
import Messagespro from "./components/messages/messagespro";
import Upload from "./components/Upload/Upload";
import Sidebar from "./components/ProvidersDashboard/Sidebar";
import Storageservices from "./components/dashboard/Storageservices";
import MyTrips from "./components/Trips/Mytrips";

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
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/",
          element: <Dashboard />,
        },
        {
          path: "/storage services",
          element: <Storageservices />,
        },
        {
          path: "/mytrips",
          element: <MyTrips />,
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
          path: "/checkmessages",
          element: <Messagespro />,
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
        {
          path: "/providerdashboard",
          element: <ProvidersDash />,
        },
        {
          path: "/currentorders",
          element: <CurrentOrders />,
        },
        {
          path: "/ongoingorders",
          element: <OngoingOrders />,
        },
        {
          path: "/reports",
          element: <Reports />,
        },
        {
          path: "/uploaditems",
          element: <Upload />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
