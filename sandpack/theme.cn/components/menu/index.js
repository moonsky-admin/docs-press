import { useRef, useState } from "react";

import styles from "./Menu.module.scss";

export default function Menu({ setTab }) {
  const [activeSlider, setActiveSlider] = useState({
    x: 0,
    width: "79px",
  });
  const container = useRef(null);

  const onClick = (event) => {
    setActiveSlider({
      x: event.target.offsetLeft + "px",
      width: event.target.offsetWidth + "px",
    });
  };

  return (
    <nav
      ref={container}
      className={styles.container}
      style={{
        "--target-x": `${activeSlider.x}`,
        "--target-width": `${activeSlider.width}`,
      }}
    >
      <ul className={styles.menuList}>
        <li className={styles.menuItem} onClick={onClick}>
          <button className={styles.menuLink} onClick={() => setTab("basic")}>
            基础
          </button>
        </li>
        <li className={styles.menuItem} onClick={onClick}>
          <button
            className={styles.menuLink}
            onClick={() => setTab("advanced")}
          >
            高级
          </button>
        </li>
        <li className={styles.menuItem} onClick={onClick}>
          <button className={styles.menuLink} onClick={() => setTab("library")}>
            预设
          </button>
        </li>
      </ul>
    </nav>
  );
}
