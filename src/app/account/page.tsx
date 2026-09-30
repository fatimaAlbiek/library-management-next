"use client";

import { useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/utils/hooks";
import { setUser } from "@/utils/authSlice";
import { useRouter } from "next/navigation";

export default function AccountPage() {
    const dispatch = useAppDispatch();

    const [isEditing, setIsEditing] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const user = useAppSelector((state) => state.auth.user);

    const isAuthenticated = useAppSelector(
        (state) => state.auth.isAuthenticated
    );

    const isLoading = useAppSelector(
        (state) => state.auth.isLoading
    );

    const router = useRouter();
    useEffect(() => {
        if (user) {
            setEmail(user.email);
            setPassword(user.password);
        }
    }, [user]);
    useEffect(() => {
        if (!isLoading) {
            if (!isAuthenticated || user?.role !== "customer") {
                router.replace("/login");
            }
        }
    }, [isLoading, isAuthenticated, user, router]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Loading...</p>
            </div>
        );
    }

    if (!isAuthenticated || user?.role !== "customer") {
        return null;
    }

    return (
        <div className="min-h-screen bg-gray-50 px-6 py-12">
            <div className="max-w-5xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-semibold">
                        My Account
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Manage your account
                    </p>
                </div>

                <div className="grid md:grid-cols-4 gap-6">

                    {/* Sidebar */}
                    <aside className="bg-white border border-gray-200 rounded-xl p-5 h-fit">

                        <div className="flex items-center gap-3 pb-5 border-b">
                            <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-lg font-semibold">
                                {user.email.charAt(0).toUpperCase()}
                            </div>

                            <div className="min-w-0">
                                <p className="font-medium truncate">
                                    {user.email}
                                </p>

                                <p className="text-sm text-gray-400">
                                    Customer
                                </p>
                            </div>
                        </div>

                        <nav className="mt-5 space-y-2">

                            <button
                                className="w-full text-left px-4 py-3 rounded-lg bg-black text-white"
                            >
                                Profile
                            </button>

                            <button
                                onClick={() => router.push("/borrowings")}
                                className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 transition"
                            >
                                My Borrowings
                            </button>

                            <button
                                onClick={() => router.push("/browsebook")}
                                className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 transition"
                            >
                                Browse Books
                            </button>

                        </nav>
                    </aside>

                    {/* Main Content */}
                    <main className="md:col-span-3 bg-white border border-gray-200 rounded-xl p-8">

                        <div className="border-b pb-6">
                            <h2 className="text-2xl font-semibold">
                                Profile Information
                            </h2>

                            <p className="text-gray-500 mt-2">
                                Your personal library account information
                            </p>
                        </div>

                        <div className="mt-8 space-y-6">

                            <div>
                                <p className="text-sm text-gray-400 mb-2">
                                    Email Address
                                </p>

                                {isEditing ? (
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-black"
                                    />
                                ) : (
                                    <div className="border border-gray-200 rounded-lg px-4 py-3 bg-gray-50">
                                        {user.email}
                                    </div>
                                )}
                            </div>

                            {isEditing && (
                                <div>
                                    <p className="text-sm text-gray-400 mb-2">
                                        Password
                                    </p>

                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-black"
                                    />
                                </div>
                            )}

                            <div>
                                <p className="text-sm text-gray-400 mb-2">
                                    Account Type
                                </p>

                                <div className="border border-gray-200 rounded-lg px-4 py-3 bg-gray-50 capitalize">
                                    {user.role}
                                </div>
                            </div>

                        </div>
                        {!isEditing ? (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="mt-8 border border-black px-6 py-3 rounded-lg hover:bg-black hover:text-white transition"
                            >
                                Edit Profile
                            </button>
                        ) : (
                            <div className="mt-8 flex gap-3">

                                <button
                                    onClick={() => {
                                        if (!email || !password) {
                                            alert("Please fill in all fields.");
                                            return;
                                        }

                                        const savedUsers =
                                            localStorage.getItem("libraryUsers");

                                        const users = savedUsers
                                            ? JSON.parse(savedUsers)
                                            : [];

                                        const emailExists = users.some(
                                            (item: { email: string }) =>
                                                item.email === email &&
                                                item.email !== user.email
                                        );

                                        if (emailExists) {
                                            alert("This email is already in use.");
                                            return;
                                        }

                                        const updatedUser = {
                                            ...user,
                                            email,
                                            password,
                                        };

                                        // Update current logged-in user
                                        localStorage.setItem(
                                            "libraryUser",
                                            JSON.stringify(updatedUser)
                                        );

                                        // Find old user and update it
                                        const userExists = users.some(
                                            (item: { email: string }) =>
                                                item.email === user.email
                                        );

                                        let updatedUsers;

                                        if (userExists) {
                                            updatedUsers = users.map(
                                                (item: typeof updatedUser) =>
                                                    item.email === user.email
                                                        ? updatedUser
                                                        : item
                                            );
                                        } else {
                                            updatedUsers = [
                                                ...users,
                                                updatedUser,
                                            ];
                                        }

                                        localStorage.setItem(
                                            "libraryUsers",
                                            JSON.stringify(updatedUsers)
                                        );

                                        dispatch(setUser(updatedUser));

                                        setIsEditing(false);

                                        alert("Profile updated successfully!");
                                    }}
                                    className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
                                >
                                    Save Changes
                                </button>

                                <button
                                    onClick={() => {
                                        setEmail(user.email);
                                        setPassword(user.password);
                                        setIsEditing(false);
                                    }}
                                    className="border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-100 transition"
                                >
                                    Cancel
                                </button>

                            </div>
                        )}
                        <div className="mt-10 pt-6 border-t">
                            <h3 className="font-semibold mb-2">
                                Library Activity
                            </h3>

                            <p className="text-gray-500 text-sm">
                                View your borrowed books and manage your
                                current borrowings.
                            </p>

                            <button
                                onClick={() => router.push("/borrowings")}
                                className="mt-4 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
                            >
                                View Borrowings
                            </button>
                        </div>

                    </main>
                </div>
            </div>
        </div>
    );
}