import { useState, createContext } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [following, setFollowing] = useState(false);

  return (
    <UserContext.Provider value={{ loading, setLoading, following, setFollowing }}>
      {children}
    </UserContext.Provider>
  );
};
