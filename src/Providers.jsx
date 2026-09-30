"use client";

import { useEffect, useState } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./utils/store";
import { setUser } from "./utils/authSlice";
import { setCategories } from "./utils/categorySlice";

function AuthLoader({ children }) {
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.category);
    const [categoriesLoaded, setCategoriesLoaded] = useState(false);

    useEffect(() => {
        const savedUser = localStorage.getItem("libraryUser");

        if (savedUser) {
            const user = JSON.parse(savedUser);
            dispatch(setUser(user));
        } else {
            dispatch(setUser(null));
        }
    }, [dispatch]);

    useEffect(() => {
        const savedCategories = localStorage.getItem("libraryCategories");

        if (savedCategories) {
            dispatch(setCategories(JSON.parse(savedCategories)));
        }

        setCategoriesLoaded(true);
    }, [dispatch]);

    useEffect(() => {
        if (categoriesLoaded) {
            localStorage.setItem("libraryCategories", JSON.stringify(categories));
        }
    }, [categories, categoriesLoaded]);

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