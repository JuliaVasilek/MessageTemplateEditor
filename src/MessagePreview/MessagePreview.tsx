import { useState } from 'react';
import styles from './messagepreview.css';
import { CornerCloseBtn } from './CornerCloseBtn';
import { Title } from '../Title';
import { PreviewVariablesBlock } from './PreviewVariablesBlock';
import { OperationBtn } from '../OperationBtn';
import { valuesContext } from '../contexts/valuesContext';
import { ReadOnlyMessageTextArea } from './ReadOnlyMessageTextArea';
import { ITemplateElement } from '../interfaces/ITemplateElement';

interface IMessagePreview {
  closePreviewFunc: ()=>void,
  arrVarNames: string[],
  template: (ITemplateElement | [])[]
}

export function MessagePreview({closePreviewFunc, arrVarNames, template}: IMessagePreview) {
  const ValuesProvider = valuesContext.Provider;
  
  //Getting the array with set variables and inserting them into an object for further value assignment
  let tempVal: {[key: string]: string} = {};
  for (let i = 0; i < arrVarNames.length; i++) {
    tempVal[arrVarNames[i]] = '';
  }

  const [values, setValues] = useState(tempVal);
  
  //A function to change a value for one of the variables
  function changeValues (key: string, val: string) {
    let temp: {[key: string]: string} = {};
    temp = values;
    temp[key] = val;
    setValues(temp);
  }

  return (
    <ValuesProvider value={{
      //Used in VariableItemBlock
      changeValuesFunc: changeValues,
      values: values
    }}>
      <div className={styles.messagePreview}>
        <div className={styles.messagePreviewWindow}>
          <CornerCloseBtn closePreviewFunc={closePreviewFunc}/>
          <Title titleText={'Message Preview'} size={'h4'} />
          <ReadOnlyMessageTextArea id={'finalMessage'} template={template} values={values} arrVarNames={arrVarNames} />
          <PreviewVariablesBlock arrVarNames={arrVarNames}/>
          <OperationBtn value={'Close'} handleClickFunc={closePreviewFunc}/>
        </div>
      </div>
    </ValuesProvider>
  );
}
