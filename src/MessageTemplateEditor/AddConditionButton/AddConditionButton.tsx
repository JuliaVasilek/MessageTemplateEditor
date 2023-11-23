import React from 'react';
import styles from './addconditionbutton.css';
import { ConditionType } from '../ConditionType';
import { addConditionBlockFunc } from '../../functions/addConditionBlockFunc';

interface IAddConditionButtonProps {
  handleClickFunc: ()=>void
}

export function AddConditionButton({handleClickFunc}: IAddConditionButtonProps) {
  function handleClick(event: MouseEvent) {
    //Getting a textarea with 'isFocused' class or the first textarea in case if the user didn't click on any of the textareas
    let focusedTextArea: HTMLTextAreaElement;
    if (document.querySelector('.isFocused') != null) {
      focusedTextArea = document.querySelector('.isFocused')!;
    } else {
      focusedTextArea = document.getElementsByTagName('textarea')[0];
    }
    if (!focusedTextArea.classList.contains('if')) {
      addConditionBlockFunc(focusedTextArea);
      //Updates the template (comes from MessageTemplateEditor)
      handleClickFunc();
    }
  }

  return (
    <div className={styles.addConditionButton} id='addConditionButton' onClick={(e: React.MouseEvent<HTMLElement>) => handleClick(e.target as any)}>
      Click to add: &thinsp;
      <ConditionType value={'if'} />
      &thinsp;&#91;&#123;some_variable&#125;&#93; or expression &thinsp;
      <ConditionType value={'then'} />
      &thinsp;&#91;then_value&#93; &thinsp;
      <ConditionType value={'else'} />
      &thinsp;&#91;else_value&#93;
    </div>
  );
}
