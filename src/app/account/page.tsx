"use client";

import { useEffect } from "react";
import { useAppSelector } from "@/utils/hooks";
import { useRouter } from "next/navigation";

export default function AccountPage() {
    const user = useAppSelector((state) => state.auth.user);

    const isAuthenticated = useAppSelector(
        (state) => state.auth.isAuthenticated
    );

    const isLoading = useAppSelector(
        (state) => state.auth.isLoading
    );

    const router = useRouter();

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
        <div className="min-h-screen bg-gray-50 p-6 md:p-10">
            <div className="max-w-4xl mx-auto">

                <h1 className="text-4xl font-semibold mb-2">
                    My Account
                </h1>

                <p className="text-gray-500 mb-8">
                    Welcome to your library account
                </p>

                <div className="bg-white shadow-md p-6 rounded-md">
                    <h2 className="text-2xl font-semibold mb-6">
                        Profile Information
                    </h2>

                    <div className="space-y-4">
                        <div>
                            <p className="text-sm text-gray-500">
                                Email
                            </p>

                            <p className="text-lg">
                                {user.email}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">
                                Account Type
                            </p>

                            <p className="text-lg capitalize">
                                {user.role}
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}