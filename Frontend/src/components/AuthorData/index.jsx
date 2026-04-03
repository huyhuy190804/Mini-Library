import React from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import ConfirmDeleteModal from '../ui/ConfirmDeleteModal';

const getInitials = (name) => {
  if (!name) return '?';
  const parts = name.trim().split(' ');
  if (parts.length >= 2) return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  return name.substring(0, 2).toUpperCase();
};

const AuthorData = ({
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
  return (
    <div className="p-8 md:p-10 bg-[#f8fafc] min-h-[calc(100vh-80px)] font-sans pb-16">
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-[32px] md:text-4xl font-extrabold text-[#0f172a] tracking-tight">Authors Management</h1>
        <Button
          onClick={onOpenAdd}
          className="flex items-center h-12 gap-2 bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-6 rounded-full font-bold shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] transition-all cursor-pointer"
        >
          <Plus size={20} strokeWidth={2.5} />
          Add Author
        </Button>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-[2fr_3fr_1.5fr_1fr] gap-4 px-8 mb-4 text-[10px] font-extrabold text-[#94a3b8] uppercase tracking-widest">
        <div>Author Name</div>
        <div>Biography</div>
        <div>Birth Date</div>
        <div className="text-right">Administrative</div>
      </div>

      {/* Table Rows */}
      <div className="flex flex-col gap-3">
        {authors.map((author) => (
          <div key={author._id} className="grid grid-cols-[2fr_3fr_1.5fr_1fr] gap-4 items-center bg-white p-4 px-8 rounded-[20px] shadow-[0_2px_10px_-4px_rgba(0,0,0,0.02)] border border-gray-100 transition-all hover:shadow-[0_4px_15px_-4px_rgba(0,0,0,0.05)]">
            <div className="flex items-center gap-4">
              <div className="w-[42px] h-[42px] rounded-full bg-[#f0f5ff] text-[#2563eb] text-sm font-extrabold flex items-center justify-center flex-shrink-0">
                {getInitials(author.name)}
              </div>
              <p className="font-bold text-[14.5px] text-slate-900 leading-tight truncate">{author.name}</p>
            </div>

            <div className="text-[13px] text-slate-500 font-medium truncate pr-4">
              {author.bio || <span className="italic text-slate-400">No biography provided</span>}
            </div>

            <div>
              {author.birthDate ? (
                <span className="px-3.5 py-1.5 bg-[#f0f5ff] text-[#2563eb] text-[10px] font-extrabold tracking-widest rounded-full">
                  {new Date(author.birthDate).toLocaleDateString()}
                </span>
              ) : (
                <span className="text-slate-400 text-xs italic font-medium">Unknown</span>
              )}
            </div>

            <div className="flex items-center justify-end gap-5">
              <button onClick={() => onOpenEdit(author)} className="text-[#2563eb] hover:bg-blue-50 p-1.5 rounded-lg transition-colors cursor-pointer" title="Edit">
                <Edit size={17} strokeWidth={2} />
              </button>
              <button onClick={() => setDeleteTarget({ id: author._id, name: author.name })} className="text-[#ef4444] hover:bg-red-50 p-1.5 rounded-lg transition-colors cursor-pointer" title="Delete">
                <Trash2 size={17} strokeWidth={2} />
              </button>
            </div>
          </div>
        ))}
        {authors.length === 0 && (
          <div className="text-center py-10 text-slate-400 text-sm font-medium">
            No authors found. Click "Add Author" to start.
          </div>
        )}
      </div>

      {/* Add / Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {currentEditingId ? 'Edit Author' : 'Add New Author'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={onSubmit} className="space-y-4 pt-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Author Name <span className="text-red-500">*</span></label>
              <input id="name" autoFocus required
                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent"
                value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="E.g. Jane Austen" />
            </div>
            <div className="space-y-2">
              <label htmlFor="bio" className="text-sm font-medium">Biography</label>
              <input id="bio"
                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent"
                value={formData.bio} onChange={e => setFormData({ ...formData, bio: e.target.value })}
                placeholder="Short bio..." />
            </div>
            <div className="space-y-2">
              <label htmlFor="birthDate" className="text-sm font-medium">Birth Date</label>
              <input id="birthDate" type="date"
                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent"
                value={formData.birthDate} onChange={e => setFormData({ ...formData, birthDate: e.target.value })} />
            </div>
            <div className="pt-4 flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)} className="cursor-pointer">Cancel</Button>
              <Button type="submit" disabled={isSaving} className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white cursor-pointer hover:text-white">
                {isSaving ? 'Saving…' : currentEditingId ? 'Save Changes' : 'Add Author'}
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
        title="Delete Author"
        description="Deleting an author will remove them from the system."
        itemName={deleteTarget?.name}
        isLoading={isDeleting}
      />
    </div>
  );
};

export default AuthorData;