"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { deleteBook, updateBook } from "@/utils/bookSlice";
import {
  addCategory,
  deleteCategory,
} from "@/utils/categorySlice";

export default function AdminDashboard() {
  const router = useRouter();
  const dispatch = useDispatch();

  // Redux Store
  const books = useSelector((state) => state.book);
  const loans = useSelector((state) => state.loan);
  const categories = useSelector((state) => state.category);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeSection, setActiveSection] = useState("dashboard");

  const [editingBook, setEditingBook] = useState(null);
  const [deletingBook, setDeletingBook] = useState(null);

  const [newCategory, setNewCategory] = useState("");

  // -------------------------
  // Edit Book
  // -------------------------
  const startEditing = (book) => {
    setEditingBook({
      id: book.id,
      title: book.title || "",
      author: book.author || "",
      type: book.type || "",
      description: book.description || "",
    });
  };

  const saveEdit = (event) => {
    event.preventDefault();

    if (
      !editingBook.title ||
      !editingBook.author ||
      !editingBook.type
    ) {
      return;
    }

    dispatch(updateBook(editingBook));
    setEditingBook(null);
  };

  // -------------------------
  // Search Books
  // -------------------------
  const filteredBooks = Array.isArray(books)
    ? books.filter((book) => {
      const search = searchTerm.toLowerCase();

      return (
        book.title?.toLowerCase().includes(search) ||
        book.author?.toLowerCase().includes(search) ||
        book.type?.toLowerCase().includes(search)
      );
    })
    : [];

  // -------------------------
  // Delete Book
  // -------------------------
  const handleDelete = (book) => {
    setDeletingBook(book);
  };

  const confirmDelete = () => {
    if (!deletingBook) return;

    dispatch(deleteBook(deletingBook.id));
    setDeletingBook(null);
  };

  // -------------------------
  // Logout
  // -------------------------
  const handleLogout = () => {
    sessionStorage.removeItem("adminAuthenticated");
    router.replace("/login");
  };

  // -------------------------
  // Add Category
  // -------------------------
  const handleAddCategory = (event) => {
    event.preventDefault();

    if (!newCategory.trim()) return;

    dispatch(addCategory(newCategory));
    setNewCategory("");
  };

  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800 font-sans">
      {/* =========================
                Sidebar
            ========================== */}
      <aside className="hidden md:flex w-64 bg-black border-r border-gray-800 p-6 flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-white text-black flex items-center justify-center text-xl font-bold">
              📚
            </div>

            <div>
              <h2 className="font-bold text-white text-base">
                إدارة المكتبة
              </h2>

              <span className="text-xs text-gray-300 font-medium">
                لوحة التحكم
              </span>
            </div>
          </div>

          <nav className="space-y-2">
            <button
              type="button"
              onClick={() =>
                setActiveSection("dashboard")
              }
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition-all ${activeSection === "dashboard"
                  ? "border border-white bg-white text-black"
                  : "text-gray-400 hover:bg-gray-900 hover:text-white"
                }`}
            >
              <span>📊</span>
              الإحصائيات العامة
            </button>

            <button
              type="button"
              onClick={() =>
                setActiveSection("books")
              }
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition-all ${activeSection === "books"
                  ? "border border-white bg-white text-black"
                  : "text-gray-400 hover:bg-gray-900 hover:text-white"
                }`}
            >
              <span>📖</span>
              Books
            </button>

            <button
              type="button"
              onClick={() =>
                setActiveSection("loans")
              }
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition-all ${activeSection === "loans"
                  ? "border border-white bg-white text-black"
                  : "text-gray-400 hover:bg-gray-900 hover:text-white"
                }`}
            >
              <span>↔️</span>
              Borrowed Books
            </button>

            <button
              type="button"
              onClick={() =>
                setActiveSection("categories")
              }
              className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition-all ${activeSection === "categories"
                  ? "border border-white bg-white text-black"
                  : "text-gray-400 hover:bg-gray-900 hover:text-white"
                }`}
            >
              <span>#</span>
              Categories
            </button>
          </nav>
        </div>

        <div className="border-t border-gray-800 pt-4">
          <div className="space-y-3">
            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-2 text-xs text-gray-300 hover:text-white transition-colors"
            >
              <span>↪️</span>
              Logout
            </button>

            <a
              href="/"
              className="flex items-center gap-2 text-xs text-gray-400 hover:text-white transition-colors"
            >
              <span>⬅️</span>
              Back to home
            </a>
          </div>
        </div>
      </aside>

      {/* =========================
                Main Content
            ========================== */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {/* =========================
                    Edit Modal
                ========================== */}
        {editingBook && (
          <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <form
              onSubmit={saveEdit}
              className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl md:p-7"
            >
              <div className="mb-5 flex items-start justify-between border-b border-gray-100 pb-5">
                <div>
                  <h2 className="text-xl font-bold text-black">
                    Edit book
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Update the book information.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setEditingBook(null)
                  }
                  className="rounded-lg px-2 text-2xl leading-none text-gray-400 hover:bg-gray-100 hover:text-black"
                  aria-label="Close edit form"
                >
                  &times;
                </button>
              </div>

              <div className="mb-5 rounded-xl bg-gray-50 px-4 py-3">
                <p className="text-xs font-medium text-gray-500">
                  Currently editing
                </p>

                <p className="mt-1 truncate font-semibold text-black">
                  {editingBook.title ||
                    "Untitled book"}
                </p>

                <p className="mt-0.5 text-xs text-gray-500">
                  {editingBook.author ||
                    "Unknown author"}{" "}
                  ·{" "}
                  {editingBook.type ||
                    "Uncategorized"}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <label className="text-sm font-semibold text-gray-700">
                  Title

                  <input
                    value={editingBook.title}
                    onChange={(event) =>
                      setEditingBook({
                        ...editingBook,
                        title: event.target.value,
                      })
                    }
                    className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 font-normal outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                    required
                  />
                </label>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="text-sm font-semibold text-gray-700">
                    Author

                    <input
                      value={
                        editingBook.author
                      }
                      onChange={(event) =>
                        setEditingBook({
                          ...editingBook,
                          author: event.target.value,
                        })
                      }
                      className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 font-normal outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                      required
                    />
                  </label>

                  <label className="text-sm font-semibold text-gray-700">
                    Category

                    <select
                      value={
                        editingBook.type
                      }
                      onChange={(event) =>
                        setEditingBook({
                          ...editingBook,
                          type: event.target.value,
                        })
                      }
                      className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 font-normal outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                      required
                    >
                      <option value="">
                        Select a category
                      </option>

                      {categories.map(
                        (category) => (
                          <option
                            key={category}
                            value={category}
                          >
                            {category}
                          </option>
                        )
                      )}
                    </select>
                  </label>
                </div>

                <label className="text-sm font-semibold text-gray-700">
                  Description

                  <textarea
                    value={
                      editingBook.description
                    }
                    onChange={(event) =>
                      setEditingBook({
                        ...editingBook,
                        description:
                          event.target
                            .value,
                      })
                    }
                    className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 font-normal outline-none transition focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10"
                    rows={3}
                  />
                </label>
              </div>

              <div className="mt-6 flex justify-end gap-3 border-t border-gray-100 pt-5">
                <button
                  type="button"
                  onClick={() =>
                    setEditingBook(null)
                  }
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-black"
                >
                  Save changes
                </button>
              </div>
            </form>
          </div>
        )}

        {/* =========================
                    Delete Modal
                ========================== */}
        {deletingBook && (
          <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
            <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl md:p-7">
              <div className="mb-5 flex items-start justify-between border-b border-gray-100 pb-5">
                <div>
                  <h2 className="text-xl font-bold text-black">
                    Delete book
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    This action cannot be undone.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setDeletingBook(null)
                  }
                  className="rounded-lg px-2 text-2xl leading-none text-gray-400 hover:bg-gray-100 hover:text-black"
                  aria-label="Close delete dialog"
                >
                  &times;
                </button>
              </div>

              <div className="rounded-xl bg-gray-50 px-4 py-3">
                <p className="text-xs font-medium text-gray-500">
                  You are about to delete
                </p>

                <p className="mt-1 truncate font-semibold text-black">
                  {deletingBook.title ||
                    "Untitled book"}
                </p>

                <p className="mt-0.5 text-xs text-gray-500">
                  {deletingBook.author ||
                    "Unknown author"}{" "}
                  ·{" "}
                  {deletingBook.type ||
                    "Uncategorized"}
                </p>
              </div>

              <div className="mt-6 flex justify-end gap-3 border-t border-gray-100 pt-5">
                <button
                  type="button"
                  onClick={() =>
                    setDeletingBook(null)
                  }
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={confirmDelete}
                  className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-black"
                >
                  Delete book
                </button>
              </div>
            </div>
          </div>
        )}

        {/* =========================
                    Header
                ========================== */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-1">
              Dashboard
            </h1>

            <p className="text-xs text-slate-500">
              متابعة شاملة لإحصائيات المكتبة وإدارة
              الكتالوج
            </p>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            className="inline-flex items-center justify-center gap-2 border border-slate-300 px-4 py-2.5 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-900 hover:text-white"
          >
            <span>↪️</span>
            Logout
          </button>
        </header>

        {/* =========================
                    Dashboard
                ========================== */}
        {activeSection === "dashboard" && (
          <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
              <span className="text-xs text-slate-500 block mb-1">
                Total books
              </span>

              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-slate-900">
                  {books.length}
                </span>

                <span className="text-xs text-slate-500 font-medium">
                  Fully available
                </span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
              <span className="text-xs text-slate-500 block mb-1">
                Categories
              </span>

              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-slate-900">
                  {categories.length}
                </span>

                <span className="text-xs text-slate-500">
                  Total categories
                </span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
              <span className="text-xs text-slate-500 block mb-1">
                Borrowed books
              </span>

              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-slate-900">
                  {loans.length}
                </span>

                <span className="text-xs text-slate-500">
                  Current loans
                </span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
              <span className="text-xs text-slate-500 block mb-1">
                Active User
              </span>

              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-black text-slate-900">
                  48
                </span>

                <span className="text-xs text-slate-500">
                  Registered Reader
                </span>
              </div>
            </div>
          </section>
        )}

        {/* =========================
                    Books
                ========================== */}
        {activeSection === "books" && (
          <section>
            <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Books
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Manage the library catalogue.
                </p>
              </div>

              <a
                href="/addbooks"
                className="inline-flex items-center justify-center gap-2 bg-slate-900 px-5 py-2.5 text-xs font-bold text-white transition-colors hover:bg-slate-700"
              >
                <span>+</span>
                Add New Book
              </a>
            </div>

            {/* Search */}
            <div className="bg-white border border-slate-200 p-4 rounded-2xl mb-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
              <div className="relative w-full md:w-96">
                <input
                  type="text"
                  placeholder="Search by book title, author, or category..."
                  value={searchTerm}
                  onChange={(event) =>
                    setSearchTerm(
                      event.target.value
                    )
                  }
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-slate-900 transition-colors"
                />
              </div>

              <span className="text-xs text-slate-500">
                عرض{" "}
                <strong className="text-slate-900">
                  {filteredBooks.length}
                </strong>{" "}
                من أصل{" "}
                <strong className="text-slate-900">
                  {books.length}
                </strong>{" "}
                كتاب
              </span>
            </div>

            {/* Books Table */}
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs text-slate-500">
                  <thead className="bg-slate-100 text-slate-900 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="p-4">
                        #
                      </th>
                      <th className="p-4">
                        عنوان الكتاب
                      </th>
                      <th className="p-4">
                        المؤلف
                      </th>
                      <th className="p-4">
                        التصنيف
                      </th>
                      <th className="p-4 text-center">
                        الإجراءات
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-200">
                    {filteredBooks.length >
                      0 ? (
                      filteredBooks.map(
                        (
                          book,
                          index
                        ) => (
                          <tr
                            key={
                              book.id ||
                              index
                            }
                            className="hover:bg-slate-50 transition-colors"
                          >
                            <td className="p-4 font-mono text-slate-500">
                              {index +
                                1}
                            </td>

                            <td className="p-4 font-bold text-slate-900">
                              {book.title ||
                                "بدون عنوان"}
                            </td>

                            <td className="p-4 text-slate-500">
                              {book.author ||
                                "غير معروف"}
                            </td>

                            <td className="p-4">
                              <span className="inline-block bg-slate-100 text-slate-700 border border-slate-300 px-2.5 py-1 rounded-lg text-[11px] font-medium">
                                {book.type ||
                                  "عام"}
                              </span>
                            </td>

                            <td className="p-4">
                              <div className="flex items-center justify-center gap-2">
                                <button
                                  type="button"
                                  onClick={() =>
                                    startEditing(
                                      book
                                    )
                                  }
                                  className="rounded-lg bg-slate-900 px-3 py-2 text-[11px] font-semibold text-white shadow-sm transition-colors hover:bg-black"
                                >
                                  Edit
                                </button>

                                <button
                                  type="button"
                                  onClick={() =>
                                    handleDelete(
                                      book
                                    )
                                  }
                                  aria-label={`Delete ${book.title ||
                                    "book"
                                    }`}
                                  title="Delete book"
                                  className="group inline-flex h-8 w-8 items-center justify-center rounded-lg border border-slate-300 bg-slate-100 text-slate-700 transition-all hover:border-slate-900 hover:bg-slate-900 hover:text-white"
                                >
                                  🗑️
                                </button>
                              </div>
                            </td>
                          </tr>
                        )
                      )
                    ) : (
                      <tr>
                        <td
                          colSpan={5}
                          className="text-center p-8 text-slate-500"
                        >
                          لا توجد كتب
                          مطابقة للبحث
                          حالياً.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* =========================
                    Borrowed Books
                ========================== */}
        {activeSection === "loans" && (
          <section>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-slate-900">
                Borrowed Books
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Track borrowed books and return
                status.
              </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] text-left text-sm">
                  <thead className="bg-slate-900 text-xs uppercase tracking-wide text-white">
                    <tr>
                      <th className="px-5 py-4">
                        Book
                      </th>

                      <th className="px-5 py-4">
                        Borrower
                      </th>

                      <th className="px-5 py-4">
                        Borrowed date
                      </th>

                      <th className="px-5 py-4">
                        Return date
                      </th>

                      <th className="px-5 py-4">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100">
                    {loans.map(
                      (loan, index) => (
                        <tr
                          key={
                            loan.id ||
                            index
                          }
                          className="transition-colors hover:bg-slate-50"
                        >
                          <td className="px-5 py-4 font-semibold text-slate-900">
                            {
                              loan.bookTitle
                            }
                          </td>

                          <td className="px-5 py-4 text-slate-600">
                            {
                              loan.borrower
                            }
                          </td>

                          <td className="px-5 py-4 text-slate-600">
                            {
                              loan.borrowedDate
                            }
                          </td>

                          <td className="px-5 py-4 text-slate-600">
                            {
                              loan.returnDate
                            }
                          </td>

                          <td className="px-5 py-4">
                            <span
                              className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${loan.status ===
                                  "Returned"
                                  ? "bg-slate-900 text-white"
                                  : "bg-slate-200 text-slate-700"
                                }`}
                            >
                              {
                                loan.status
                              }
                            </span>
                          </td>
                        </tr>
                      )
                    )}

                    {loans.length === 0 && (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-5 py-10 text-center text-slate-500"
                        >
                          No borrowed
                          books yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* =========================
                    Categories
                ========================== */}
        {activeSection === "categories" && (
          <section>
            <div className="mb-6">
              <h2 className="text-xl font-bold text-black">
                Categories
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Add and manage book categories.
              </p>
            </div>

            <form
              onSubmit={handleAddCategory}
              className="mb-6 flex max-w-xl gap-3 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <input
                value={newCategory}
                onChange={(event) =>
                  setNewCategory(
                    event.target.value
                  )
                }
                placeholder="Category name"
                className="min-w-0 flex-1 rounded-lg border border-gray-300 px-3 py-2.5 text-sm outline-none focus:border-black"
                required
              />

              <button
                type="submit"
                className="rounded-lg bg-black px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-800"
              >
                Add category
              </button>
            </form>

            <div className="max-w-xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
              <div className="divide-y divide-gray-200">
                {categories.map(
                  (category) => (
                    <div
                      key={category}
                      className="flex items-center justify-between px-5 py-4"
                    >
                      <span className="font-medium text-black">
                        {category}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          dispatch(
                            deleteCategory(
                              category
                            )
                          )
                        }
                        className="rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-black hover:text-white"
                      >
                        Delete
                      </button>
                    </div>
                  )
                )}
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}


