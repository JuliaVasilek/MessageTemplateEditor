import styles from './ifthenelseblock.css';
import { MessageTextArea } from '../MessageTextArea';
import { ITemplateElement } from '../interfaces/ITemplateElement';
import { ConditionRow } from './ConditionRow';
import { generateRandomString } from '../utils/generateRandomString';

interface IfThenElseBlockProps {
  element: ITemplateElement[]
}

export function IfThenElseBlock({ element }: IfThenElseBlockProps) {
  return (
    <div className={styles.ifThenElseBlock}>
      <div className={styles.pushBlock}></div>
      <div className={styles.ifThenElseBlockContent}>
        
        {element.map((item) => (
          !Array.isArray(item)
          ?
          (
            item.type !== 'textarea' 
            ? 
            <ConditionRow type={item.type} id={item.id} conditionId={item.conditionId} text={item.text} key={generateRandomString()}/>
            :
            <MessageTextArea id={item.id} value={item.text} key={generateRandomString()}/>
          )
          :
          <IfThenElseBlock element={item} key={generateRandomString()}/>
        ))}

      </div>
    </div>
  );
}
