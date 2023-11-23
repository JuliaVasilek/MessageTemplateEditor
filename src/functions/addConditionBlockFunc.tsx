import { deepSearchId } from "../utils/deepSearchId";
import { generateId } from "../utils/generateId";
import { generateRandomString } from "../utils/generateRandomString";
import { getIndexesArray } from "../utils/getIndexesArray";
import { getStorage } from "../utils/getStorage";
import { setStorage } from "../utils/setStorage";

//Function for adding a condition block and a textarea after it to the template
export function addConditionBlockFunc(focusedTextArea: HTMLTextAreaElement) {

  let tempStorage = getStorage('template');

  const condId = generateRandomString();
  const condBlock = [
    {type: 'if', conditionId: condId, text: ''},
    {type: 'then', conditionId: condId, text: ''},
    {type: 'else', conditionId: condId, text: ''},
  ].map(generateId);
  const textareaBlock = [{type: 'textarea', conditionId: '', text: ''}].map(generateId);

  //Splitting the text from the chosen textarea into two (before and after cursor)
  let inputValue = focusedTextArea.value;
  let insertTokenAt = focusedTextArea.selectionStart;
  let firstHalfText = inputValue.slice(0, insertTokenAt);
  let secondHalfText = inputValue.slice(insertTokenAt);
  //First half goes to the textarea element before the condition block, second - to the created textarea
  focusedTextArea.value = firstHalfText;
  textareaBlock[0].text = secondHalfText;
 
  //Getting a path to the current textarea object in the template
  getIndexesArray(tempStorage, focusedTextArea.id);
  let indexArr: number[] = getStorage('indexStorage');
  let focusedItemIndex = deepSearchId(tempStorage, focusedTextArea.id, 'index');
  if (typeof focusedItemIndex === 'number') {
    indexArr.push(focusedItemIndex);
  }

  //Inserting the condition block and a new textarea into the template after the current textarea
  let i = 0;
  function findAndInsert(array: any) {
    if (i === indexArr.length - 1) {
      array[indexArr[i]].text = firstHalfText;
      array.splice(indexArr[i]+1, 0, textareaBlock[0]);
      array.splice(indexArr[i]+1, 0, condBlock);
    } else {
      i++;
      findAndInsert(array[indexArr[i-1]])
    }
  }

  findAndInsert(tempStorage);
  setStorage('template', tempStorage);
  setStorage('indexStorage', []);

}