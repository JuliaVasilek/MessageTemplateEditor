import styles from './App.css';
import { AppButton } from './AppButton';
import { MessageTemplateEditor } from './MessageTemplateEditor';
import { getStorage } from './utils/getStorage';
import { setStorage } from './utils/setStorage';
import { addAllStorages } from './functions/addAllStorages';
import { useState } from 'react';
import { MessagePreview } from './MessagePreview';
import { rerenderTemplateContext } from './contexts/rerenderTemplateContext';

function App() {
  //Adding all necessary localStorage instances
  addAllStorages();

  const RerenderProvider = rerenderTemplateContext.Provider;

  let arrVarNames = localStorage.arrVarNames ? JSON.parse(localStorage.arrVarNames) : ['firstname', 'lastname', 'company', 'position'];
  let template = localStorage.template ? JSON.parse(localStorage.template) : null;
  
  //Function saves the template
  //Tied to the 'save' button in Message Template Editor to save the template
  async function callbackSave() {
    const temp = getStorage('template');
    setStorage('savedTemplate', temp);
  }

  const [btnState, setBtnState] = useState(getStorage('editorState'));
  const [previewState, setPreviewState] = useState(false);
  const [tempTemplate, setTempTemplate] = useState(template);

  
  function openEditorFunc() {
    //Tied to the main button to open Message Template Editor
    setTempTemplate(getStorage('template'));
    setBtnState(true);
    setStorage('editorState', true);
  }

  function closeEditorFunc() {
    //Tied to the 'close' button in Message Template Editor to close Editor
    setBtnState(false);
    setStorage('editorState', false);
    setStorage('template', getStorage('savedTemplate'));
  }

  function openPreviewFunc() {
    //Tied to the 'preview' button in Message Template Editor to open preview
    let tempTemplate = getStorage('template');
    setTempTemplate(tempTemplate);
    setPreviewState(true);
  }

  function closePreviewFunc() {
    //Tied to the 'close' button in Message Preview to close preview
    setPreviewState(false);
  }

  let focusedTextArea: HTMLTextAreaElement;

  function rerender() {
    //Used DeleteBtn and ConditionBlock
    if (document.querySelector('.isFocused') !== null) {
      focusedTextArea = document.querySelector('.isFocused')!;
    } else {
      focusedTextArea = document.getElementsByTagName('textarea')[0];
    }
    setStorage('caretPositionId', focusedTextArea.id);
    setTempTemplate(getStorage('template'));
  }

  return (
    <RerenderProvider value={{
      //Used in IfThenElseBlock for DeleteBtn and in MessageTemplateEditor for ConditionBlock
      rerendFunc: rerender
    }}>
      <div className={styles.App}>
        
        <AppButton handleClickFunc={openEditorFunc} />
        {(btnState) && (
          <MessageTemplateEditor closeEditorFunc={closeEditorFunc} openPreviewFunc={openPreviewFunc} arrVarNames={arrVarNames} template={tempTemplate} callbackSave={callbackSave} />
        )}
        {(previewState) && (
          <MessagePreview closePreviewFunc={closePreviewFunc} arrVarNames={arrVarNames} template={tempTemplate}/>
        )}

      </div>
    </RerenderProvider>
  );
}

export default App;
