// import AppSection from "@/sections/dashboard/app";
import DashboardLayout from "@/layouts/dashboard/DashboardLayout";
import DashboardSection from "@/sections/dashboard/app";
import React from "react";
export const metadata = {
  title: "Product Ticket Dashboard",
  description: "...",
};

const App = () => {
  return (
    <DashboardLayout>
      <DashboardSection />
    </DashboardLayout>
  );
};

export default App;
