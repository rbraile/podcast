import { ReactNode } from "react";
import clsx from "clsx";
import styles from "./main.module.scss";

export interface MainProps {
  children: ReactNode;
  className: string;
}

/**
 * @function Main
 * @category Layout
 * @description Component wrapping the main content of the page for style purposes.
 */
function Main({ children, className }: MainProps) {
  return <main className={clsx(styles.main, className)}>{children}</main>;
}

export default Main;
