import Header from "@/components/header/Header";
import React, { useContext } from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <div className="grid-background"></div>
      <main className="min-h-screen container mx-auto px-3">
        <Header />
        <Outlet />
      </main>
      <footer className="py-2 text-center bg-gray-800 text-lg mt-10">
        Made with 💻 by Huzaifa Shoaib
      </footer>
    </div>
  );
};

export default AppLayout;
