"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function AdminPage() {
    const user = useSelector((state: any) => state.auth.user);
    const isAuthenticated = useSelector(
        (state: any) => state.auth.isAuthenticated
    );

    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated || user?.role !== "admin") {
            router.replace("/login");
        }
    }, [isAuthenticated, user, router]);

    // ننتظر قبل ما نعرض الصفحة
    if (!isAuthenticated || user?.role !== "admin") {
        return null;
    }

    return (
        <div className="p-10">
            <h1 className="text-4xl font-semibold">
                Admin Dashboard
            </h1>

            <p className="mt-4">
                Welcome, {user?.email}
            </p>
        </div>
    );
}