export function getStorage(storageKey: string) {
  let parse = null;
  var stor = localStorage.getItem(storageKey);
  if (typeof stor === 'string') { parse =  JSON.parse(stor)}
  return parse;
}