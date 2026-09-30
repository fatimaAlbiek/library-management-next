"use client";

import React from "react";
import Link from "next/link";
import { useAppSelector } from "@/utils/hooks";
import Booksdata from "@/components/Booksdata";
import { useRouter } from "next/navigation";
import Image from "next/image";
type Book = {
    id: string | number;
    title: string;
    author: string;
    description: string;
    img: string;
    rating: number | string;
    isNew?: boolean;
};

export default function BookDetail({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = React.use(params);
    const router = useRouter();
    const bookDatas = useAppSelector((state) => state.book) as Book[];

    const bookData = bookDatas.find(
        (book) => String(book.id) === id
    );

    if (!bookData) {
        return (
            <div className="p-10 text-center">
                <h2 className="text-2xl font-semibold">
                    Book not found
                </h2>

                <Link
                    href="/browsebook"
                    className="inline-block mt-5 bg-black text-white px-4 py-2"
                >
                    Back to books
                </Link>
            </div>
        );
    }
    const handleBorrow = () => {
        const savedUser = localStorage.getItem("libraryUser");

        if (!savedUser) {
            router.push("/login");
            return;
        }

        const user = JSON.parse(savedUser);

        const savedBorrowings = localStorage.getItem("borrowings");

        const borrowings = savedBorrowings
            ? JSON.parse(savedBorrowings)
            : [];
        const alreadyBorrowed = borrowings.some(
            (borrowing: {
                userEmail: string;
                bookId: string;
                status: string;
            }) =>
                borrowing.userEmail === user.email &&
                borrowing.bookId === String(bookData.id) &&
                borrowing.status === "Borrowed"
        );

        if (alreadyBorrowed) {
            alert("You have already borrowed this book.");
            return;
        }
        const newBorrowing = {
            id: Date.now().toString(),
            userEmail: user.email,
            bookId: String(bookData.id),
            bookTitle: bookData.title,
            borrowDate: new Date().toISOString().split("T")[0],
            dueDate: new Date(
                Date.now() + 14 * 24 * 60 * 60 * 1000
            )
                .toISOString()
                .split("T")[0],
            status: "Borrowed",
        };

        borrowings.push(newBorrowing);

        localStorage.setItem(
            "borrowings",
            JSON.stringify(borrowings)
        );

        alert("Book borrowed successfully!");
    };
    return (
        <section className="min-h-screen bg-gray-50 px-6 py-10">

            <Link
                href="/browsebook"
                className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition"
            >
                <Image
                    src="/assets/left_icon.svg"
                    alt="Back"
                    width={20}
                    height={20}
                    className="w-5 h-5"
                />

                <span>Back to books</span>
            </Link>

            <div className="mt-8 bg-white border border-gray-200 rounded-2xl p-6 md:p-10">
                <div className="grid md:grid-cols-2 gap-10 items-center">
                    <div>      <Image
                        src={bookData.img}
                        alt={bookData.title}
                        width={384}
                        height={480}
                        className="w-full h-[480px] object-cover rounded-lg"
                    />
                    </div>
                    <div>
                        <p className="text-sm uppercase tracking-[3px] text-gray-400 mb-3">
                            Book Details
                        </p>

                        <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
                            {bookData.title}
                        </h1>

                        <p className="text-gray-500 text-lg mt-3">
                            by {bookData.author}
                        </p>

                        <div className="flex items-center gap-2 mt-5">
                            <span className="text-lg">
                                ★
                            </span>

                            <span className="font-medium">
                                {bookData.rating}
                            </span>

                            <span className="text-gray-400">
                                rating
                            </span>
                        </div>

                        <div className="border-t border-gray-200 mt-7 pt-7">
                            <h2 className="text-lg font-semibold mb-3">
                                Description
                            </h2>

                            <p className="text-gray-600 leading-7">
                                {bookData.description}
                            </p>
                        </div>

                        <button
                            onClick={handleBorrow}
                            className="mt-8 bg-black text-white px-7 py-3 rounded-md hover:bg-gray-800 transition"
                        >
                            Borrow Book
                        </button>
                    </div>
                </div>
            </div>

            <Booksdata title="See other books" />

        </section>
    );
}