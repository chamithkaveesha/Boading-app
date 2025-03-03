import { createContext, useContext, useState } from "react";

// Create Context
const GlobalContext = createContext();

// Provider Component
export const GlobalProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [room, setRoom] = useState(null);

    return (
        <GlobalContext.Provider value={{ room, setRoom, user, setUser }}>
            {children}
        </GlobalContext.Provider>
    );
};

// Custom Hook to Use Global State
export const useGlobalState = () => useContext(GlobalContext);
