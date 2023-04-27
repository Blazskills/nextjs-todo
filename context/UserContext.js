"use client"


import React, {useState} from "react";

export const EmailContext = React.createContext(null);

export default function UserContext({children}){
    const [userEmail, setUserEmail] = useState("");

    return (
        <EmailContext.Provider value={[userEmail, setUserEmail]}>
            {children}
        </EmailContext.Provider>
    );
}

export function useEmail(){
    const context = React.useContext(EmailContext);
    if(context === undefined){
        throw new Error("useCoupon must be used within a couponProvider")
    }
    return context

}