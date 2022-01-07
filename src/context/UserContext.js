import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { GET_USER } from "../util/graphql";

const UserContext = React.createContext();
const useUserContext = () => useContext(UserContext);

function UserProvider({ children }) {
    console.log("# UserContext rendered #");
    const { data } = useQuery(GET_USER, { fetchPolicy: "no-cache" });
    const user = data !== undefined ? data.getUser : null;

    return (
        <UserContext.Provider value={user}>
            {user ? children : <h1>Loading...</h1>}
        </UserContext.Provider>
    );
}

export { useUserContext, UserProvider };
