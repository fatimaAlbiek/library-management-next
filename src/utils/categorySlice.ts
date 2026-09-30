import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: string[] = [
    "Science",
    "Fiction",
    "Non-fiction",
    "Fantasy",
    "Crime",
];

const categorySlice = createSlice({
    name: "category",
    initialState,
    reducers: {
        setCategories: (
            _state,
            action: PayloadAction<string[]>
        ) => {
            return action.payload;
        },

        addCategory: (
            state,
            action: PayloadAction<string>
        ) => {
            const category = action.payload.trim();

            if (
                category &&
                !state.some(
                    (item) =>
                        item.toLowerCase() ===
                        category.toLowerCase()
                )
            ) {
                state.push(category);
            }
        },

        deleteCategory: (
            state,
            action: PayloadAction<string>
        ) => {
            return state.filter(
                (category) => category !== action.payload
            );
        },
    },
});

export const {
    setCategories,
    addCategory,
    deleteCategory,
} = categorySlice.actions;

export default categorySlice.reducer;

