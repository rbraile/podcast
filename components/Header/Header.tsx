"use client";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

import Spinner from "@/components/Spinner";

import styles from "./header.module.scss";
import { useAppSelector } from "@/redux/store";
import { QueryStatus } from "@reduxjs/toolkit/query/react";
import { useEffect, useState, useTransition } from "react";

/**
 * @function Header
 * @category Layout
 * @description header page.
 */
function Header() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [navigationLoading, setNavigationLoading] = useState(false);

  useEffect(() => {
    console.log(`isPending----------${isPending}`);
    console.log(`search--------${searchParams}`);
    // const start = () => {
    //   setNavigationLoading(true);
    // };
    // const end = () => {
    //   setNavigationLoading(false);
    // };
  }, [pathname, searchParams]);

  const isLoading = useAppSelector((state) => {
    return Object.values(state.podcastApi.queries).some((query) => {
      return query && query.status === QueryStatus.pending;
    });
  });

  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        <Link href="/">Podcaster</Link>
      </h1>
      {isLoading && <Spinner />}
    </header>
  );
}
export default Header;
