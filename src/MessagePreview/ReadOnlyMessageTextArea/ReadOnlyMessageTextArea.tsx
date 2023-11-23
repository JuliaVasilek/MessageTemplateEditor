import { useEffect, useRef, useState } from 'react';
import styles from './readonlymessagetextarea.css';
import { generateMessageFromTemplateFunc } from '../../functions/generateMessageFromTemplateFunc';
import { ITemplateElement } from '../../interfaces/ITemplateElement';
import useAutosizeTextArea from '../../hooks/useAutosizeTextArea';

interface IReadOnlyMessageTextAreaProps {
  id: string,
  values: {[key: string]: string},
  template: ([] | ITemplateElement)[],
  arrVarNames: string[]
}

export function ReadOnlyMessageTextArea({id, values, template, arrVarNames}: IReadOnlyMessageTextAreaProps) {
  const [message, setMessage] = useState('');
  const ref = useRef<HTMLTextAreaElement>(null);
  
  //Setting message value (once after render, further handled in VariableItemBlock)
  useEffect(()=>{
    setMessage(generateMessageFromTemplateFunc(template, values, arrVarNames));
  },[]);

  //Textarea autosizing (here runs only once since further it's handled in VariableItemBlock)
  useAutosizeTextArea(ref.current, message);

  return (
    <div className={styles.readOnlyMessageTextArea}>
      <textarea className={styles.textArea} name="text" id={id} value={message} ref={ref} rows={1} readOnly></textarea>
    </div>
  );
}
