// 'use client';
import GuestGuard from "@/auth/GuestGuard";
import Login from "@/sections/auth/Login";
import Head from "next/head";
import React from "react";

export const metadata = {
  title: 'Product Ticket login page',
  description: '...',
}
const LoginPage = () => {
  return (
    <>
      {/* <Head>
        <title>login</title>
      </Head> */}
      <GuestGuard>
        <Login />
      </GuestGuard>
    </>
  );
};

export default LoginPage;
