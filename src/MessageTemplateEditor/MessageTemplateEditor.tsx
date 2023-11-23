import { useContext} from 'react';
import styles from './messagetemplateeditor.css';
import { Title } from '../Title';
import { VariablesOptionList } from './VariablesOptionList';
import { AddConditionButton } from './AddConditionButton';
import { OperationBtn } from '../OperationBtn';
import { getStorage } from '../utils/getStorage';
import { TemplateContent } from '../TemplateContent';
import { rerenderTemplateContext } from '../contexts/rerenderTemplateContext';
import { ITemplateElement } from '../interfaces/ITemplateElement';

interface IMessageTemplateEditorProps {
  closeEditorFunc: () => void,
  openPreviewFunc: () => void,
  arrVarNames: string[],
  template?: (ITemplateElement | [])[],
  callbackSave: () => void
}

export function MessageTemplateEditor({closeEditorFunc, openPreviewFunc, arrVarNames, template = getStorage('template'), callbackSave }: IMessageTemplateEditorProps) {

  const {rerendFunc} = useContext(rerenderTemplateContext);

  return (
    
      <div className={styles.messageTemplateEditor}>

        <Title titleText={'Message Template Editor'} size={'h2'}/>
        <VariablesOptionList arrVarNames={arrVarNames} />
        <AddConditionButton handleClickFunc = {rerendFunc}/>

        <TemplateContent list={template} />

        <div className={styles.operationBtnList}>
          <OperationBtn value={'Preview'} handleClickFunc = {openPreviewFunc}/>
          <OperationBtn value={'Save'} handleClickFunc = {callbackSave}/>
          <OperationBtn value={'Close'} handleClickFunc = {closeEditorFunc}/>
        </div>

      </div>
  );
}
