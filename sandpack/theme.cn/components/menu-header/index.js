import styles from "./MenuHeader.module.scss";

export default function MenuHeader() {
  return (
    <nav className={styles.container}>
      <ul className={styles.menuList}>
        <li className={styles.menuItem}>
          <a
            className={styles.menuLink}
            href="/docs"
            rel="noreferrer"
            target="_blank"
          >
            Docs
          </a>
        </li>
        <li className={styles.menuItem}>
          <a
            className={styles.menuLink}
            href="https://github.com/codesandbox/sandpack"
            rel="noreferrer"
            target="_blank"
          >
            GitHub
          </a>
        </li>
      </ul>
    </nav>
  );
}
