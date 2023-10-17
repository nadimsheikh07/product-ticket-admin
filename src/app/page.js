"use client";
import LoadingScreen from "@/components/loading-screen/LoadingScreen";
import DashboardLayout from "@/layouts/dashboard/DashboardLayout";
import { PATH_DASHBOARD } from "@/routes/paths";
import { useRouter } from "next/navigation";
import React from "react";

export default function Home() {
  const router = useRouter();
  React.useEffect(() => {
    router.push(PATH_DASHBOARD.app);
  }, []);

  return (
    <DashboardLayout>
      <LoadingScreen />
    </DashboardLayout>
  );
}
