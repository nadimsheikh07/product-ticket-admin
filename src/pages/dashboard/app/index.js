// import AppSection from "@/sections/dashboard/app";
import DashboardLayout from "@/layouts/dashboard/DashboardLayout";
import DashboardSection from "@/sections/dashboard/app";
export const metadata = {
  title: "Product Ticket Dashboard",
  description: "...",
};

const App = () => { 
  return  <DashboardSection />;
};
App.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
export default App;
