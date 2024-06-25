import { FC } from "react";
import { useRouter } from "next/router";
import styles from "./header.module.scss";

/**
 * @function Header
 * @category Layout
 * @description header page.
 */
const Header: FC<Record<string, never>> = () => {
  const router = useRouter();

  return (
    <header className={styles.header}>
      <h2>HEADER</h2>
    </header>
  );
};
export default Header;
