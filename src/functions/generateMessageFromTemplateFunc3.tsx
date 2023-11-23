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
  console.log(template);

  function buildText(arr: ([]|ITemplateElement)[]) {
    //deter - an object that remembers if the condition was satisfied (if a variable value was set) and the condition id.
    //It will be used to choose either 'then' or 'else' option and to skip everything from the rejected option.
    let deter:{case: string, conditionId: string} = {case: 'unset', conditionId: 'none'};
    for (let i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i]))  {
        if ((deter.case !== 'empty')&&(arr[i-1] as ITemplateElement).type !== 'else') {
          buildText(arr[i] as ([]|ITemplateElement)[]);
        }
      } 
      if (!Array.isArray(arr[i])) {
        //Replacing variables' names in the text with generated random strings (specific string for a specific variable)
        //to prevent registering variable value, for example, '{lastname}', as a variable when it's just a text
        let text = (arr[i] as ITemplateElement).text;
        console.log(text);

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
        } else {
          //If no condition was set yet and we're at a textarea, then input the text in the message
          if ((deter.case === 'unset')&&((arr[i] as ITemplateElement).type === 'textarea')) {
            const messagePart = createMessagePartFunc(text, ourVarValues);
            message = message + messagePart;
          }
          //If a condition was set to be not satisfied and we're not at 'else', then input the text in the message
          if ((deter.case === 'defined')&&((arr[i] as ITemplateElement).type !== 'else')) {
            const messagePart = createMessagePartFunc(text, ourVarValues);
            message = message + messagePart;
          }
          //If a condition was set to be satisfied and we're at 'else', then input the text in the message and change deter case to 'none'.
          //'none' will be used to get the text from everything after 'else' if the condition wasn't satisfied
          if (((deter.case === 'empty')&&((arr[i] as ITemplateElement).type === 'else'))||(deter.case === 'none')) {
            const messagePart = createMessagePartFunc(text, ourVarValues);
            message = message + messagePart;
            deter.case = 'none';
          }
        }
      }
    }
  }

  buildText(template);

  return message;
}

export default generateMessageFromTemplateFunc;