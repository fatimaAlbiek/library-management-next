"use client";

import { useSelector } from "react-redux";
import Link from "next/link";
import BookCard from "./BookCard";

type Book = {
    id: string | number;
    title: string;
    author: string;
    description: string;
    img: string;
    rating: number;
    isNew?: boolean;
};

type BooksdataProps = {
    title?: string;
    inputValue?: string;
};

const Booksdata = ({ title, inputValue }: BooksdataProps) => {
    const bookData = useSelector((state: any) => state.book) as Book[];

    const searchedValue = inputValue
        ? inputValue.toLowerCase()
        : "";

    const filterData = bookData.filter(
        (book) =>
            (book.title &&
                book.title.toLowerCase().includes(searchedValue)) ||
            (book.author &&
                book.author.toLowerCase().includes(searchedValue))
    );

    return (
        <div className="mt-10 p-5">
            <div className="flex justify-between items-center">
                <h2 className="font-Poppins font-medium text-3xl">
                    {title ? title : "Popular Books"}
                </h2>

                {!title && (
                    <Link
                        href="/browsebook"
                        className="text-black font-normal text-base underline underline-offset-1"
                    >
                        View more
                    </Link>
                )}
            </div>

            <div className="flex flex-wrap justify-center gap-5 mt-8">
                {filterData.map((book) => (
                    <BookCard book={book} key={book.id} />
                ))}
            </div>
        </div>
    );
};

export default Booksdata;