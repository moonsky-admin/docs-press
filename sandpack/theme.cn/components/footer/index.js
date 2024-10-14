/* eslint-disable @next/next/no-img-element */
import styles from "./Footer.module.scss";

export default function Footer({ ...props }) {
  return (
    <footer className={styles.container} {...props}>
      <p className={styles.warning}>
        在
        <a
          href="/docs"
          rel="noreferrer"
          target="_blank"
        >
          <u>Sandpack Documentation</u>
        </a>
        中了解如何在项目中实施Sandpack。
      </p>
      <div className={styles.logoContainer}>
        Powered by{" "}
        <img
          alt="CodeSandbox"
          className={styles.logo}
          src="theme/codesandbox-logo.svg"
        />
      </div>
    </footer>
  );
}
