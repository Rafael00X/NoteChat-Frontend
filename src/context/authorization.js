import React, { useReducer, createContext } from "react";
import jwtDecode from "jwt-decode";

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

const initialState = {
    user: null
};

// Check if user is logged in
if (localStorage.getItem("jwtToken")) {
    const decodedToken = jwtDecode(localStorage.getItem("jwtToken"));

    if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem("jwtToken");
    } else {
        initialState.user = decodedToken;
    }
}

// Declare context
const AuthContext = createContext({
    user: null,
    login: (userData) => {},
    logout: () => {}
});

// A simple switch case that destructures the 'state' object, modifies the values
// according to the 'action' object and returns them as a new object
function authReducer(state, action) {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                user: action.payload
            };
        case LOGOUT:
            return {
                ...state,
                user: null
            };
        default:
            return state;
    }
}

function AuthProvider(props) {
    // initialState - initial value
    // state - value to be observed for change
    // dispatch - function that triggers event
    // authReducer - function that listens/reacts to the triggered events

    const [state, dispatch] = useReducer(authReducer, initialState);

    function login(userData) {
        localStorage.setItem("jwtToken", userData.token);
        dispatch({
            type: LOGIN,
            payload: userData
        });
    }

    function logout() {
        localStorage.removeItem("jwtToken");
        dispatch({ type: LOGOUT });
    }

    return <AuthContext.Provider value={{ user: state.user, login, logout }} {...props} />;
}

export { AuthContext, AuthProvider };
