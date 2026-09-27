import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// إذا كان لديك أكشنز الحذف في السلايس الخاص بك يمكنك استيرادها هنا:
// import { deleteBook } from '../redux/bookSlice';

export default function AdminDashboard() {
  const navigate = useNavigate();
  
  // جلب الكتب من Redux Store (تأكد من اسم السلايس لديك مثل state.books أو state.book)
  const books = useSelector((state) => state.books?.books || state.books || []);

  const [searchTerm, setSearchTerm] = useState('');

  // تصفية الكتب حسب البحث
  const filteredBooks = Array.isArray(books)
    ? books.filter(
        (book) =>
          book.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.type?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleDelete = (id) => {
    if (window.confirm('هل أنت تأكد من رغبتك في حذف هذا الكتاب؟')) {
      // dispatch(deleteBook(id));
      console.log('حذف الكتاب رقم:', id);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuthenticated');
    navigate('/admin/login', { replace: true });
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
            <a href="#dashboard" className="flex items-center gap-3 px-4 py-3 bg-amber-500/10 text-amber-400 rounded-xl font-semibold border border-amber-500/30 text-sm">
              <span>📊</span> الإحصائيات العامة
            </a>
            <a href="#books" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl font-medium transition-all text-sm">
              <span>📖</span> قائمة الكتب
            </a>
            <a href="/addbooks" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-xl font-medium transition-all text-sm">
              <span>➕</span> إضافة كتاب جديد
            </a>
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
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-1">Dashboard</h1>
            <p className="text-xs text-slate-500">متابعة شاملة لإحصائيات المكتبة وإدارة الكتالوج</p>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/addbooks"
              className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all shadow-lg shadow-slate-900/20"
            >
              <span>➕</span> Add New Book
            </a>
            <button onClick={handleLogout} className="inline-flex items-center justify-center gap-2 border border-amber-500/50 px-4 py-2.5 rounded-xl text-xs font-bold text-amber-600 transition-colors hover:bg-amber-500/10">
              <span>↪</span> خروج
            </button>
          </div>
        </header>

        {/* 3. بطاقات الإحصائيات - Stats Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
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

        {/* 4. شريط البحث والتصفية - Filter Bar */}
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
                            onClick={() => alert(`تعديل الكتاب: ${book.title}`)}
                            className="bg-[#173f3a] hover:bg-[#245b53] text-white px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-colors"
                          >
                            تعديل
                          </button>
                          <button
                            onClick={() => handleDelete(book.id)}
                            className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-colors"
                          >
                            حذف
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
      </main>
    </div>
  );
}