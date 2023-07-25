"use client";
import { m } from "framer-motion";
// next
import Head from "next/head";
import NextLink from "next/link";
// @mui
import { Button, Typography } from "@mui/material";
// layouts
import CompactLayout from "@/layouts/compact/CompactLayout";

// components
import { MotionContainer, varBounce } from "@/components/animate";

// assets
import { SeverErrorIllustration } from "@/assets/illustrations";

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------

export default function Page500({ onClick, error }) {
  return (
    <>
      <Head>
        <title> 500 Internal Server Error | Digital UI</title>
      </Head>
      <CompactLayout>
        <MotionContainer>
          <m.div variants={varBounce().in}>
            <Typography variant="h3" paragraph>
              500 Internal Server Error
            </Typography>
          </m.div>

          <m.div variants={varBounce().in}>
            <Typography color="error" fontWeight={700}>
              {error?.name || "There was an error, please try again later."}
            </Typography>
            <Typography color="error" fontWeight={800}>
              {error?.message}
            </Typography>
          </m.div>

          <m.div variants={varBounce().in}>
            <SeverErrorIllustration
              sx={{ height: 260, my: { xs: 5, sm: 10 } }}
            />
          </m.div>

          <Button
            onClick={onClick}
            // component={NextLink}
            // href="/"
            size="large"
            variant="contained"
          >
            Go to Home
          </Button>
        </MotionContainer>
      </CompactLayout>
    </>
  );
}
