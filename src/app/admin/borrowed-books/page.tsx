"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

type Borrowing = {
    id: string;
    userEmail: string;
    bookId: string;
    bookTitle: string;
    borrowDate: string;
    dueDate: string;
    status: "Borrowed" | "Returned";
};

export default function BorrowedBooksPage() {
    const [borrowings, setBorrowings] = useState<Borrowing[]>([]);

    useEffect(() => {
        const loadBorrowings = () => {
            const savedBorrowings = localStorage.getItem("borrowings");

            if (!savedBorrowings) {
                setBorrowings([]);
                return;
            }

            try {
                const parsedBorrowings: Borrowing[] =
                    JSON.parse(savedBorrowings);

                setBorrowings(parsedBorrowings);
            } catch (error) {
                console.error("Error loading borrowings:", error);
                setBorrowings([]);
            }
        };

        loadBorrowings();

        window.addEventListener("storage", loadBorrowings);
        window.addEventListener("focus", loadBorrowings);

        return () => {
            window.removeEventListener("storage", loadBorrowings);
            window.removeEventListener("focus", loadBorrowings);
        };
    }, []);

    return (
        <>
            <Navbar />

            <main className="min-h-screen bg-slate-100 px-4 py-8 md:px-10">
                <div className="mx-auto max-w-6xl">

                    <div className="mb-8">
                        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">
                            Library activity
                        </p>

                        <h1 className="mt-2 text-3xl font-bold text-slate-900">
                            Borrowed Books
                        </h1>

                        <p className="mt-2 text-sm text-slate-500">
                            Track borrowed books, borrowers, and return dates.
                        </p>
                    </div>

                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <div className="overflow-x-auto">

                            {borrowings.length === 0 ? (
                                <div className="p-10 text-center text-slate-500">
                                    No borrowing records found.
                                </div>
                            ) : (
                                <table className="w-full min-w-[760px] text-left text-sm">
                                    <thead className="bg-slate-900 text-xs uppercase tracking-wide text-white">
                                        <tr>
                                            <th className="px-5 py-4">Book</th>
                                            <th className="px-5 py-4">Borrower</th>
                                            <th className="px-5 py-4">Borrowed date</th>
                                            <th className="px-5 py-4">Return date</th>
                                            <th className="px-5 py-4">Status</th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-slate-100">
                                        {borrowings.map((borrowing) => (
                                            <tr
                                                key={borrowing.id}
                                                className="transition-colors hover:bg-slate-50"
                                            >
                                                <td className="px-5 py-4 font-semibold text-slate-900">
                                                    {borrowing.bookTitle}
                                                </td>

                                                <td className="px-5 py-4 text-slate-600">
                                                    {borrowing.userEmail}
                                                </td>

                                                <td className="px-5 py-4 text-slate-600">
                                                    {borrowing.borrowDate}
                                                </td>

                                                <td className="px-5 py-4 text-slate-600">
                                                    {borrowing.dueDate}
                                                </td>

                                                <td className="px-5 py-4">
                                                    <span
                                                        className={
                                                            borrowing.status === "Returned"
                                                                ? "inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700"
                                                                : "inline-flex rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-700"
                                                        }
                                                    >
                                                        {borrowing.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}

                        </div>
                    </div>

                </div>
            </main>
        </>
    );
}