import {createSlice} from '@reduxjs/toolkit';
import {bookData} from './mockData'

const bookSlice = createSlice({
    name:'book',
    initialState:bookData,
    reducers:{
        addBook:(state,action) =>{
            state.push(action.payload);
        },
        updateBook:(state, action) => {
            const index = state.findIndex((book) => book.id === action.payload.id);

            if (index !== -1) {
                state[index] = {
                    ...state[index],
                    ...action.payload,
                };
            }
        },
        deleteBook:(state, action) => {
            return state.filter((book) => book.id !== action.payload);
        }
    }
})

export const {addBook, updateBook, deleteBook} = bookSlice.actions;
export default bookSlice.reducer;