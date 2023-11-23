import { ITemplateElement } from "../interfaces/ITemplateElement";
import { generateRandomString } from "../utils/generateRandomString";
import { createMessagePartFunc } from "./createMessagePartFunc";

//A function to generate a message using a template and values of the set variables
export function generateMessageFromTemplateFunc(template: ([]|ITemplateElement)[], varValues: {[key:string]: string}, arrVarNames: string[]) {

  let message = '';

  //Making sure we process only our four variables 
  //and replacing variables' names with generated random strings (specific string for a specific variable)
  const ourVarValues: {[key:string]: string} = {};
  const varReplacements: {[key:string]: string} = {};
  for (let item of arrVarNames) {
    varReplacements[item] = generateRandomString();
    if (varValues[item]) {
      ourVarValues[varReplacements[item]] = varValues[item];
    } else {
      ourVarValues[varReplacements[item]] = '';
    }
  }

  
  function buildText(arr: ([]|ITemplateElement)[]) {
    type TCase = 'unset'|'defined'|'empty'|'skip'|'none';
    let deter:{case: TCase, conditionId: string} = {case: 'unset', conditionId: 'none'};
    for (let i = 0; i < arr.length; i++) {

      //Processing the array iterable according to 'case'
      if (Array.isArray(arr[i])) {
        if ((deter.case === 'skip')||(deter.case === 'empty')) {
          continue;
        }
        if ((deter.case === 'defined')||(deter.case === 'none')||(deter.case === 'unset')) {
          buildText(arr[i] as ([]|ITemplateElement)[]);
          continue;
        }
      }

      //Replacing variables' names in the text with generated random strings (specific string for a specific variable)
      //to prevent registering variable value, for example, '{lastname}', as a variable when it's just a text
      let text = (arr[i] as ITemplateElement).text;
      for (let key in varReplacements) {
        const re = new RegExp('\{' + key + '\}', 'g');
        text = text.replace(re, `{${varReplacements[key]}}`);
      }

      //Checking if the text after calculation in 'if' is empty or not and remembering
      if ((arr[i] as ITemplateElement).type === 'if') {
        let ifText = createMessagePartFunc(text, ourVarValues);
        if (ifText !== '') {
          deter = {case: 'defined', conditionId: (arr[i] as ITemplateElement).conditionId!};
        } else {
          deter = {case: 'empty', conditionId: (arr[i] as ITemplateElement).conditionId!};
        }
        continue;
      }

      //When 'if' is defined, occurs on reaching 'else' statement, if 'case' = 'skip' - we skip the iterable
      if (deter.case === 'unset') {
        const messagePart = createMessagePartFunc(text, ourVarValues);
        message = message + messagePart;
      }

      //When 'if' has a value, occurs on reaching 'else' statement, if 'case' = 'skip' - we skip the iterable
      if (deter.case === 'skip') {
        continue;
      }

      //Occurs right after we found 'if' to have a value
      //if 'case' = 'defined' and the iterable is not 'else' - we process the iterable to make a part of the message
      //On 'else' 'case' changes to 'skip'
      if (deter.case === 'defined') {
        if ((arr[i] as ITemplateElement).type === 'else') {
          deter.case = 'skip';
          continue;
        } else {
          const messagePart = createMessagePartFunc(text, ourVarValues);
          message = message + messagePart;
        }
      }

      //When 'if' doesn't have a value, occurs on reaching 'else' statement
      //if 'case' = 'none' - we process the iterable to make a part of the message
      if (deter.case === 'none') {
        const messagePart = createMessagePartFunc(text, ourVarValues);
        message = message + messagePart;
      }

      //Occurs right after we found 'if' to not have a value
      //if 'case' = 'empty' and the iterable is not 'else' - we skip the iterable
      //On 'else' 'case' changes to 'none' and we process the iterable to make a part of the message
      if (deter.case === 'empty') {
        if ((arr[i] as ITemplateElement).type === 'else') {
          deter.case = 'none';
          const messagePart = createMessagePartFunc(text, ourVarValues);
          message = message + messagePart;
        } else {
          continue;
        } 
      }
    }
  }

  buildText(template);

  return message;
}

export default generateMessageFromTemplateFunc;