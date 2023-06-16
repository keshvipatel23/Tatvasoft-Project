import { useContext, useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import shared from "../utils/shared";
import { RoutePaths } from "../utils/enum";

const initialUserValue = {
    id: 0,
    email: "",
    firstName: "",
    lastName: "",
    roleId: 0,
    role: "",
    password: "",
};

const initialState = {
    setUser: () => { },
    user: initialUserValue,
    signOut: () => { },
};

export const AuthContext = createContext(initialState);

export const AuthWrapper = ({ children }) => {
    const [user, _setUser] = useState(initialUserValue);
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const setUser = (user) => {
        console.log("hello", user);
        localStorage.setItem("user", JSON.stringify(user));
        _setUser(user);
    };
    useEffect(() => {
        const itemStr =
            JSON.parse(localStorage.getItem("user")) ||
            initialUserValue;
        // if (!itemStr.id) {
        // }
        _setUser(itemStr);
    }, []);
    const signOut = () => {
        localStorage.removeItem("user");
        _setUser(initialUserValue);
        navigate(`${RoutePaths.Login}`);
    };

    useEffect(() => {
        if(pathname === "/login" && user.id){
            navigate('/BookList');
        }
        if(!user.id){
            return;
        }
    }, [pathname, user]);
    let value = {
        user,
        setUser,
        signOut,
    };
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
    return useContext(AuthContext);
};