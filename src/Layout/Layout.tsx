import React from "react";
export interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Main Content Area */}
      <div className="p-4">
        {/* Main Page Content */}
        <main className="">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
