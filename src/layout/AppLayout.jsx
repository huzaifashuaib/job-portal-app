import Header from "@/components/header/Header";
import React from "react";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <div className="grid-background"></div>
      <main className="min-h-screen container mx-auto px-3">
        <Header />
        <Outlet />
      </main>
      <footer className="py-3 text-center bg-gray-800 text-lg mt-12">
        Made with 💻 by Huzaifa Shoaib
      </footer>
    </div>
  );
};

export default AppLayout;
