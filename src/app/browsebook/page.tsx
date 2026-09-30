"use client";

import { useState } from "react";
import Categories from "@/components/Categories";
import Booksdata from "@/components/Booksdata";
import Searchfield from "@/components/Searchfield";

export default function BrowseBook() {
    const [inputValue, setInputValue] = useState("");

    const handleSearchTxt = (value: string) => {
        setInputValue(value);
    };

    return (
        <div className="p-2">
            <section>
                <Categories />

                <Searchfield handleText={handleSearchTxt} />

                <Booksdata
                    title="All Books"
                    inputValue={inputValue}
                />
            </section>
        </div>
    );
}