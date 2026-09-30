"use client";

import { useEffect, useState } from "react";
import { defaultUsers } from "@/utils/users";

type Borrowing = {
    id: string;
    userEmail: string;
    bookId: string;
    bookTitle: string;
    borrowDate: string;
    dueDate: string;
    status: "Borrowed" | "Returned";
};

type Customer = {
    email: string;
    password: string;
    role: string;
};

export default function CustomersPage() {
    const [search, setSearch] = useState("");
    const [borrowings, setBorrowings] = useState<Borrowing[]>([]);
    const [selectedCustomer, setSelectedCustomer] =
        useState<Customer | null>(null);

    // Read borrowings from localStorage
    useEffect(() => {
        const savedBorrowings = localStorage.getItem("borrowings");

        if (savedBorrowings) {
            setBorrowings(JSON.parse(savedBorrowings));
        }
    }, []);

    // Get customers only
    const customers = defaultUsers.filter(
        (user) => user.role === "customer"
    );

    // Search
    const filteredCustomers = customers.filter((customer) =>
        customer.email
            .toLowerCase()
            .includes(search.toLowerCase())
    );

    // Selected customer's borrowings
    const selectedCustomerBorrowings = selectedCustomer
        ? borrowings.filter(
            (borrowing) =>
                borrowing.userEmail === selectedCustomer.email
        )
        : [];

    return (
        <div className="p-10">

            {/* Header */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-4xl font-semibold">
                        Customers
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Manage your library customers
                    </p>
                </div>

                <div className="text-sm text-gray-500">
                    Total Customers:{" "}
                    <span className="font-semibold text-black">
                        {customers.length}
                    </span>
                </div>
            </div>

            {/* Search */}
            <div className="mb-6">
                <input
                    type="text"
                    placeholder="Search by email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full max-w-md rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
                />
            </div>

            {/* Customers Table */}
            <div className="overflow-hidden rounded-xl border border-gray-200">
                <table className="w-full text-left">

                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-4">
                                Customer
                            </th>

                            <th className="px-6 py-4">
                                Email
                            </th>

                            <th className="px-6 py-4">
                                Borrowings
                            </th>

                            <th className="px-6 py-4">
                                Action
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredCustomers.map((customer) => {

                            const customerBorrowings =
                                borrowings.filter(
                                    (borrowing) =>
                                        borrowing.userEmail ===
                                        customer.email
                                );

                            return (
                                <tr
                                    key={customer.email}
                                    className="border-t border-gray-200 hover:bg-gray-50"
                                >

                                    <td className="px-6 py-4 font-medium">
                                        Customer
                                    </td>

                                    <td className="px-6 py-4 text-gray-600">
                                        {customer.email}
                                    </td>

                                    <td className="px-6 py-4">
                                        <span className="font-medium">
                                            {customerBorrowings.length}
                                        </span>
                                    </td>

                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() =>
                                                setSelectedCustomer(
                                                    customer
                                                )
                                            }
                                            className="rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100"
                                        >
                                            View
                                        </button>
                                    </td>

                                </tr>
                            );
                        })}

                        {filteredCustomers.length === 0 && (
                            <tr>
                                <td
                                    colSpan={4}
                                    className="px-6 py-10 text-center text-gray-500"
                                >
                                    No customers found.
                                </td>
                            </tr>
                        )}
                    </tbody>

                </table>
            </div>

            {/* Customer Details */}
            {selectedCustomer && (
                <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6">

                    {/* Details Header */}
                    <div className="flex items-center justify-between mb-6">

                        <div>
                            <h2 className="text-2xl font-semibold">
                                Customer Details
                            </h2>

                            <p className="text-gray-500 mt-1">
                                {selectedCustomer.email}
                            </p>
                        </div>

                        <button
                            onClick={() =>
                                setSelectedCustomer(null)
                            }
                            className="rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100"
                        >
                            Close
                        </button>

                    </div>

                    {/* Customer Info */}
                    <div className="mb-8 rounded-lg bg-gray-50 p-5">

                        <p className="text-sm text-gray-500">
                            Email
                        </p>

                        <p className="font-medium mt-1">
                            {selectedCustomer.email}
                        </p>

                    </div>

                    {/* Borrowings */}
                    <h3 className="text-xl font-semibold mb-4">
                        Borrowings
                    </h3>

                    {selectedCustomerBorrowings.length === 0 ? (

                        <div className="rounded-lg bg-gray-50 p-8 text-center">
                            <p className="text-gray-500">
                                This customer has no borrowings.
                            </p>
                        </div>

                    ) : (

                        <div className="overflow-hidden rounded-lg border border-gray-200">

                            <table className="w-full text-left">

                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-5 py-3">
                                            Book
                                        </th>

                                        <th className="px-5 py-3">
                                            Borrow Date
                                        </th>

                                        <th className="px-5 py-3">
                                            Due Date
                                        </th>

                                        <th className="px-5 py-3">
                                            Status
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {selectedCustomerBorrowings.map(
                                        (borrowing) => (
                                            <tr
                                                key={borrowing.id}
                                                className="border-t border-gray-200"
                                            >

                                                <td className="px-5 py-4 font-medium">
                                                    {
                                                        borrowing.bookTitle
                                                    }
                                                </td>

                                                <td className="px-5 py-4 text-gray-600">
                                                    {
                                                        borrowing.borrowDate
                                                    }
                                                </td>

                                                <td className="px-5 py-4 text-gray-600">
                                                    {
                                                        borrowing.dueDate
                                                    }
                                                </td>

                                                <td className="px-5 py-4">

                                                    {borrowing.status ===
                                                        "Borrowed" ? (
                                                        <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
                                                            Borrowed
                                                        </span>
                                                    ) : (
                                                        <span className="rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-500">
                                                            Returned
                                                        </span>
                                                    )}

                                                </td>

                                            </tr>
                                        )
                                    )}

                                </tbody>

                            </table>

                        </div>

                    )}

                </div>
            )}

        </div>
    );
}