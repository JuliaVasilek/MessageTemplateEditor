import styles from './previewvariablesblock.css';
import { VariableItemBlock } from './VariableItemBlock';
import { generateId } from '../../utils/generateId';
import { GenericList } from '../../utils/GenericList';
import { IItem } from '../../interfaces/IItem';

interface IPreviewVariablesBlockProps {
  arrVarNames: string[]
}

export function PreviewVariablesBlock({arrVarNames}: IPreviewVariablesBlockProps) {
  
  const tempList = arrVarNames.map((item: string) => ({ 
    element: <VariableItemBlock placeholder={item} arrVarNames={arrVarNames} />
  }));
  const list: IItem[] = tempList.map(generateId);

  return (
    <div className={styles.previewVariablesBlock}>
      <span className={styles.variablesTitle}>Variables:</span>
      <GenericList list={list} />
    </div>
  );
}
