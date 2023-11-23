import styles from './conditionrow.css';
import { ConditionType } from '../../MessageTemplateEditor/ConditionType';
import { MessageTextArea } from '../../MessageTextArea';
import { DeleteBtn } from '../DeleteBtn';
import { ITemplateElement } from '../../interfaces/ITemplateElement';

export function ConditionRow(element: ITemplateElement) {
  return (
    <div className={styles.conditionRow}>
      <div className={styles.conditionSide}>
        <ConditionType value={element.type} />
        { (element.type === 'if') && (
          <DeleteBtn ifId={element.id} />
        ) }
      </div>
      <MessageTextArea conditionId={element.conditionId} id={element.id} value={element.text} conditionType={element.type} />
    </div>
  );
}
