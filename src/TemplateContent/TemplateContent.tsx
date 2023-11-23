import styles from './templatecontent.css';
import { MessageTextArea } from '../MessageTextArea';
import { IfThenElseBlock } from '../IfThenElseBlock';
import { ITemplateElement } from '../interfaces/ITemplateElement';
import { generateRandomString } from '../utils/generateRandomString';

interface ITemplateContentProps {
  list: (ITemplateElement | [])[]
}


export function TemplateContent({list}: ITemplateContentProps) {
  //Renders the template with its values for editing
  return (
  
    <div className={styles.templateContent}>

      { list.map((item) => (
        !Array.isArray(item)
        ? 
        <MessageTextArea id={item.id} value={item.text} key={generateRandomString()}/>
        :
        <IfThenElseBlock element={item} key={generateRandomString()} />
      )) }

    </div>

  );
}
