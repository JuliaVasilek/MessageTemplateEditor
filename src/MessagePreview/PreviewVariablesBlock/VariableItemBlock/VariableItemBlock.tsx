import { useContext, useRef } from 'react';
import styles from './variableitemblock.css';
import { valuesContext } from '../../../contexts/valuesContext';
import { generateMessageFromTemplateFunc } from '../../../functions/generateMessageFromTemplateFunc';
import { getStorage } from '../../../utils/getStorage';

interface IVariableItemBlockProps {
  placeholder: string,
  arrVarNames: string[]
}

export function VariableItemBlock({placeholder, arrVarNames}: IVariableItemBlockProps) {
  
  const ref = useRef<HTMLInputElement>(null);
  //A function to change values of variables and the values themself from MessagePreview
  const {changeValuesFunc, values} = useContext(valuesContext);
  
  const template = getStorage('template');


  //A function to change the message text
  function changeTextareaText() {
    const readonlyTextarea: HTMLTextAreaElement = document.getElementById('finalMessage')! as HTMLTextAreaElement;
    const message = generateMessageFromTemplateFunc(template, values, arrVarNames);
    if (readonlyTextarea) {
      readonlyTextarea.value = message;
      //Textarea autosizing
      readonlyTextarea.style.height = "0px";
      const scrollHeight = readonlyTextarea.scrollHeight;
      readonlyTextarea.style.height = scrollHeight + "px";
    }
  }

  return (
    <div className={styles.variableItemBlock}>
      <input type="text" className={styles.varInput} ref={ref} required onChange={e => {
        changeValuesFunc(placeholder, e.target.value); 
        changeTextareaText();
      }}/>
      <span className={styles.floatingLabel}>{placeholder}</span>
    </div>
  );
}
