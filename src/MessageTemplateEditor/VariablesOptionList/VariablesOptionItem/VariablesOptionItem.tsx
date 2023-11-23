import React from 'react';
import styles from './variablesoptionitem.css';
import { setNativeValue } from '../../../utils/setNativeValue';

interface IVariablesOptionItemProps {
  value: string;
}

export function VariablesOptionItem({value}: IVariablesOptionItemProps) {

  //Function to insert a variable in the template
  function handleClick(event: MouseEvent) {
    //Getting a textarea where user has cursor or the first textarea
    let focusedTextArea: HTMLTextAreaElement;
    if (document.querySelector('.isFocused') != null) {
      focusedTextArea = document.querySelector('.isFocused')!;
    } else {
      focusedTextArea = document.getElementsByTagName('textarea')[0];
    }

    //Splitting the text into two (before and after cursor) and adding the variable. 
    //Also triggering a 'change' event on the chosen textarea to save the new text into the template
    let inputValue = focusedTextArea.value;
    let insertToken = `{${value}}`;
    let insertTokenAt = focusedTextArea.selectionStart;
    setNativeValue(focusedTextArea, `${inputValue.slice(0, insertTokenAt)}${insertToken}${inputValue.slice(insertTokenAt)}`);
    focusedTextArea.dispatchEvent(new Event('change', { bubbles: true }));
    let nextSelectionEnd = ( insertTokenAt + insertToken.length );
    focusedTextArea.selectionStart = nextSelectionEnd;
    focusedTextArea.selectionEnd = nextSelectionEnd;
    focusedTextArea.focus();
  }


  return (
    <div className={`${styles.variablesOptionItem} variablesOptionItem`} onClick={(e: React.MouseEvent<HTMLElement>) => handleClick(e.target as any)} >
      {`{${value}}`}
    </div>
  );
}
