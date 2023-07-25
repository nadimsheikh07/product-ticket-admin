import GuestGuard from "@/auth/GuestGuard";
import Login from "@/sections/auth/Login";
import React from "react";

const LoginPage = () => {
  return (
    <GuestGuard>
      <Login />
    </GuestGuard>
  );
};

export default LoginPage;
