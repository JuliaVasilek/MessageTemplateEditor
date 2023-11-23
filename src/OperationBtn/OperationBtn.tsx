import styles from './operationbtn.css';

interface IOperationBtnProps {
  value: string,
  handleClickFunc?: ()=>void
}

export function OperationBtn({value, handleClickFunc}: IOperationBtnProps) {
  return (
    <div className={styles.operationBtn} onClick={handleClickFunc}>{value}</div>
  );
}
