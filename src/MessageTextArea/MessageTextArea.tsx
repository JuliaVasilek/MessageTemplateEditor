import { useEffect, useRef, useState } from 'react';
import styles from './messagetextarea.css';
import { ITemplateElement } from '../interfaces/ITemplateElement';
import { deepSearchId } from '../utils/deepSearchId';
import { getStorage } from '../utils/getStorage';
import { getIndexesArray } from '../utils/getIndexesArray';
import { setStorage } from '../utils/setStorage';

interface IMessageTextAreaProps {
  element?: ITemplateElement,
  value?: string,
  conditionId?: string,
  id: string,
  conditionType?: string
}

export function MessageTextArea({value = '', conditionId='', id = '1', conditionType}: IMessageTextAreaProps) {

  const [isFocusedState, setIsFocusedState] = useState(false);
  const [textValue, setTextValue] = useState(value);
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(()=>{
    //Set isFocused state, if textarea was divided by condition block
    if (id === getStorage('caretPositionId')) {
      setIsFocusedState(true);
      if (ref.current?.selectionStart !== undefined) {
        ref.current.selectionStart = ref.current?.value.length;
        ref.current.selectionEnd = ref.current?.value.length;
        setStorage('caretPositionId', '');
        ref.current.focus();
      }
    }
  }, []);

  useEffect(()=>{
    //Changing the hight of the textarea
    if (ref.current) {
      ref.current.style.height = "0px";
      const scrollHeight = ref.current.scrollHeight;

      //Adjusting the height of the textarea according to the number of rows
      let count = 0;
      let add = 0;
      for (let i = 0; i < ref.current.value.length; i++) {
        if (ref.current.value[i] === '\n') {
          count++;
        }
      }
      for (let i = 0; i < count; i++) {
        if (i % 2 === 0) {
          add = add + 0.5;
        }
      }

      ref.current.style.height = scrollHeight + add + "px";
    }
    //Changes text value in the template when textValue is changed
    i = 0;
    changeText(template);
    setStorage('template', template);
  },[textValue]);
  
  let template = getStorage('template');
  //Getting the path to the object with current textarea id
  setStorage('indexStorage', []);
  getIndexesArray(template, id);
  const indexArr = getStorage('indexStorage');
  setStorage('indexStorage', []);
  //Getting the last index - index of the object itself
  let focusedItemIndex = deepSearchId(template, id, 'index');
  if (typeof focusedItemIndex === 'number') {
    indexArr.push(focusedItemIndex);
  }
 
  //A function to change text value in the template
  let i = 0;
  function changeText(array: any) {
    if (i === indexArr.length - 1) {
      array[indexArr[i]].text = textValue;
    } else {
      i++;
      changeText(array[indexArr[i-1]])
    }
  }

  //Removes class 'isFocused' from this textarea element when click event occurs on another textarea
  useEffect(()=>{
    function handleClick(event: MouseEvent) {
      if (event.target instanceof HTMLTextAreaElement && !ref.current?.contains(event.target)) {
        setIsFocusedState(false);
      }
    }

    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    }
  }, []);

  return (
    <div className={styles.messageTextArea}>
      <textarea name="text" id={id} className={`${styles.textArea} ${isFocusedState ? 'isFocused' : ''} ${conditionId} ${conditionType ? conditionType : ''}`} value={textValue} ref={ref} onClick={() => setIsFocusedState(true)} onChange={e => {setTextValue(e.target.value)}} rows={1}></textarea>
    </div>
  );
}
