import styles from './variablesoptionlist.css';
import { VariablesOptionItem } from './VariablesOptionItem';
import { GenericList } from '../../utils/GenericList';
import { generateId } from '../../utils/generateId';
import { IItem } from '../../interfaces/IItem';

interface VariablesOptionListProps {
  arrVarNames: string[]
}

export function VariablesOptionList({arrVarNames}: VariablesOptionListProps) {

  const tempList = arrVarNames.map((item: string) => ({ 
    element: <VariablesOptionItem value={item} />
  }));
  const list: IItem[] = tempList.map(generateId);

  return (    
    <div className={styles.variablesOptionList} id='varOptList'>
      <GenericList list={list} />
    </div>
  );
}
