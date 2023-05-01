import React, { createContext, useState, ReactNode } from "react";

interface BreedContextValue {
    selectedBreed: string | null;
    setSelectedBreed: React.Dispatch<React.SetStateAction<string | null>>;
}

export const BreedContext = createContext<BreedContextValue>({
    selectedBreed: null,
    setSelectedBreed: () => {},
});

interface Props {
    children: ReactNode;
}

export const BreedProvider = ({ children }: Props): JSX.Element => {
    const [selectedBreed, setSelectedBreed] = useState<string | null>(null);
    return (
        <BreedContext.Provider value={{ selectedBreed, setSelectedBreed }}>
            {children}
        </BreedContext.Provider>
    );
};
