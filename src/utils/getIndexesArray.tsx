import { getStorage } from "./getStorage";
import { setStorage } from "./setStorage";

//A function to get a path to an object with a certain id in a multidimensional array. The path is an array of indexes, one on each level.
// ! The last index is of the parent ! not the object itself.
export function getIndexesArray(arr: any, val: string) {
  const indexArr: number[] = [];

  function getIndexes(array1: any, val1: string) {
    for (let i = 0; i < array1.length; i++) {
      if (Array.isArray(array1[i]) && (getIndexes(array1[i], val1) !== null)) {
        indexArr.unshift(i);
        return;
      } else if (array1[i].id === val1) {
        return;
      }
    }
    return null;
  }

  const res = getIndexes(arr, val);
  //If couldn't find an object with a set id:
  if (res === null) {
    console.log(`The element with ${val} id does not exist.`);
    return;
  } 
  
  setStorage('indexStorage', indexArr);
  return getStorage('indexStorage');
}