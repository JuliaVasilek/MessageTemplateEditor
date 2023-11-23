import styles from './conditiontype.css';

interface IConditionTypeProps {
  value: string;
}

export function ConditionType({value}: IConditionTypeProps) {
  return (
    <div className={styles.conditionType}>
      {value}
    </div>
  );
}
