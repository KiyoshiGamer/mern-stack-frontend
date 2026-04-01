import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => {
    const context = useContext(AuthContext)

    if(!context) {
        throw Error('AuthContext must be used inside an AuthContextProvider')
    }

    return context
}