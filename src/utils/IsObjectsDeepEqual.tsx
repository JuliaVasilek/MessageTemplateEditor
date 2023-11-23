export function isObjectsDeepEqual(obj1: {[key:string]: any}, obj2: {[key:string]: any}) {
    var keys1 = Object.keys(obj1);
    var keys2 = Object.keys(obj2);
 
    if (keys1.length !== keys2.length) {
        return false;
    }
 
    for (var key of keys1) {
        if (!keys2.includes(key) || !isObjectsDeepEqual(obj1[key], obj2[key])) {
            return false;
        }
    }
 
    return true;
}