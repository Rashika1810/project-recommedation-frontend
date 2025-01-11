import React from "react";
import Navbar from "./Navbar";

export interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-violet-50">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 w-full z-10">
        <Navbar />
      </div>

      {/* Scrollable Main Content Area */}
      <div className="flex-1 scrollbar-hidden overflow-y-scroll pt-20 bg-white">
        <main className="p-2">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
