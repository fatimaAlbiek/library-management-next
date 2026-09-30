"use client";

import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import AdminDashboard from "@/components/AdminDashboard";

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

    return <AdminDashboard />;
}