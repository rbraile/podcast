"use client";
import Link from "next/link";
import styles from "./error.module.scss";

function Error() {
  return (
    <div className={styles.containerError}>
      <h2>Oops, there is an error!</h2>
      <Link className={styles.link} href="/">
        Back to Home
      </Link>
    </div>
  );
}

export default Error;
