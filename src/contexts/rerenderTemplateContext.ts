import React from "react";

type rerenderTemplateContextType = {
  rerendFunc: ()=>void
}

export const rerenderTemplateContext = React.createContext<rerenderTemplateContextType>({
  rerendFunc: ()=>{}
});