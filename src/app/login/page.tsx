"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { login } from "@/utils/authSlice";

const users = [
    {
        email: "admin@library.com",
        password: "123456",
        role: "admin" as const,
    },
    {
        email: "user@library.com",
        password: "123456",
        role: "customer" as const,
    },
];

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const dispatch = useDispatch();
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const user = users.find(
            (user) =>
                user.email === email &&
                user.password === password
        );

        if (!user) {
            setError("Invalid email or password");
            return;
        }

        localStorage.setItem(
            "libraryUser",
            JSON.stringify(user)
        );

        dispatch(login(user));

        if (user.role === "admin") {
            router.push("/admin");
        } else {
            router.push("/account");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white p-8 shadow-md"
            >
                <h1 className="text-3xl font-semibold text-center mb-6">
                    Login
                </h1>

                <div className="mb-4">
                    <label className="block mb-2 font-medium">
                        Email
                    </label>

                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="w-full border-2 border-gray-300 p-3 outline-none"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2 font-medium">
                        Password
                    </label>

                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        className="w-full border-2 border-gray-300 p-3 outline-none"
                    />
                </div>

                {error && (
                    <p className="text-red-500 mb-4">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    className="w-full bg-black text-white py-3 hover:bg-gray-800"
                >
                    Login
                </button>
            </form>
        </div>
    );
}