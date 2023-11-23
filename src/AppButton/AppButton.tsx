import styles from './appbutton.css';

interface IAppButtonProps {
  handleClickFunc: () => void
}

export function AppButton({handleClickFunc}: IAppButtonProps) {
  return (
    <div className={styles.appButton} id='appBtn'>
      <button className={styles.button} onClick={handleClickFunc}>Message Editor</button>
    </div>
  );
}
