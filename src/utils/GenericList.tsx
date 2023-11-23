import React from "react";
import { noop } from "./noop";
import { IItem } from "../interfaces/IItem";

interface IGenericListProps {
  list: IItem[];
}

//Function creates a list of set elements
export function GenericList({ list }: IGenericListProps) {
  return (
    <>
      {list.map(({ As = 'div', element, onClick = noop, className, id, href }) => (
        <As 
          className={className} 
          onClick={() => onClick(id)} 
          key={id} 
          href={href}
        >
          {element}
        </As>
      ))}
    </>
  );
}

