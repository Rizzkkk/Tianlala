import styles from "./Logo.module.css";

/**
 * Wordmark drawn as SVG rather than shipped as a raster.
 * The PH site served a PNG logo; this stays crisp at any size and costs
 * nothing extra to load.
 */
export default function Logo() {
  return (
    <span className={styles.logo}>
      <svg viewBox="0 0 40 40" aria-hidden="true" className={styles.mark} fill="none">
        <rect width="40" height="40" rx="11" fill="var(--brand-500)" />
        <path
          d="M11 14h18M20 14v14"
          stroke="var(--ink-900)"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <path
          d="M13.5 24.5c2.2 1.6 4.4 1.6 6.5 0s4.3-1.6 6.5 0"
          stroke="var(--ink-900)"
          strokeWidth="2.4"
          strokeLinecap="round"
          opacity="0.55"
        />
      </svg>
      <span className={styles.word}>TIANLALA</span>
    </span>
  );
}
