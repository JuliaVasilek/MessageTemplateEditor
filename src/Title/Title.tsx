import styles from './title.css';

interface ITitleProps {
  titleText: string,
  size: string
}

export function Title({titleText, size}:ITitleProps) {
  return (
    <div className={styles.title}>
      {(size === 'h2')&&(
        <h2 className={styles.h2Title}>{titleText}</h2>
      )}
      {(size === 'h3')&&(
        <h3 className={styles.h3Title}>{titleText}</h3>
      )}
      {(size === 'h4')&&(
        <h4 className={styles.h4Title}>{titleText}</h4>
      )}
    </div>
  );
}
