"use client";

import { use } from "react";
import Link from "next/link";
import BookCard from "@/components/BookCard";
import { useAppSelector } from "@/utils/hooks";

export default function CategoryPage({
    params,
}: {
    params: Promise<{ category: string }>;
}) {

    const { category } = use(params);

    const books = useAppSelector((state) => state.book);

    const categoryBooks = books.filter(
        (book) =>
            book.type.toLowerCase() === category.toLowerCase()
    );

    const categoryName = category
        .replace("_", " ")
        .replace(/\b\w/g, (letter) => letter.toUpperCase());

    return (
        <div className="min-h-screen p-5">
            <Link
                href="/browsebook"
                className="inline-block mb-6 text-gray-600 hover:text-black"
            >
                ← Back to books
            </Link>

            <h1 className="text-3xl font-semibold mb-8">
                {categoryName} Books
            </h1>

            {categoryBooks.length === 0 ? (
                <p className="text-gray-500">
                    No books found in this category.
                </p>
            ) : (
                <div className="flex flex-wrap justify-center gap-5">
                    {categoryBooks.map((book) => (
                        <BookCard
                            key={book.id}
                            book={book}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}