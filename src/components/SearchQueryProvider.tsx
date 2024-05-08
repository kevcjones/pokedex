// SearchContext.js
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
}

// Provide a default value
const defaultValue: SearchContextType = {
  searchQuery: "",
  setSearchQuery: () => {
    // Empty function just for type initialization
    throw new Error("setSearchQuery function must be overridden");
  },
};

// Create the search context
export const SearchContext = createContext<SearchContextType>(defaultValue);

// Create the provider component
export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");

  return (
    <SearchContext.Provider value={{ searchQuery, setSearchQuery }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);
