import { useContext } from 'react';
import styles from './deletebtn.css';
import { deleteConditionBlockFunc } from '../../functions/deleteConditionBlockFunc';
import { rerenderTemplateContext } from '../../contexts/rerenderTemplateContext';

interface IDeleteBtnProps {
  ifId: string
}

export function DeleteBtn({ ifId }: IDeleteBtnProps) {
  //A function to rerender TemplateContent, comes from MessageTemplateEditor
  const {rerendFunc} = useContext(rerenderTemplateContext);

  function handleClick() {
    //Function deletes the condition block from the template
    deleteConditionBlockFunc(ifId);
    rerendFunc();
  }

  return (
    <button className={styles.deleteBtn} onClick={handleClick} >Delete</button>
  );
}
