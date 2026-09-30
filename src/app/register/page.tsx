"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { login } from "@/utils/authSlice";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const router = useRouter();
    const dispatch = useDispatch();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        const savedUsers = localStorage.getItem("libraryUsers");
        const users = savedUsers ? JSON.parse(savedUsers) : [];

        const existingUser = users.find(
            (user: { email: string }) => user.email === email
        );

        if (existingUser) {
            setError("Email is already registered");
            return;
        }

        const newUser = {
            email,
            password,
            role: "customer" as const,
        };

        users.push(newUser);

        localStorage.setItem(
            "libraryUsers",
            JSON.stringify(users)
        );

        localStorage.setItem(
            "libraryUser",
            JSON.stringify(newUser)
        );

        dispatch(login(newUser));

        router.push("/account");
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md bg-white p-8 shadow-md"
            >
                <h1 className="text-3xl font-semibold text-center mb-6">
                    Create Account
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
                        required
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
                        required
                        className="w-full border-2 border-gray-300 p-3 outline-none"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-2 font-medium">
                        Confirm Password
                    </label>

                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) =>
                            setConfirmPassword(e.target.value)
                        }
                        placeholder="Confirm your password"
                        required
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
                    Register
                </button>

                <p className="text-center mt-4 text-gray-600">
                    Already have an account?{" "}
                    <button
                        type="button"
                        onClick={() => router.push("/login")}
                        className="text-black font-medium hover:underline"
                    >
                        Login
                    </button>
                </p>
            </form>
        </div>
    );
}