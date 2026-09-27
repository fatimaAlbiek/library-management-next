import Link from "next/link";

type Book = {
  id: string | number;
  title: string;
  author: string;
  description: string;
  img: string;
  rating: number;
  isNew?: boolean;
};

type BookCardProps = {
  book: Book;
};

const BookCard = ({ book }: BookCardProps) => {
  return (
    <div className="p-2 border-2 border-gray-500 w-64 shadow-sm hover:scale-105 cursor-pointer h-fit">
      {book.isNew && (
        <p className="bg-black mb-1 text-white text-xs px-2 py-1 font-Poppins font-light w-fit">
          newly added
        </p>
      )}

      <img
        src={book.img}
        alt="book_image"
        className="w-full h-40"
      />

      <h3 className="font-semibold text-base font-Poppins mt-2">
        {book.title}
      </h3>

      <div className="flex gap-2 items-center mt-2 font-Poppins">
        <p className="bg-blue-50 border-2 border-blue-200 p-1 font-light text-Azure text-xs">
          Author
        </p>

        <p className="text-Gray-500 font-medium text-sm font-Poppins">
          {book.author}
        </p>
      </div>

      <p className="font-Poppins text-sm font-light mt-1">
        {book.description.length >= 40
          ? book.description.substring(0, 50) + "..."
          : book.description}
      </p>

      <p className="font-Poppins text-sm font-medium mt-1 text-orange-500">
        Ratings {book.rating}+
      </p>

      <Link href={`/book/${book.id}`}>
        <button className="font-Poppins px-2 py-1.5 bg-black text-white text-xs float-right">
          View details
        </button>
      </Link>
    </div >
  );
};

export default BookCard;