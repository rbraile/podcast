"use client";
import { useAppSelector } from "@/redux/store";
import { QueryStatus } from "@reduxjs/toolkit/query/react";

import styles from "./spinner.module.scss";

/**
 * @function Spinner
 * @category Spinner
 * @description Spinner component
 */
function Spinner() {
  const isLoading = useAppSelector((state) => {
    return Object.values(state.podcastApi.queries).some((query) => {
      return query && query.status === QueryStatus.pending;
    });
  });

  return isLoading && <span className={styles.loader}></span>;
}

export default Spinner;
