import { getStorage } from "../utils/getStorage";
import { setStorage } from "../utils/setStorage";

export function addAllStorages() {

  //Reset all localStorage instances

  // localStorage.removeItem('arrVarNames');
  // localStorage.removeItem('savedTemplate');
  // localStorage.removeItem('template');
  // localStorage.removeItem('indexStorage');
  // localStorage.removeItem('editorState');
  // localStorage.removeItem('caretPositionId');


  //Temporary storage for the majority of the interactions. Gets saved to the main storage for permanent state
  let tempStorage: ([] | object)[];
  if (getStorage('template') === null) {
    tempStorage = [{type: 'textarea', id: '1', conditionId: '', text: ''}];
    setStorage('template', tempStorage)
  }

  //Main template storage. It updates on a click of the 'save' button in MessageTemplateEditor
  // let mainTemplateStorage: ([] | object)[] = [
  //   //Example from the task
  //   {type: 'textarea', id: '1', conditionId: '', text: 'Hello {firstname}! \nI just went through your profile and I would love to join your network! '},
  //   [
  //     {type: 'if', id: '2', conditionId: 'jgvkjnws', text: '{company}'},
  //     {type: 'then', id: '3', conditionId: 'jgvkjnws', text: 'I know you work at {company}'},
  //     [
  //       {type: 'if', id: '4', conditionId: 'kjnsdfvjn', text: '{position}'},
  //       {type: 'then', id: '5', conditionId: 'kjnsdfvjn', text: ' as {position} '},
  //       {type: 'else', id: '6', conditionId: 'kjnsdfvjn', text: ', but what is your role? '},
  //     ],
  //     {type: 'textarea', id: '7', conditionId: '', text: ';) '},
  //     {type: 'else', id: '8', conditionId: 'jgvkjnws', text: 'Where do you work at the moment? '},
  //   ],
  //   {type: 'textarea', id: '9', conditionId: '', text: '\nJake. Software developer'},
  // ];

  if (getStorage('savedTemplate') === null) {
    setStorage('savedTemplate', getStorage('template'));
    // setStorage('savedTemplate', mainTemplateStorage);
  }

  //Storage for a path to an object/array in a multidimensional array
  let indexStorage: number[];
  if (getStorage('indexStorage') === null) {
    indexStorage = [];
    setStorage('indexStorage', indexStorage)
  }

  //Storage for the state of Message Template Editor. Is used to open and close it
  let isEditorOpen: boolean;
  if (getStorage('editorState') === null) {
    isEditorOpen = false;
    setStorage('editorState', isEditorOpen)
  }

  //Storage for a caret position for adding condition blocks one after another 
  //(since after adding one the component gets rerendered)
  let caretPositionId: string;
  if (getStorage('caretPositionId') === null) {
    caretPositionId = '';
    setStorage('caretPositionId', caretPositionId)
  }
}