import { createSlice } from "@reduxjs/toolkit";

type Loan = {
    id: string | number;
    bookId?: string | number;
    bookTitle: string;
    borrower: string;
    borrowedDate: string;
    returnDate: string;
    status: "Returned" | "Not returned";
};

const initialState: Loan[] = [
    {
        id: 1,
        bookTitle: "A Brief History of Time",
        borrower: "user@library.com",
        borrowedDate: "2026-09-10",
        returnDate: "2026-09-24",
        status: "Returned",
    },
    {
        id: 2,
        bookTitle: "The Selfish Gene",
        borrower: "sara@library.com",
        borrowedDate: "2026-09-18",
        returnDate: "2026-10-02",
        status: "Not returned",
    },
    {
        id: 3,
        bookTitle: "Sapiens",
        borrower: "omar@library.com",
        borrowedDate: "2026-09-22",
        returnDate: "2026-10-06",
        status: "Not returned",
    },
];

const loanSlice = createSlice({
    name: "loan",
    initialState,
    reducers: {
        addLoan: (state, action) => {
            state.push(action.payload);
        },
    },
});

export const { addLoan } = loanSlice.actions;
export default loanSlice.reducer;
