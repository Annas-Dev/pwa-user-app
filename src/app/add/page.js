"use client";
import * as React from "react";
import PageContent from "./pageContent.js";
export default function Home(props) {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <PageContent {...props} />
    </React.Suspense>
  );
}
