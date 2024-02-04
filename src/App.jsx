import { Children, useState } from "react";

import "./App.css";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Navbar from "./components/navbar/Navbar";
import Homepage from "./components/homepage/Homepage";
import Footer from "./components/footer/Footer";

function App() {
  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <div className="app">
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Outlet />
          <Footer />
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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
