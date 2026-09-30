"use client";

import Navbar from "@/components/Navbar";
import { useSelector } from "react-redux";

export default function BorrowedBooksPage() {
    const loans = useSelector((state: any) => state.loan || []);

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
                                    {loans.map((loan: any) => (
                                        <tr key={loan.id} className="transition-colors hover:bg-slate-50">
                                            <td className="px-5 py-4 font-semibold text-slate-900">{loan.bookTitle}</td>
                                            <td className="px-5 py-4 text-slate-600">{loan.borrower}</td>
                                            <td className="px-5 py-4 text-slate-600">{loan.borrowedDate}</td>
                                            <td className="px-5 py-4 text-slate-600">{loan.returnDate}</td>
                                            <td className="px-5 py-4">
                                                <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${loan.status === "Returned" ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                                                    {loan.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}