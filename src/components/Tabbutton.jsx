import Link from "next/link";

const Tabbutton = ({ children, to }) => {
    return (
        <Link href={to}>
            <button className="bg-black text-white hover:bg-indigo-500 font-normal text-base font-Poppins px-6 py-2 rounded-full">
                {children}
            </button>
        </Link>
    );
};

export default Tabbutton;