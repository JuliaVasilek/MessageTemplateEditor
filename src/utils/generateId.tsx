import { assoc } from "./assoc";
import { generateRandomString } from "./generateRandomString";

const assignId = assoc('id', generateRandomString);
export const generateId = <O extends object>(obj: O) => assignId(obj);
