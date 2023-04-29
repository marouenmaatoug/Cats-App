import { createContext, useState } from "react";

export const BreedContext = createContext({
    selectedBreed: null,
    setSelectedBreed: () => {},
});

export const BreedProvider = ({ children }) => {
    const [selectedBreed, setSelectedBreed] = useState(null);
    return (
        <BreedContext.Provider value={{ selectedBreed, setSelectedBreed }}>
            {children}
        </BreedContext.Provider>
    );
};
