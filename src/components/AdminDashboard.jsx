"use client";

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { deleteBook, updateBook } from '@/utils/bookSlice';
// إذا كان لديك أكشنز الحذف في السلايس الخاص بك يمكنك استيرادها هنا:
// import { deleteBook } from '../redux/bookSlice';

export default function AdminDashboard() {
  const router = useRouter();
  const dispatch = useDispatch();
  
  // جلب الكتب من Redux Store (تأكد من اسم السلايس لديك مثل state.books أو state.book)
  const books = useSelector((state) => state.book || []);
  const loans = useSelector((state) => state.loan || []);

  const [searchTerm, setSearchTerm] = useState('');
  const [activeSection, setActiveSection] = useState('dashboard');
  const [editingBook, setEditingBook] = useState(null);
  const [deletingBook, setDeletingBook] = useState(null);

  const startEditing = (book) => {
    setEditingBook({
      id: book.id,
      title: book.title || '',
      author: book.author || '',
      type: book.type || '',
      description: book.description || '',
    });
  };

  const saveEdit = (event) => {
    event.preventDefault();

    if (!editingBook.title || !editingBook.author || !editingBook.type) {
      return;
    }

    dispatch(updateBook(editingBook));
    setEditingBook(null);
  };

  // تصفية الكتب حسب البحث
  const filteredBooks = Array.isArray(books)
    ? books.filter(
        (book) =>
          book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.type?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleDelete = (book) => {
    setDeletingBook(book);
  };

  const confirmDelete = () => {
    dispatch(deleteBook(deletingBook.id));
    setDeletingBook(null);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuthenticated');
    router.replace('/login');
  };

  return (
    <div className="flex min-h-screen bg-slate-100 text-slate-800 font-sans dir-rtl">
      {/* 1. الشريط الجانبي - Sidebar */}
      <aside className="w-64 bg-slate-900 border-l border-slate-700 p-6 flex flex-col justify-between hidden md:flex">
        <div>
          <div className="flex items-center gap-3 mb-10">
            <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-xl font-bold shadow-lg shadow-amber-500/30">
              📚
            </div>
            <div>
              <h2 className="font-bold text-white text-base">إدارة المكتبة</h2>
              <span className="text-xs text-amber-400 font-medium">لوحة التحكم</span>
            </div>
          </div>

          <nav className="space-y-2">
            <button type="button" onClick={() => setActiveSection('dashboard')} className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition-all ${activeSection === 'dashboard' ? 'border border-amber-500/30 bg-amber-500/10 text-amber-400' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
              <span>📊</span> الإحصائيات العامة
            </button>
            <button type="button" onClick={() => setActiveSection('books')} className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition-all ${activeSection === 'books' ? 'border border-amber-500/30 bg-amber-500/10 text-amber-400' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
              <span>📖</span> Books
            </button>
            <button type="button" onClick={() => setActiveSection('loans')} className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left text-sm font-semibold transition-all ${activeSection === 'loans' ? 'border border-amber-500/30 bg-amber-500/10 text-amber-400' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}>
              <span>↔</span> Borrowed Books
            </button>
          </nav>
        </div>

        <div className="border-t border-slate-700 pt-4">
          <div className="space-y-3">
            <button onClick={handleLogout} className="flex items-center gap-2 text-xs text-rose-400 hover:text-rose-300 transition-colors">
              <span>↪</span> Logout
            </button>
            <a href="/" className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors">
              <span>⬅️</span> back to home
            </a>
          </div>
        </div>
      </aside>

      {/* 2. المحتوى الرئيسي - Main Content */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto">
        {editingBook && (
          <div className="fixed inset-0 z-20 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
            <form onSubmit={saveEdit} className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl md:p-7">
              <div className="mb-5 flex items-start justify-between border-b border-slate-100 pb-5">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Edit book</h2>
                  <p className="mt-1 text-sm text-slate-500">Update the book information.</p>
                </div>
                <button type="button" onClick={() => setEditingBook(null)} className="rounded-lg px-2 text-2xl leading-none text-slate-400 hover:bg-slate-100 hover:text-slate-700" aria-label="Close edit form">&times;</button>
              </div>

              <div className="mb-5 rounded-xl bg-slate-50 px-4 py-3">
                <p className="text-xs font-medium text-slate-500">Currently editing</p>
                <p className="mt-1 truncate font-semibold text-slate-900">{editingBook.title || 'Untitled book'}</p>
                <p className="mt-0.5 text-xs text-slate-500">{editingBook.author || 'Unknown author'} · {editingBook.type || 'Uncategorized'}</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <label className="text-sm font-semibold text-slate-700">
                  Title
                  <input value={editingBook.title} onChange={(event) => setEditingBook({ ...editingBook, title: event.target.value })} className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 font-normal outline-none transition focus:border-[#173f3a] focus:ring-2 focus:ring-[#173f3a]/10" required />
                </label>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="text-sm font-semibold text-slate-700">
                    Author
                    <input value={editingBook.author} onChange={(event) => setEditingBook({ ...editingBook, author: event.target.value })} className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 font-normal outline-none transition focus:border-[#173f3a] focus:ring-2 focus:ring-[#173f3a]/10" required />
                  </label>
                  <label className="text-sm font-semibold text-slate-700">
                    Category
                    <select value={editingBook.type} onChange={(event) => setEditingBook({ ...editingBook, type: event.target.value })} className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 font-normal outline-none transition focus:border-[#173f3a] focus:ring-2 focus:ring-[#173f3a]/10" required>
                      <option value="">Select a category</option>
                      <option value="Science">Science</option>
                      <option value="fiction">Fiction</option>
                      <option value="non_fiction">Non-fiction</option>
                      <option value="fantacy">Fantasy</option>
                      <option value="crime">Crime</option>
                    </select>
                  </label>
                </div>
                <label className="text-sm font-semibold text-slate-700">
                  Description
                  <textarea value={editingBook.description} onChange={(event) => setEditingBook({ ...editingBook, description: event.target.value })} className="mt-1.5 w-full rounded-lg border border-slate-300 px-3 py-2.5 font-normal outline-none transition focus:border-[#173f3a] focus:ring-2 focus:ring-[#173f3a]/10" rows={3} />
                </label>
              </div>

              <div className="mt-6 flex justify-end gap-3 border-t border-slate-100 pt-5">
                <button type="button" onClick={() => setEditingBook(null)} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</button>
                <button type="submit" className="rounded-lg bg-[#173f3a] px-4 py-2 text-sm font-semibold text-white hover:bg-[#245b53]">Save changes</button>
              </div>
            </form>
          </div>
        )}

        {deletingBook && (
          <div className="fixed inset-0 z-20 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
            <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-2xl md:p-7">
              <div className="mb-5 flex items-start justify-between border-b border-slate-100 pb-5">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Delete book</h2>
                  <p className="mt-1 text-sm text-slate-500">This action cannot be undone.</p>
                </div>
                <button type="button" onClick={() => setDeletingBook(null)} className="rounded-lg px-2 text-2xl leading-none text-slate-400 hover:bg-slate-100 hover:text-slate-700" aria-label="Close delete dialog">&times;</button>
              </div>

              <div className="rounded-xl bg-slate-50 px-4 py-3">
                <p className="text-xs font-medium text-slate-500">You are about to delete</p>
                <p className="mt-1 truncate font-semibold text-slate-900">{deletingBook.title || 'Untitled book'}</p>
                <p className="mt-0.5 text-xs text-slate-500">{deletingBook.author || 'Unknown author'} · {deletingBook.type || 'Uncategorized'}</p>
              </div>

              <div className="mt-6 flex justify-end gap-3 border-t border-slate-100 pt-5">
                <button type="button" onClick={() => setDeletingBook(null)} className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">Cancel</button>
                <button type="button" onClick={confirmDelete} className="rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white hover:bg-rose-700">Delete book</button>
              </div>
            </div>
          </div>
        )}

        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-1">Dashboard</h1>
            <p className="text-xs text-slate-500">متابعة شاملة لإحصائيات المكتبة وإدارة الكتالوج</p>
          </div>
          <button onClick={handleLogout} className="inline-flex items-center justify-center gap-2 border border-amber-500/50 px-4 py-2.5 text-xs font-bold text-amber-600 transition-colors hover:bg-amber-500/10">
            <span>↪</span> Logout
          </button>
        </header>

        {/* 3. بطاقات الإحصائيات - Stats Cards */}
        {activeSection === 'dashboard' && (
        <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
            <span className="text-xs text-slate-500 block mb-1">Total books</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-slate-900">{books.length}</span>
              <span className="text-xs text-slate-500 font-medium"> Fully available </span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
            <span className="text-xs text-slate-500 block mb-1">Categories</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-amber-600">
                {new Set(books.map((b) => b.type)).size}
              </span>
              <span className="text-xs text-slate-500">Science and Literature </span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
            <span className="text-xs text-slate-500 block mb-1">Borrowed books</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-amber-600">12</span>
              <span className="text-xs text-amber-600">Currently reading </span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 p-5 rounded-2xl shadow-sm">
            <span className="text-xs text-slate-500 block mb-1"> Active User</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-slate-900">48</span>
              <span className="text-xs text-slate-500">Registered Reader </span>
            </div>
          </div>
        </section>
        )}

        {/* 4. شريط البحث والتصفية - Filter Bar */}
        {activeSection === 'books' && (
        <section>
          <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Books</h2>
              <p className="mt-1 text-sm text-slate-500">Manage the library catalogue.</p>
            </div>
            <a href="/addbooks" className="inline-flex items-center justify-center gap-2 bg-slate-900 px-5 py-2.5 text-xs font-bold text-white transition-colors hover:bg-slate-700">
              <span>+</span> Add New Book
            </a>
          </div>
        <div className="bg-white border border-[#e8d7b6] p-4 rounded-2xl mb-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="relative w-full md:w-96">
            <input
              type="text"
              placeholder=" search by book title, author, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#fff9ed] border border-[#e8d7b6] rounded-xl px-4 py-2.5 text-xs text-[#173f3a] focus:outline-none focus:border-[#173f3a] transition-colors"
            />
          </div>
          <span className="text-xs text-[#52736b]">
            عرض <strong className="text-[#173f3a]">{filteredBooks.length}</strong> من أصل <strong className="text-[#173f3a]">{books.length}</strong> كتاب
          </span>
        </div>

        {/* 5. جدول إدارة الكتب - Books Table */}
        <div className="bg-white border border-[#e8d7b6] rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs text-[#52736b]">
              <thead className="bg-[#fff9ed] text-[#173f3a] font-semibold border-b border-[#e8d7b6]">
                <tr>
                  <th className="p-4">#</th>
                  <th className="p-4">عنوان الكتاب</th>
                  <th className="p-4">المؤلف</th>
                  <th className="p-4">التصنيف</th>
                  <th className="p-4 text-center">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e8d7b6]">
                {filteredBooks.length > 0 ? (
                  filteredBooks.map((book, index) => (
                    <tr key={book.id || index} className="hover:bg-[#fff9ed] transition-colors">
                      <td className="p-4 font-mono text-[#b27c2b]">{index + 1}</td>
                      <td className="p-4 font-bold text-[#173f3a]">{book.title || 'بدون عنوان'}</td>
                      <td className="p-4 text-[#52736b]">{book.author || 'غير معروف'}</td>
                      <td className="p-4">
                        <span className="inline-block bg-[#d6a85d]/15 text-[#b27c2b] border border-[#d6a85d]/40 px-2.5 py-1 rounded-lg text-[11px] font-medium">
                          {book.type || 'عام'}
                        </span>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => startEditing(book)}
                            className="rounded-lg bg-[#173f3a] px-3 py-2 text-[11px] font-semibold text-white shadow-sm transition-colors hover:bg-[#245b53]"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(book)}
                            aria-label={`Delete ${book.title || 'book'}`}
                            title="Delete book"
                            className="group inline-flex h-8 w-8 items-center justify-center rounded-lg border border-rose-200 bg-rose-50 text-rose-600 transition-all hover:border-rose-300 hover:bg-rose-600 hover:text-white"
                          >
                            <span className="relative block h-3.5 w-3.5 rounded-b-[3px] border-2 border-current border-t-0 after:absolute after:-top-1.5 after:left-[-3px] after:h-0.5 after:w-[15px] after:rounded-full after:bg-current" aria-hidden="true">
                              <span className="absolute -top-2 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-current" />
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center p-8 text-[#52736b]">
                      لا توجد كتب مطابقة للبحث حالياً.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        </section>
        )}

        {activeSection === 'loans' && (
        <section>
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-900">Borrowed Books</h2>
            <p className="mt-1 text-sm text-slate-500">Track borrowed books and return status.</p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="bg-slate-900 text-xs uppercase tracking-wide text-white">
                  <tr>
                    <th className="px-5 py-4">Book</th>
                    <th className="px-5 py-4">Borrower</th>
                    <th className="px-5 py-4">Borrowed date</th>
                    <th className="px-5 py-4">Return date</th>
                    <th className="px-5 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {loans.map((loan, index) => (
                    <tr key={loan.id || index} className="transition-colors hover:bg-slate-50">
                      <td className="px-5 py-4 font-semibold text-slate-900">{loan.bookTitle}</td>
                      <td className="px-5 py-4 text-slate-600">{loan.borrower}</td>
                      <td className="px-5 py-4 text-slate-600">{loan.borrowedDate}</td>
                      <td className="px-5 py-4 text-slate-600">{loan.returnDate}</td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${loan.status === 'Returned' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                          {loan.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                  {loans.length === 0 && (
                    <tr>
                      <td colSpan="5" className="px-5 py-10 text-center text-slate-500">No borrowed books yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>
        )}
      </main>
    </div>
  );
}