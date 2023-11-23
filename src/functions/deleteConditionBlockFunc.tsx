import { getIndexesArray } from "../utils/getIndexesArray";
import { getStorage } from "../utils/getStorage";
import { setStorage } from "../utils/setStorage";

//Function deletes a condition block from the template
export function deleteConditionBlockFunc(id: string) {

  let template = getStorage('template');
  setStorage('indexStorage', []);

  //Finding the path to the condition block with an 'if' object with the said id
  getIndexesArray(template, id);
  const indexArr = getStorage('indexStorage');

  if (indexArr[0] === undefined) {
    return;
  }

  let fullText: string = '';

  let i = 0;
  function deleteTheArr(array2: any) {
    if (i === indexArr.length - 1) {
      //If we arrived at the last index - meaning the parent of the condition block that we need to delete:
      //Getting the text from before and after the condition block
      let firstHalfText = array2[indexArr[i]-1].text;
      let secondHalfText = array2[indexArr[i]+1].text;
      //Deleting the condition block and a textarea block after it
      array2.splice(indexArr[i], 1);
      array2.splice(indexArr[i], 1);
      //Inserting the combined text into the textarea block before deleted condition block
      fullText = firstHalfText + secondHalfText;
      array2[indexArr[i]-1].text = fullText;
      let fullTextElement: HTMLTextAreaElement = document.getElementById(array2[indexArr[i]-1].id) as HTMLTextAreaElement;
      fullTextElement.value = fullText;
    } else {
      //If we haven't reached the condition block yet:
      i++;
      deleteTheArr(array2[indexArr[i-1]])
    }
  }
  
  deleteTheArr(template);
  setStorage('template', template);
  setStorage('indexStorage', []);
}