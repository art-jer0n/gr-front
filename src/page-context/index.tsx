import { createContext, useState } from "react";
import React from "react";
import { PageContextProps } from "page-context/page-context-props";
import { PageProviderProps } from "page-context/page-provider-props";
import { MenuItem } from "primereact/menuitem";

const defaultContextValue: PageContextProps = {
  title: "",
  breadcrumbs: [],
  setTitle: () => {},
  setBreadcrumbs: () => {},
};

export const PageContext = createContext<PageContextProps>(defaultContextValue);

export const PageProvider: React.FC<PageProviderProps> = ({ children }) => {
  const [title, setTitle] = useState<string>("");
  const [breadcrumbs, setBreadcrumbs] = useState<MenuItem[]>([]);

  return (
    <PageContext.Provider
      value={{ title, setTitle, breadcrumbs, setBreadcrumbs }}
    >
      {children}
    </PageContext.Provider>
  );
};
