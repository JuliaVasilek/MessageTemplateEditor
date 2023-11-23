export function insertAfter(newNode: React.ReactNode, referenceNode: any) {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}