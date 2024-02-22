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

import Upload from "./components/Upload/Upload";
import Sidebar from "./components/ProvidersDashboard/Sidebar";
import Storageservices from "./components/dashboard/Storageservices";
import MyTrips from "./components/Trips/Mytrips";
import ClientOrders from "./components/Orders/ClientOrders";
import Providerslogin from "./components/login/Providerslog";
import ProviderMessage from "./components/ProvidersDashboard/Providermessage";
import Messagespro from "./components/messages/Messagespro";
import SingleTripComponent from "./components/Singles/SingleTripComponent ";
import SingleOrders from "./components/Singles/Singleorders";
import CompletedSingleReport from "./components/Singles/CompletedSingleReport";
import SingleTrips from "./components/Singles/SingleTrips";

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
          path: "/trips/:id",
          element: <SingleTrips />,
        },
        {
          path: "/tripdetails/:id",
          element: <SingleTripComponent />,
        },
        {
          path: "/clientongoingorders",
          element: <ClientOrders />,
        },
        {
          path: "/orderdetails/:id",
          element: <SingleOrders />,
        },
        {
          path: "/singlepage/:id",
          element: <SinglePage />,
        },
        {
          path: "/messages/:id",
          element: <Messages />,
        },
        {
          path: "/messagesproviders",
          element: <ProviderMessage />,
        },
        {
          path: "/checkmessages/:uniqueid",
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
          element: <Providerslogin />,
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
          path: "/reports/:id",
          element: <CompletedSingleReport />,
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
