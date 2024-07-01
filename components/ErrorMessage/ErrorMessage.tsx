import { ReactNode } from "react";
import Link from "next/link";

import styles from "./errorMessage.module.scss";

export interface ErrorMessageProps {
  message?: string;
  btn?: ReactNode;
}
/**
 * @function ErrorMessage
 * @category Layout
 * @description ErrorMessage component.
 */
function ErrorMessage({ message, btn }: ErrorMessageProps) {
  return (
    <div className={styles.containerError}>
      <h2>{message ? message : "Oops, Something went wrong"}</h2>
      {btn ? (
        btn
      ) : (
        <Link className={styles.link} href="/">
          Back to Home
        </Link>
      )}
    </div>
  );
}
export default ErrorMessage;
