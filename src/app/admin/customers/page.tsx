"use client";

import { useState } from "react";

const customers = [
    {
        id: 1,
        name: "Sara Ahmed",
        email: "sara@gmail.com",
        phone: "0991234567",
        borrowings: 3,
    },
    {
        id: 2,
        name: "Noor Ali",
        email: "noor@gmail.com",
        phone: "0987654321",
        borrowings: 1,
    },
    {
        id: 3,
        name: "Lina Hassan",
        email: "lina@gmail.com",
        phone: "0912345678",
        borrowings: 5,
    },
];

export default function CustomersPage() {
    const [search, setSearch] = useState("");

    const filteredCustomers = customers.filter((customer) =>
        customer.name.toLowerCase().includes(search.toLowerCase()) ||
        customer.email.toLowerCase().includes(search.toLowerCase())
    );

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
                    placeholder="Search by name or email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full max-w-md rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-black"
                />
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-xl border border-gray-200">
                <table className="w-full text-left">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-4">Customer</th>
                            <th className="px-6 py-4">Email</th>
                            <th className="px-6 py-4">Phone</th>
                            <th className="px-6 py-4">Borrowings</th>
                            <th className="px-6 py-4">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {filteredCustomers.map((customer) => (
                            <tr
                                key={customer.id}
                                className="border-t border-gray-200"
                            >
                                <td className="px-6 py-4 font-medium">
                                    {customer.name}
                                </td>

                                <td className="px-6 py-4 text-gray-600">
                                    {customer.email}
                                </td>

                                <td className="px-6 py-4 text-gray-600">
                                    {customer.phone}
                                </td>

                                <td className="px-6 py-4">
                                    {customer.borrowings}
                                </td>

                                <td className="px-6 py-4">
                                    <button
                                        className="rounded-lg border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100"
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {filteredCustomers.length === 0 && (
                            <tr>
                                <td
                                    colSpan={5}
                                    className="px-6 py-10 text-center text-gray-500"
                                >
                                    No customers found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

        </div>
    );
}