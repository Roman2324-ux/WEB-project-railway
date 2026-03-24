import { useEffect, useState } from "react";
import styles from "./Toast.module.css";

/**
 * Simple self-contained toast.
 * Props:
 *   message  – string to show
 *   type     – "success" | "error"  (default "success")
 *   duration – ms before auto-close (default 4000)
 *   onClose  – callback when dismissed
 */
export default function Toast({ message, type = "success", duration = 4000, onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300); // wait for fade-out animation
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`${styles.toast} ${styles[type]} ${visible ? styles.in : styles.out}`}>
      <span className={styles.icon}>{type === "success" ? "✅" : "❌"}</span>
      <span className={styles.msg}>{message}</span>
      <button className={styles.close} onClick={() => { setVisible(false); setTimeout(onClose, 300); }}>
        ✕
      </button>
    </div>
  );
}