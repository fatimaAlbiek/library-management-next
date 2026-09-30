"use client";

import { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import store from "./utils/store";
import { setUser } from "./utils/authSlice";

function AuthLoader({ children }) {
    const dispatch = useDispatch();

    useEffect(() => {
        const savedUser = localStorage.getItem("libraryUser");

        if (savedUser) {
            const user = JSON.parse(savedUser);
            dispatch(setUser(user));
        } else {
            dispatch(setUser(null));
        }
    }, [dispatch]);

    return children;
}

export default function Providers({ children }) {
    return (
        <Provider store={store}>
            <AuthLoader>
                {children}
            </AuthLoader>
        </Provider>
    );
}