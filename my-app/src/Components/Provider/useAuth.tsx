import React from "react";
import {AuthContext} from "./ProviderAuth";

export const useAuth = () => {
    const value = React.useContext(AuthContext)
    return value
}