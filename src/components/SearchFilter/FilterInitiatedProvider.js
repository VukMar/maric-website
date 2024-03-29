import React, { useState, createContext, useContext } from 'react';

const FilterInitiatedContext = createContext({
    filterInitiated: false,
    setFilterInitiated: () => {} // Placeholder function
});

export function useFilterInitiated() {
    return useContext(FilterInitiatedContext);
}

export function FilterInitiatedProvider({ children }) {
    const [filterInitiated, setFilterInitiated] = useState(false);

    return (
        <FilterInitiatedContext.Provider value={{ filterInitiated, setFilterInitiated }}>
            {children}
        </FilterInitiatedContext.Provider>
    );
}
