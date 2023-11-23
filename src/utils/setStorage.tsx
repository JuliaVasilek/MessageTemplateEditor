export function setStorage(storageKey: string, aStorage: any) {
  localStorage.setItem(storageKey, JSON.stringify(aStorage));
}