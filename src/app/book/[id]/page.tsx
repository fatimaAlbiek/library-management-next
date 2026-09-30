"use client";

import React from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import Booksdata from "@/components/Booksdata";


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

    const bookDatas = useSelector((state: any) => state.book) as Book[];

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

    return (
        <section className="p-5">

            <Link href="/browsebook">
                <button className="px-3 py-1">
                    <img
                        src="/assets/left_icon.svg"
                        alt="Back"
                        className="w-7 h-7"
                    />
                </button>
            </Link>

            <div className="flex md:flex-row flex-col justify-center gap-10 p-5 mt-5">

                <img
                    src={bookData.img}
                    alt="book_img"
                    className="h-80 w-96 object-cover"
                />

                <div>
                    <h2 className="font-semibold font-Poppins text-4xl mb-2">
                        Title : {bookData.title}
                    </h2>

                    <p className="font-base font-Poppins text-xl mb-2">
                        Description : {bookData.description}
                    </p>

                    <h4 className="text-lg font-semibold font-Poppins mb-2">
                        <span className="px-2 py-1 bg-black text-white font-medium text-base font-Poppins">
                            Author
                        </span>{" "}
                        : {bookData.author}
                    </h4>

                    <p className="font-Poppins text-md font-medium mt-1 text-orange-500">
                        Ratings {bookData.rating}+
                    </p>
                </div>

            </div>

            <Booksdata title="See other books" />

        </section>
    );
}