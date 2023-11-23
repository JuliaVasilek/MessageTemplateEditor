import React from "react";

type valuesContextType = {
  changeValuesFunc: (key: string, val: string) => void,
  values: {[key: string]: string}
}

export const valuesContext = React.createContext<valuesContextType>({
  changeValuesFunc: (key: string, val: string) => {},
  values: {}
});