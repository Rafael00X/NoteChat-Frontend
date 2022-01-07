import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../util/graphql";

const UserContext = React.createContext();
const useUserContext = () => useContext(UserContext);

function UserProvider({ children }) {
    console.log("User context rendered");
    const { data } = useQuery(GET_USER);
    const user = data !== undefined ? data.getUser : null;

    return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export { useUserContext, UserProvider };
