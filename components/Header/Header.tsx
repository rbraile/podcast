import Link from "next/link";

import Spinner from "@/components/Spinner";

import styles from "./header.module.scss";

/**
 * @function Header
 * @category Layout
 * @description header page.
 */
function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>
        <Link href="/">Podcaster</Link>
      </h1>
      <Spinner />
    </header>
  );
}
export default Header;
