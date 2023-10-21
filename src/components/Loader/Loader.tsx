import styles from "./Loader.module.css";
import { ReactNode } from "react";

type LoaderProps = {
  loading: boolean;
  children: ReactNode;
};

function Loader({ loading, children }: LoaderProps) {
  return (
    <div className={styles.loaderWrapper}>
      {loading && <div className={styles.dimBackground}></div>}
      {loading && (
        <div className={styles.loaderContainer}>
          <div className={styles.spinner}></div>
        </div>
      )}
      {children}
    </div>
  );
}

export default Loader;
