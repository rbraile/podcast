"use client";
import React, { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css"; // Import NProgress styles

import styles from "./spinner.module.scss";

/**
 * @function Spinner
 * @category Spinner
 * @description Spinner component
 */
function Spinner() {
  let pathname = usePathname();
  let searchParams = useSearchParams();

  useEffect(() => {
    const handleStart = () => NProgress.start();
    const handleStop = () => NProgress.done();
    handleStop();

    return () => {
      handleStart();
    };
  }, [pathname, searchParams]);

  return <span className={styles.loader}></span>;
}

export default Spinner;
