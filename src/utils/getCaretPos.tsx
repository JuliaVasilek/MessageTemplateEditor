//Function gets the position of the cursor
export function getCaretPos(obj: HTMLTextAreaElement) {
  const doc = document as any;
  if (obj.selectionStart) return obj.selectionStart;
  else if (doc.selection) {
    let sel = doc.selection.createRange();
    let clone = sel.duplicate();
    sel.collapse(true);
    clone.moveToElementText(obj);
    clone.setEndPoint('EndToEnd', sel);
    return clone.text.length;
  }
  return 0;
}