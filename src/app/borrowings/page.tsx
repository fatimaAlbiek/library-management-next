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

                <div className="mb-10">
                    <p className="text-sm uppercase tracking-[3px] text-gray-400 mb-2">
                        Library
                    </p>

                    <h1 className="text-4xl font-semibold">
                        My Borrowings
                    </h1>

                    <p className="text-gray-500 mt-2">
                        View and manage your borrowed books
                    </p>
                </div>
                {borrowings.length === 0 ? (
                    <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">

                        <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-gray-100 flex items-center justify-center text-2xl">
                            📚
                        </div>

                        <h2 className="text-2xl font-semibold mb-2">
                            No Borrowings Yet
                        </h2>

                        <p className="text-gray-500 max-w-md mx-auto">
                            You haven't borrowed any books yet.
                            Explore our collection and find your next book.
                        </p>

                        <button
                            onClick={() => router.push("/browsebook")}
                            className="mt-6 bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition"
                        >
                            Browse Books
                        </button>

                    </div>
                ) : (
                    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                        <table className="w-full">

                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                                        Book
                                    </th>

                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                                        Borrow Date
                                    </th>

                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                                        Due Date
                                    </th>

                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                                        Status
                                    </th>

                                    <th className="text-left px-6 py-4 text-sm font-medium text-gray-500">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {borrowings.map((borrowing) => (
                                    <tr
                                        key={borrowing.id}
                                        className="border-t border-gray-200 hover:bg-gray-50 transition"
                                    >
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="font-medium text-gray-900">
                                                    {borrowing.bookTitle}
                                                </p>

                                                <p className="text-sm text-gray-400 mt-1">
                                                    Library book
                                                </p>
                                            </div>
                                        </td>

                                        <td className="px-6 py-5">
                                            {borrowing.borrowDate}
                                        </td>

                                        <td className="px-6 py-5">
                                            {borrowing.dueDate}
                                        </td>

                                        <td className="px-6 py-5">
                                            {borrowing.status === "Borrowed" ? (
                                                <span className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
                                                    Borrowed
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center rounded-full bg-gray-200 px-3 py-1 text-sm font-medium text-gray-500">
                                                    Returned
                                                </span>
                                            )}
                                        </td>

                                        <td className="px-6 py-5">
                                            {borrowing.status === "Borrowed" ? (
                                                <button
                                                    onClick={() =>
                                                        handleReturn(borrowing.id)
                                                    }
                                                    className="border border-black px-4 py-2 rounded-md text-sm font-medium hover:bg-black hover:text-white transition"
                                                >
                                                    Return Book
                                                </button>
                                            ) : (
                                                <span className="text-sm text-gray-400">
                                                    Completed
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