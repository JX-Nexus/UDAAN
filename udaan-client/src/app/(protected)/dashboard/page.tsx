"use client";
import Head from "next/head";
import Link from "next/link";

export default function Page() {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
        <title>User Dashboard</title>
      </Head>

      <Link href="/quiz">Go to Quiz</Link>
    </>
  );
}
