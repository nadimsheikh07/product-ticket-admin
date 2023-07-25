"use client"; // Error components must be Client Components

import Page500 from "@/sections/500";
import { useEffect } from "react";

export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("ServerError", error);
  }, []);

  return (
    <div>
      <Page500 error={error} onClick={() => reset()} />
    </div>
  );
}
