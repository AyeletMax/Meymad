import React, { createContext, useContext, useState, useEffect } from "react";
import ApiService from '../ApiService'; 
import socket from '../socket'; 
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({ username: "", id: "", email: "", role: "" });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const user = await ApiService.request({ endPath: 'auth/currentUser', credentials: 'include' });
        if (user?.username) {
          setCurrentUser(user);
        } else {
          setCurrentUser({ id: '', username: '', email: '', role: '' });
        }
      } catch {
        setCurrentUser({ id: '', username: '', email: '', role: '' });
      } finally {
        setLoading(false); 
      }
    };

    fetchCurrentUser();
  }, []);


  useEffect(() => {
    if (currentUser?.role === "admin") {
      socket.emit("join", "admin");
    }
  }, [currentUser]);
  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, loading  }}>
      {children}
    </UserContext.Provider>
  );
};
export const useUser = () => useContext(UserContext);