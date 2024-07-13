import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import UserContext from "./UserContext";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io("http://localhost:4000"));
  }, []);

  useEffect(() => {
  user && socket?.emit("newUser", user.id);
  }, [user, socket]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
