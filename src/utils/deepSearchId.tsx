//A function to return an object or its index from a multidimensional array using id 
export function deepSearchId(arr: any, val: string, indexOrObj: string): (object| number | null) {
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i]) && (deepSearchId(arr[i], val, indexOrObj) !== null)) {
      return deepSearchId(arr[i], val, indexOrObj);
    } else if (arr[i].id === val) {
      if (indexOrObj === 'index') {
        return i;
      }
      return arr[i];
    }
  }
  return null;
}