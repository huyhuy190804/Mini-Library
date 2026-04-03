import React from 'react';
import { Library, User, Repeat, BookOpen } from 'lucide-react';

const formatDate = (dateStr) => {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
};

const timeAgo = (dateStr) => {
  if (!dateStr) return '—';
  const diff = Math.floor((Date.now() - new Date(dateStr)) / 1000);
  if (diff < 60) return 'Just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

const getInitials = (name) => {
  if (!name) return '?';
  const parts = name.trim().split(' ');
  if (parts.length >= 2) return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  return name.substring(0, 2).toUpperCase();
};

const StatsData = ({
  overview = { totalBooks: 0, totalAuthors: 0, totalBorrowings: 0, currentlyBorrowed: 0 },
  topBooks = [],
  borrowStatus = { returned: 0, borrowed: 0 },
  recentBorrowings = [],
  books = [],
}) => {
  const getBookTitle = (bookId) => {
    if (!bookId) return 'Unknown';
    const found = books.find(b => b._id === (bookId._id || bookId));
    return found ? found.title : (bookId.title || 'Unknown');
  };

  const total = borrowStatus.returned + borrowStatus.borrowed;
  const returnRate = total > 0 ? Math.round((borrowStatus.returned / total) * 100) : 0;
  const maxCheckouts = topBooks.length > 0 ? Math.max(...topBooks.map(b => b.count ?? 0)) : 1;

  return (
    <div className="p-8 md:p-10 bg-[#f8fafc] min-h-[calc(100vh-80px)] font-sans pb-16">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-black text-[#0f172a] tracking-tight mb-3">Curatorial Insights</h1>
        <p className="text-slate-600 text-sm">Real-time circulation and collection metrics for the digital archive.</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-3xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] border border-gray-100/60">
          <div className="flex justify-between items-start mb-6">
            <div className="bg-[#f0f5ff] text-[#0055ff] p-3 rounded-xl"><Library size={22} strokeWidth={2.5} /></div>
            <span className="bg-[#f0f4f8] text-slate-500 text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-widest">Global</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-1">{overview.totalBooks.toLocaleString()}</h2>
          <p className="text-sm text-slate-500 font-medium">Total Books</p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] border border-gray-100/60">
          <div className="flex justify-between items-start mb-6">
            <div className="bg-[#0055ff] text-white p-3 rounded-xl"><User size={22} strokeWidth={2.5} /></div>
            <span className="bg-[#f0f4f8] text-slate-500 text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-widest">Active</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-1">{overview.totalAuthors.toLocaleString()}</h2>
          <p className="text-sm text-slate-500 font-medium">Total Authors</p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] border border-gray-100/60">
          <div className="flex justify-between items-start mb-6">
            <div className="bg-[#f0f5ff] text-[#0055ff] p-3 rounded-xl"><Repeat size={22} strokeWidth={2.5} /></div>
            <span className="bg-[#f0f4f8] text-slate-500 text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-widest">History</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-1">{overview.totalBorrowings.toLocaleString()}</h2>
          <p className="text-sm text-slate-500 font-medium">Total Borrowings</p>
        </div>

        <div className="bg-white p-6 rounded-3xl shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] border border-gray-100/60">
          <div className="flex justify-between items-start mb-6">
            <div className="bg-[#f0f5ff] text-[#0055ff] p-3 rounded-xl"><BookOpen size={22} strokeWidth={2.5} /></div>
            <span className="bg-orange-100/80 text-[#d95d16] text-[10px] font-extrabold px-2.5 py-1 rounded-md uppercase tracking-widest">In Use</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-1">{overview.currentlyBorrowed.toLocaleString()}</h2>
          <p className="text-sm text-slate-500 font-medium">Currently Borrowed</p>
        </div>
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        {/* Top Borrowed Books */}
        <div className="col-span-1 lg:col-span-2 bg-white rounded-3xl p-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] border border-gray-100/60">
          <div className="mb-8">
            <h3 className="text-[22px] font-bold text-slate-900 mb-1">Top Borrowed Books</h3>
            <p className="text-sm text-slate-500">Highest circulation volume this quarter</p>
          </div>
          {topBooks.length === 0 ? (
            <p className="text-slate-400 text-sm italic">No data available yet.</p>
          ) : (
            <div className="flex flex-col gap-6">
              {topBooks.map((book, index) => {
                const count = book.count ?? 0;
                return (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2.5">
                      <span className="text-[15px] font-bold text-slate-800 truncate pr-4">{book.title}</span>
                      <span className="text-[13px] text-slate-500 font-medium flex-shrink-0">{count} Checkouts</span>
                    </div>
                    <div className="w-full h-3 bg-[#f0f4f8] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#0055ff] rounded-full transition-all duration-700"
                        style={{ width: `${maxCheckouts > 0 ? (count / maxCheckouts) * 100 : 0}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Circulation Flow */}
        <div className="col-span-1 bg-white rounded-3xl p-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] border border-gray-100/60 flex flex-col">
          <div className="mb-4">
            <h3 className="text-[20px] font-bold text-slate-900 mb-1">Circulation Flow</h3>
            <p className="text-sm text-slate-500">Borrowed vs Returned</p>
          </div>
          <div className="flex-1 flex flex-col justify-center items-center mt-4">
            <div className="relative w-48 h-48 mb-6">
              <svg width="100%" height="100%" viewBox="0 0 42 42" className="-rotate-90">
                <circle cx="21" cy="21" r="15.91549430" fill="transparent" className="stroke-[#f0f4f8]" strokeWidth="4"></circle>
                <circle cx="21" cy="21" r="15.91549430" fill="transparent"
                  className="stroke-[#2563eb]" strokeWidth="4"
                  strokeDasharray={`${returnRate} ${100 - returnRate}`}
                  strokeDashoffset="0">
                </circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-black text-slate-900 -mt-2">{returnRate}%</span>
                <span className="text-[9px] font-bold text-slate-500 tracking-widest uppercase mt-1">Return Rate</span>
              </div>
            </div>
            <div className="w-full space-y-3 mt-4">
              <div className="bg-[#f8fafc] rounded-xl p-3 px-4 flex justify-between items-center font-bold text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#2563eb]"></div>
                  <span className="text-slate-800">Returned</span>
                </div>
                <span className="text-slate-900">{borrowStatus.returned.toLocaleString()}</span>
              </div>
              <div className="bg-[#f8fafc] rounded-xl p-3 px-4 flex justify-between items-center font-bold text-sm">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#cbd5e1]"></div>
                  <span className="text-slate-800">Out-on-loan</span>
                </div>
                <span className="text-slate-900">{borrowStatus.borrowed.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Borrowings */}
      <div>
        <div className="mb-6">
          <p className="text-[#0055ff] text-[10px] font-extrabold tracking-widest uppercase mb-2">Activity Log</p>
          <h2 className="text-2xl font-black text-slate-900">Recent Borrowings</h2>
        </div>
        <div className="flex flex-col gap-4">
          {recentBorrowings.map((log, index) => (
            <div key={log._id || index}
              className="bg-white p-5 px-6 rounded-[24px] shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] border border-gray-100/60 flex items-center justify-between hover:shadow-[0_4px_15px_-4px_rgba(0,0,0,0.06)] transition-shadow">
              <div className="flex items-center gap-5 min-w-0" style={{ flex: '1.5' }}>
                <div className="w-12 h-12 rounded-full bg-[#f0f5ff] text-[#0055ff] font-extrabold text-sm flex items-center justify-center flex-shrink-0">
                  {getInitials(log.borrowerName)}
                </div>
                <div className="min-w-0 pr-4">
                  <div className="font-bold text-[15px] text-slate-900 truncate">{log.borrowerName}</div>
                  <div className="text-[11px] text-slate-500 font-medium">{formatDate(log.borrowDate)}</div>
                </div>
              </div>
              <div className="min-w-0 pr-4" style={{ flex: '2' }}>
                <div className="font-bold text-[15px] text-slate-900 truncate">{getBookTitle(log.bookId)}</div>
                <div className="text-[12px] text-slate-500 font-medium">
                  {log.returnDate ? `Due: ${formatDate(log.returnDate)}` : 'No due date set'}
                </div>
              </div>
              <div className="text-right min-w-0 pr-6" style={{ flex: '1' }}>
                <div className="font-bold text-[14px] text-slate-900">{timeAgo(log.createdAt)}</div>
              </div>
              <div className="flex-shrink-0 text-right" style={{ flex: '0.5' }}>
                {log.status === 'BORROWED'
                  ? <span className="px-3 py-1.5 rounded-full text-[9px] font-extrabold uppercase tracking-widest bg-[#eaf2ff] text-[#0055ff]">Borrowed</span>
                  : <span className="px-3 py-1.5 rounded-full text-[9px] font-extrabold uppercase tracking-widest bg-[#dcfce7] text-[#15803d]">Returned</span>}
              </div>
            </div>
          ))}
          {recentBorrowings.length === 0 && (
            <div className="text-center py-10 text-slate-400 text-sm font-medium">No recent borrowing activity.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsData;