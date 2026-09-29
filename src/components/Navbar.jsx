"use client";

import Link from "next/link";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineMenu } from "react-icons/hi";
import { logout } from "@/utils/authSlice";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const user = useSelector((state) => state.auth.user);

    const isAuthenticated = useSelector(
        (state) => state.auth.isAuthenticated
    );


    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.removeItem("libraryUser");
        dispatch(logout());
        setIsOpen(false);
    };

    return (
        <nav className="w-full">
            <div className="bg-white bg-opacity-65 font-Poppins flex justify-between items-center p-5 sticky top-0">

                <h2 className="font-Oswald font-base text-2xl text-black">
                    eBook
                </h2>

                {/* Desktop */}
                <ul className="hidden md:flex items-center gap-5 text-medium font-base cursor-pointer">

                    <Link href="/">
                        <li>Home</li>
                    </Link>

                    <Link href="/browsebook">
                        <li>Browse Book</li>
                    </Link>

                    {!isAuthenticated && (
                        <Link href="/login">
                            <li>Login</li>
                        </Link>
                    )}

                    {isAuthenticated && user?.role === "admin" && (
                        <Link href="/admin">
                            <li>Admin Dashboard</li>
                        </Link>
                    )}
                    {isAuthenticated && (
                        <li
                            onClick={handleLogout}
                            className="cursor-pointer"
                        >
                            Logout
                        </li>
                    )}
                    {isAuthenticated && user?.role === "customer" && (
                        <Link
                            href="/account"
                            onClick={() => setIsOpen(false)}
                        >
                            <li>My Account</li>
                        </Link>

                    )}
                    {isAuthenticated && user?.role === "customer" && (
                        <Link
                            href="/borrowings"
                            onClick={() => setIsOpen(false)}
                        >
                            <li>My Borrowings</li>
                        </Link>
                    )}

                </ul>

                {/* Mobile menu button */}
                <div className="md:hidden">
                    <HiOutlineMenu
                        className="w-8 h-8"
                        onClick={() => setIsOpen(!isOpen)}
                    />

                </div>
            </div>

            {/* Mobile menu */}
            <div className="p-2">
                {isOpen && (
                    <ul className="md:hidden flex flex-col justify-start gap-5 bg-black rounded-sm text-white w-full text-medium font-base cursor-pointer p-3">

                        <Link
                            href="/"
                            onClick={() => setIsOpen(false)}
                        >
                            <li>Home</li>
                        </Link>

                        <Link
                            href="/browsebook"
                            onClick={() => setIsOpen(false)}
                        >
                            <li>Browse Book</li>
                        </Link>

                        {!isAuthenticated && (
                            <Link
                                href="/login"
                                onClick={() => setIsOpen(false)}
                            >
                                <li>Login</li>
                            </Link>
                        )}

                        {isAuthenticated && user?.role === "admin" && (
                            <Link
                                href="/admin"
                                onClick={() => setIsOpen(false)}
                            >
                                <li>Admin Dashboard</li>
                            </Link>
                        )}

                        {isAuthenticated && user?.role === "customer" && (
                            <Link
                                href="/account"
                                onClick={() => setIsOpen(false)}
                            >
                                <li>My Account</li>
                            </Link>
                        )}
                        {isAuthenticated && user?.role === "customer" && (
                            <Link
                                href="/borrowings"
                                onClick={() => setIsOpen(false)}
                            >
                                <li>My Borrowings</li>
                            </Link>
                        )}
                        {isAuthenticated && (
                            <li
                                onClick={handleLogout}
                                className="cursor-pointer"
                            >
                                Logout
                            </li>
                        )}
                    </ul>
                )}
            </div>
        </nav>
    );
};

export default Navbar;