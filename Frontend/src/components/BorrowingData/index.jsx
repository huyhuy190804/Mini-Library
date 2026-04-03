import React from 'react';
import { Plus, Repeat, Trash2, BookOpen } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import ConfirmDeleteModal from '../ui/ConfirmDeleteModal';

const getInitials = (name) => {
  if (!name) return '?';
  const parts = name.trim().split(' ');
  if (parts.length >= 2) return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  return name.substring(0, 2).toUpperCase();
};

const formatDate = (d) => {
  if (!d) return '—';
  return new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
};

const BorrowingData = ({
  borrowings = [],
  books = [],
  stats = { totalLoans: 0, currentlyBorrowed: 0 },
  isDialogOpen, setIsDialogOpen,
  isSaving,
  formData, setFormData,
  deleteTarget, setDeleteTarget,
  isDeleting,
  onOpenAdd, onSubmit,
  onReturn, onDeleteConfirm,
}) => {
  const getBookTitle = (bookId) => {
    if (!bookId) return 'Unknown';
    const found = books.find(b => b._id === (bookId._id || bookId));
    return found ? found.title : (bookId.title || 'Unknown');
  };

  return (
    <div className="p-8 md:p-10 bg-[#f8fafc] min-h-[calc(100vh-80px)] font-sans pb-16">
      {/* Header */}
      <div className="flex justify-between items-start mb-10">
        <div className="max-w-xl">
          <h1 className="text-4xl font-extrabold text-[#0f172a] tracking-tight mb-3">Borrowings</h1>
          <p className="text-slate-600 text-[14px] leading-relaxed">
            Oversee the lifecycle of the collection. Track active loans and manage historical returns.
          </p>
        </div>
        <Button
          onClick={onOpenAdd}
          className="flex items-center gap-2 bg-[#0055ff] hover:bg-blue-700 text-white px-6 py-3 h-12 rounded-full font-bold transition-all shadow-md cursor-pointer"
        >
          <Plus size={20} strokeWidth={2.5} />
          Create Borrowing
        </Button>
      </div>

      {/* Overview Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 mb-10">
        <div className="bg-white rounded-[24px] p-8 shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] border border-gray-100/50 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-[#f0f4f9]/50 to-transparent pointer-events-none"></div>
          <div className="relative z-10">
            <p className="text-[#0055ff] text-[10px] font-extrabold tracking-widest uppercase mb-3">Archive Status</p>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Inventory Circulation</h2>
            <p className="text-slate-600 text-sm leading-relaxed max-w-sm">Live overview of all borrowing activity in the digital library.</p>
          </div>
          <div className="flex items-center gap-14 mt-8 relative z-10">
            <div>
              <div className="text-[32px] md:text-4xl font-black text-slate-900 tracking-tight leading-none mb-2">{stats.totalLoans.toLocaleString()}</div>
              <div className="text-[11px] text-gray-500 font-bold uppercase tracking-wide">Total Loans</div>
            </div>
            <div>
              <div className="text-[32px] md:text-4xl font-black text-[#d95d16] tracking-tight leading-none mb-2">{stats.currentlyBorrowed}</div>
              <div className="text-[11px] text-gray-500 font-bold uppercase tracking-wide">Currently Out</div>
            </div>
          </div>
        </div>
        <div className="bg-[#2563eb] rounded-[24px] p-8 shadow-md flex flex-col justify-between text-white">
          <div>
            <BookOpen size={36} className="text-white/90 mb-6" strokeWidth={1.5} />
            <h2 className="text-[22px] font-bold leading-snug mb-6 pr-4">Manage and track every book loan in real-time</h2>
          </div>
          <div>
            <button className="bg-white/20 hover:bg-white/30 transition-colors text-white text-xs font-bold px-6 py-2.5 rounded-full backdrop-blur-sm">View Analytics</button>
          </div>
        </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-[1.5fr_2fr_1fr_1.2fr_0.8fr_0.5fr] gap-4 px-8 mb-4 text-[10px] font-extrabold text-[#94a3b8] uppercase tracking-widest">
        <div>Borrower</div><div>Book Title</div><div>Borrow Date</div><div>Return Date</div><div>Status</div>
        <div className="text-center">Actions</div>
      </div>

      {/* Table Rows */}
      <div className="flex flex-col gap-3">
        {borrowings.map((row) => {
          const bookTitle = getBookTitle(row.bookId);
          return (
            <div key={row._id} className="grid grid-cols-[1.5fr_2fr_1fr_1.2fr_0.8fr_0.5fr] gap-4 items-center bg-white p-4 px-8 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.03)] border border-gray-100/80 transition-shadow hover:shadow-[0_4px_15px_-4px_rgba(0,0,0,0.06)]">
              <div className="flex items-center gap-4">
                <div className="bg-[#f0f5ff] text-[#0055ff] text-[11px] font-extrabold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0">
                  {getInitials(row.borrowerName)}
                </div>
                <span className="font-medium text-sm text-slate-900 truncate">{row.borrowerName}</span>
              </div>
              <div className="font-bold text-[13px] text-slate-900 truncate pr-2">{bookTitle}</div>
              <div className="text-[13px] text-slate-600 font-medium">{formatDate(row.borrowDate)}</div>
              <div className="text-[13px] text-slate-600 font-medium">{formatDate(row.returnDate)}</div>
              <div>
                {row.status === 'BORROWED'
                  ? <span className="px-3 py-1.5 bg-[#eaf2ff] text-[#0055ff] text-[9px] font-extrabold tracking-widest uppercase rounded-full">Borrowed</span>
                  : <span className="px-3 py-1.5 bg-[#dcfce7] text-[#15803d] text-[9px] font-extrabold tracking-widest uppercase rounded-full">Returned</span>}
              </div>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => onReturn(row._id, bookTitle)}
                  disabled={row.status === 'RETURNED'}
                  title={row.status === 'RETURNED' ? 'Already returned' : 'Process Return'}
                  className={`transition-colors p-1 ${row.status === 'RETURNED' ? 'text-gray-300 cursor-not-allowed' : 'text-[#0055ff] hover:text-blue-800 cursor-pointer'}`}
                >
                  <Repeat size={16} strokeWidth={2.5} />
                </button>
                <button
                  onClick={() => setDeleteTarget({ id: row._id, name: `${row.borrowerName} → ${bookTitle}` })}
                  className="text-[#ef4444] hover:text-red-700 transition-colors p-1 cursor-pointer"
                  title="Delete record"
                >
                  <Trash2 size={16} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          );
        })}
        {borrowings.length === 0 && (
          <div className="text-center py-10 text-slate-400 text-sm font-medium">No borrowing records found. Click "Create Borrowing" to start.</div>
        )}
      </div>

      {/* Create Borrowing Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Create Borrowing Record</DialogTitle>
          </DialogHeader>
          <form onSubmit={onSubmit} className="space-y-4 pt-4">
            <div className="space-y-2">
              <label htmlFor="borrowerName" className="text-sm font-medium">Borrower Name <span className="text-red-500">*</span></label>
              <input id="borrowerName" autoFocus required
                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0055ff] focus:border-transparent"
                value={formData.borrowerName} onChange={e => setFormData({ ...formData, borrowerName: e.target.value })}
                placeholder="E.g. John Smith" />
            </div>
            <div className="space-y-2">
              <label htmlFor="bookId" className="text-sm font-medium">Book <span className="text-red-500">*</span></label>
              <select id="bookId" required
                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0055ff] focus:border-transparent"
                value={formData.bookId} onChange={e => setFormData({ ...formData, bookId: e.target.value })}>
                <option value="">Select a book...</option>
                {books.filter(b => b.availableStock > 0).map(b => (
                  <option key={b._id} value={b._id}>{b.title} ({b.availableStock} left)</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="borrowDate" className="text-sm font-medium">Borrow Date <span className="text-red-500">*</span></label>
                <input id="borrowDate" type="date" required
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0055ff] focus:border-transparent"
                  value={formData.borrowDate} onChange={e => setFormData({ ...formData, borrowDate: e.target.value })} />
              </div>
              <div className="space-y-2">
                <label htmlFor="returnDate" className="text-sm font-medium">Expected Return</label>
                <input id="returnDate" type="date"
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0055ff] focus:border-transparent"
                  value={formData.returnDate} onChange={e => setFormData({ ...formData, returnDate: e.target.value })} />
              </div>
            </div>
            <div className="pt-4 flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="cursor-pointer">Cancel</Button>
              <Button type="submit" disabled={isSaving} className="bg-[#0055ff] hover:bg-blue-700 text-white cursor-pointer hover:text-white">
                {isSaving ? 'Creating…' : 'Create Record'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Confirm Delete */}
      <ConfirmDeleteModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={onDeleteConfirm}
        title="Delete Borrowing Record"
        description="This will permanently remove the borrowing record from the system."
        itemName={deleteTarget?.name}
        isLoading={isDeleting}
      />
    </div>
  );
};

export default BorrowingData;