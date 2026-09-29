"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "@/utils/hooks";
import { useRouter } from "next/navigation";

type Borrowing = {
    id: string;
    userEmail: string;
    bookId: string;
    bookTitle: string;
    borrowDate: string;
    dueDate: string;
    status: "Borrowed" | "Returned";
};

export default function BorrowingsPage() {
    const [borrowings, setBorrowings] = useState<Borrowing[]>([]);

    const user = useAppSelector((state) => state.auth.user);

    const isAuthenticated = useAppSelector(
        (state) => state.auth.isAuthenticated
    );

    const isLoading = useAppSelector(
        (state) => state.auth.isLoading
    );

    const router = useRouter();

    useEffect(() => {
        if (isLoading) return;

        if (!isAuthenticated || user?.role !== "customer") {
            router.replace("/login");
            return;
        }

        const savedBorrowings =
            localStorage.getItem("borrowings");

        if (savedBorrowings) {
            const allBorrowings: Borrowing[] =
                JSON.parse(savedBorrowings);

            const userBorrowings = allBorrowings.filter(
                (borrowing) =>
                    borrowing.userEmail === user.email
            );

            setBorrowings(userBorrowings);
        } else {
            setBorrowings([]);
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
    const handleReturn = (id: string) => {
        const savedBorrowings = localStorage.getItem("borrowings");

        if (!savedBorrowings) return;

        const allBorrowings: Borrowing[] =
            JSON.parse(savedBorrowings);

        const updatedBorrowings = allBorrowings.map(
            (borrowing) =>
                borrowing.id === id
                    ? { ...borrowing, status: "Returned" as const }
                    : borrowing
        );

        localStorage.setItem(
            "borrowings",
            JSON.stringify(updatedBorrowings)
        );

        setBorrowings(
            updatedBorrowings.filter(
                (borrowing) =>
                    borrowing.userEmail === user?.email
            )
        );
    };
    return (
        <div className="min-h-screen bg-gray-50 p-6 md:p-10">
            <div className="max-w-6xl mx-auto">

                <h1 className="text-4xl font-semibold mb-2">
                    My Borrowings
                </h1>

                <p className="text-gray-500 mb-8">
                    View your borrowed books and due dates
                </p>

                {borrowings.length === 0 ? (
                    <div className="bg-white p-10 text-center shadow-md rounded-md">
                        <h2 className="text-xl font-semibold mb-2">
                            No Borrowings Yet
                        </h2>

                        <p className="text-gray-500">
                            You haven't borrowed any books yet.
                        </p>
                    </div>
                ) : (
                    <div className="bg-white shadow-md rounded-md overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="text-left p-4">
                                        Book
                                    </th>

                                    <th className="text-left p-4">
                                        Borrow Date
                                    </th>

                                    <th className="text-left p-4">
                                        Due Date
                                    </th>

                                    <th className="text-left p-4">
                                        Status
                                    </th>
                                    <th className="text-left p-4">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {borrowings.map((borrowing) => (
                                    <tr
                                        key={borrowing.id}
                                        className="border-t"
                                    >
                                        <td className="p-4">
                                            {borrowing.bookTitle}
                                        </td>

                                        <td className="p-4">
                                            {borrowing.borrowDate}
                                        </td>

                                        <td className="p-4">
                                            {borrowing.dueDate}
                                        </td>

                                        <td className="p-4">
                                            {borrowing.status}
                                        </td>
                                        <td className="p-4">
                                            {borrowing.status === "Borrowed" ? (
                                                <button
                                                    onClick={() => handleReturn(borrowing.id)}
                                                    className="bg-black text-white px-4 py-2 hover:bg-gray-800"
                                                >
                                                    Return Book
                                                </button>
                                            ) : (
                                                <span className="text-gray-500">
                                                    Returned
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

            </div>
        </div>
    );
}