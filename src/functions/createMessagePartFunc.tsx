import { generateRandomString } from "../utils/generateRandomString";

//A function for generating a part of the message from the template
//(We use a random string to replace an empty variable with to prevent, for example, {last{firstname}name} rendering as '' instead of {lastname})
export function createMessagePartFunc(text: string, values: {[key:string]: string}) {
  let messagePart = text;
  const temp = generateRandomString();
  for (let key in values) {
    const re = new RegExp('\{' + key + '\}','g');
    if (values[key] === '') {
      messagePart = messagePart.replace(re, temp);
    } else {
      messagePart = messagePart.replace(re, values[key]);
    }
  }
  const tempRe = new RegExp(temp, 'g');
  messagePart = messagePart.replace(tempRe, '');
  return messagePart;
}