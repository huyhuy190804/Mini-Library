import React from 'react';
import { Plus, Pencil, Trash2, BookOpen } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import ConfirmDeleteModal from '../ui/ConfirmDeleteModal';

const getStockStatus = (available, total) => {
  if (available === 0) return 'BORROWED';
  if (available <= Math.max(1, total * 0.2)) return 'LOW STOCK';
  return 'AVAILABLE';
};

const StatusBadge = ({ available, total }) => {
  const status = getStockStatus(available, total);
  const styles = { AVAILABLE: 'bg-green-100 text-green-700', 'LOW STOCK': 'bg-yellow-100 text-yellow-700', BORROWED: 'bg-slate-200 text-slate-700' };
  const dots = { AVAILABLE: 'bg-green-500', 'LOW STOCK': 'bg-yellow-500', BORROWED: 'bg-slate-400' };
  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wide ${styles[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${dots[status]}`}></span>
      {status}
    </span>
  );
};

const BookData = ({
  books = [],
  authors = [],
  isDialogOpen, setIsDialogOpen,
  currentEditingId,
  isSaving,
  formData, setFormData,
  deleteTarget, setDeleteTarget,
  isDeleting,
  onOpenAdd, onOpenEdit,
  onSubmit, onDeleteConfirm,
}) => {
  const getAuthorName = (authorId) => {
    if (!authorId) return 'Unknown';
    const found = authors.find(a => a._id === (authorId._id || authorId));
    return found ? found.name : 'Unknown';
  };

  return (
    <div className="p-8 md:p-10 bg-[#f8fafc] min-h-[calc(100vh-80px)] font-sans pb-16">
      {/* Header */}
      <div className="flex justify-between items-end mb-10">
        <div>
          <p className="text-[#0044cc] text-[11px] font-bold tracking-widest uppercase mb-2">Archive Overview</p>
          <h1 className="text-4xl font-extrabold text-[#0f172a] tracking-tight">Books Management</h1>
        </div>
        <Button
          onClick={onOpenAdd}
          className="flex items-center gap-2 bg-[#0055ff] hover:bg-blue-700 text-white px-6 py-3 h-12 rounded-full font-bold transition-all shadow-md cursor-pointer"
        >
          <Plus size={20} strokeWidth={2.5} />
          Add Book
        </Button>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-[3fr_2fr_1fr_0.6fr_1.5fr_0.5fr] gap-4 px-8 mb-4 text-[10px] font-extrabold text-[#94a3b8] uppercase tracking-widest">
        <div>Title</div><div>Author</div><div>Year</div><div>Stock</div><div>Status</div>
        <div className="text-center">Actions</div>
      </div>

      {/* Table Rows */}
      <div className="flex flex-col gap-3">
        {books.map((book) => (
          <div key={book._id} className="grid grid-cols-[3fr_2fr_1fr_0.6fr_1.5fr_0.5fr] gap-4 items-center bg-white p-4 px-8 rounded-2xl shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] border border-gray-100/80 transition-shadow hover:shadow-[0_4px_15px_-4px_rgba(0,0,0,0.1)]">
            <div className="flex items-center gap-4">
              <div className="w-9 h-12 rounded overflow-hidden flex-shrink-0 border border-gray-200/60 bg-[#f0f5ff] flex items-center justify-center">
                <BookOpen size={16} className="text-[#0055ff]" />
              </div>
              <span className="font-bold text-slate-900 text-[14.5px] truncate">{book.title}</span>
            </div>
            <div className="text-gray-600 font-medium text-[13px] truncate">{getAuthorName(book.authorId)}</div>
            <div>
              {book.publishedYear
                ? <span className="px-3 py-1.5 bg-[#f0f5ff] text-[#0044cc] text-[10px] font-extrabold tracking-widest uppercase rounded-full">{book.publishedYear}</span>
                : <span className="text-slate-400 text-xs italic">N/A</span>}
            </div>
            <div className="font-bold text-slate-900 text-[15px]">
              {book.availableStock ?? 0}<span className="text-slate-400 font-normal text-xs">/{book.totalStock ?? 0}</span>
            </div>
            <div><StatusBadge available={book.availableStock} total={book.totalStock} /></div>
            <div className="flex items-center justify-center gap-3">
              <button onClick={() => onOpenEdit(book)} className="text-gray-400 hover:text-[#0044cc] transition-colors p-1 cursor-pointer" title="Edit">
                <Pencil size={16} strokeWidth={2} />
              </button>
              <button onClick={() => setDeleteTarget({ id: book._id, name: book.title })} className="text-gray-400 hover:text-red-500 transition-colors p-1 cursor-pointer" title="Delete">
                <Trash2 size={16} strokeWidth={2} />
              </button>
            </div>
          </div>
        ))}
        {books.length === 0 && (
          <div className="text-center py-10 text-slate-400 text-sm font-medium">No books found. Click "Add Book" to start.</div>
        )}
      </div>

      {/* Add / Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">{currentEditingId ? 'Edit Book' : 'Add New Book'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={onSubmit} className="space-y-4 pt-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">Title <span className="text-red-500">*</span></label>
              <input id="title" autoFocus required
                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0055ff] focus:border-transparent"
                value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} placeholder="Book title..." />
            </div>
            <div className="space-y-2">
              <label htmlFor="authorId" className="text-sm font-medium">Author <span className="text-red-500">*</span></label>
              <select id="authorId" required
                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0055ff] focus:border-transparent"
                value={formData.authorId} onChange={e => setFormData({ ...formData, authorId: e.target.value })}>
                <option value="">Select an author...</option>
                {authors.map(a => <option key={a._id} value={a._id}>{a.name}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="totalStock" className="text-sm font-medium">Total Stock <span className="text-red-500">*</span></label>
                <input id="totalStock" type="number" min="0" required
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0055ff] focus:border-transparent"
                  value={formData.totalStock} onChange={e => setFormData({ ...formData, totalStock: e.target.value })} placeholder="0" />
              </div>
              <div className="space-y-2">
                <label htmlFor="availableStock" className="text-sm font-medium">Available Stock <span className="text-red-500">*</span></label>
                <input id="availableStock" type="number" min="0" required
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0055ff] focus:border-transparent"
                  value={formData.availableStock} onChange={e => setFormData({ ...formData, availableStock: e.target.value })} placeholder="0" />
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="publishedYear" className="text-sm font-medium">Published Year</label>
              <input id="publishedYear" type="number" min="1000" max="2100"
                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0055ff] focus:border-transparent"
                value={formData.publishedYear} onChange={e => setFormData({ ...formData, publishedYear: e.target.value })} placeholder="E.g. 2023" />
            </div>
            <div className="pt-4 flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="cursor-pointer">Cancel</Button>
              <Button type="submit" disabled={isSaving} className="bg-[#0055ff] hover:bg-blue-700 text-white cursor-pointer hover:text-white">
                {isSaving ? 'Saving…' : currentEditingId ? 'Save Changes' : 'Add Book'}
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
        title="Delete Book"
        description="This will permanently remove the book from your library."
        itemName={deleteTarget?.name}
        isLoading={isDeleting}
      />
    </div>
  );
};

export default BookData;