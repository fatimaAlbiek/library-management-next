"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { addBook } from "@/utils/bookSlice";
import { nanoid } from "nanoid";

const AddBooks = () => {
    const [error, setError] = useState("");

    const [bookData, setBookData] = useState({
        title: "",
        author: "",
        type: "",
        image: null as File | null,
        description: "",
    });

    const dispatch = useDispatch();
    const router = useRouter();

    const handleChange = (
        event: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = event.target;

        if (event.target instanceof HTMLInputElement && event.target.files) {
            setBookData({
                ...bookData,
                [name]: event.target.files[0],
            });
        } else {
            setBookData({
                ...bookData,
                [name]: value,
            });
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const { title, author, image, description, type } = bookData;

        if (!title || !author || !type || !image || !description) {
            setError("Please ensure all the fields are entered");
            return;
        }

        const newBook = {
            id: nanoid(),
            title,
            type,
            author,
            description,
            img: URL.createObjectURL(image),
            isNew: true,
            rating: 0,
        };

        dispatch(addBook(newBook));

        router.push("/admin");
    };

    return (
        <form
            className="md:w-1/2 w-full font-Poppins p-12 mx-auto"
            onSubmit={handleSubmit}
        >
            <h2 className="font-semibold text-2xl mb-4 text-center">
                Add new Book
            </h2>

            <div className="mb-4">
                <label className="font-medium text-lg text-gray-600 mb-2">
                    Title
                </label>

                <input
                    type="text"
                    name="title"
                    value={bookData.title}
                    onChange={handleChange}
                    placeholder="Enter a Title of Book"
                    className="w-full h-12 pl-2 pr-5 border-2 border-black outline-none"
                />
            </div>

            <div className="mb-4">
                <label className="font-medium text-lg text-gray-600 mb-2">
                    Author
                </label>

                <input
                    type="text"
                    name="author"
                    value={bookData.author}
                    onChange={handleChange}
                    placeholder="Enter a Author"
                    className="w-full h-12 pl-2 pr-5 border-2 border-black outline-none"
                />
            </div>

            <div className="mb-4">
                <label className="font-medium text-lg text-gray-600 mb-2">
                    Category
                </label>

                <select
                    name="type"
                    value={bookData.type}
                    onChange={handleChange}
                    className="w-full h-12 px-2 border-2 border-black bg-white outline-none"
                    required
                >
                    <option value="">Select a category</option>
                    <option value="Science">Science</option>
                    <option value="fiction">Fiction</option>
                    <option value="non_fiction">Non-fiction</option>
                    <option value="fantacy">Fantasy</option>
                    <option value="crime">Crime</option>
                </select>
            </div>

            <div className="mb-4">
                <label className="font-medium text-lg text-gray-600 mb-2">
                    Description
                </label>

                <textarea
                    name="description"
                    value={bookData.description}
                    onChange={handleChange}
                    placeholder="Enter a description"
                    className="w-full h-12 pl-2 pr-5 border-2 border-black outline-none"
                    rows={5}
                />
            </div>

            <div className="mb-4 flex gap-4">
                <label className="font-medium text-lg text-gray-600 mb-2">
                    Upload a Image
                </label>

                <input
                    type="file"
                    name="image"
                    accept="image/*"
                    onChange={handleChange}
                    className="outline-none"
                />
            </div>
            {error && (
                <p className="font-medium text-red-500 text-base mb-4">
                    {error}
                </p>
            )}

            <button
                type="submit"
                className="px-6 py-2 bg-[#173f3a] text-white font-semibold hover:bg-[#245b53]"
            >
                Add book
            </button>
        </form>
    );
};

export default AddBooks;