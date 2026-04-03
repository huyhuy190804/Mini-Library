import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import BookData from '../../components/BookData';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

const BookPage = () => {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentEditingId, setCurrentEditingId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formData, setFormData] = useState({ title: '', authorId: '', totalStock: '', availableStock: '', publishedYear: '' });

  useEffect(() => { fetchBooks(); fetchAuthors(); }, []);

  const fetchBooks = async () => {
    try {
      const res = await fetch(`${API_URL}/api/books`);
      const data = await res.json();
      setBooks(Array.isArray(data) ? data : data.data || []);
    } catch { toast.error('Failed to load books.'); }
  };

  const fetchAuthors = async () => {
    try {
      const res = await fetch(`${API_URL}/api/authors`);
      const data = await res.json();
      setAuthors(Array.isArray(data) ? data : data.data || []);
    } catch { toast.error('Failed to load authors.'); }
  };

  const handleOpenAdd = () => {
    setCurrentEditingId(null);
    setFormData({ title: '', authorId: '', totalStock: '', availableStock: '', publishedYear: '' });
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (book) => {
    setCurrentEditingId(book._id);
    setFormData({
      title: book.title || '',
      authorId: book.authorId?._id || book.authorId || '',
      totalStock: book.totalStock ?? '',
      availableStock: book.availableStock ?? '',
      publishedYear: book.publishedYear ?? '',
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const isEdit = !!currentEditingId;
    const payload = {
      ...formData,
      totalStock: Number(formData.totalStock),
      availableStock: Number(formData.availableStock),
      ...(formData.publishedYear && { publishedYear: Number(formData.publishedYear) }),
    };

    const promise = fetch(
      isEdit ? `${API_URL}/api/books/${currentEditingId}` : `${API_URL}/api/books`,
      { method: isEdit ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }
    ).then(async res => {
      if (!res.ok) { const err = await res.json(); throw new Error(err.message || 'Request failed'); }
      return res.json();
    });

    toast.promise(promise, {
      loading: isEdit ? 'Saving changes…' : 'Adding book…',
      success: isEdit ? 'Book updated!' : 'Book added!',
      error: (err) => err.message || 'Something went wrong.',
    });

    try { await promise; setIsDialogOpen(false); fetchBooks(); }
    catch { /* handled */ }
    finally { setIsSaving(false); }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`${API_URL}/api/books/${deleteTarget.id}`, { method: 'DELETE' });
      if (!res.ok) { const err = await res.json(); throw new Error(err.message || 'Delete failed'); }
      toast.success('Book deleted successfully.');
      setDeleteTarget(null);
      fetchBooks();
    } catch (err) {
      toast.error(err.message || 'Failed to delete book.');
    } finally { setIsDeleting(false); }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <BookData
          books={books}
          authors={authors}
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          currentEditingId={currentEditingId}
          isSaving={isSaving}
          formData={formData}
          setFormData={setFormData}
          deleteTarget={deleteTarget}
          setDeleteTarget={setDeleteTarget}
          isDeleting={isDeleting}
          onOpenAdd={handleOpenAdd}
          onOpenEdit={handleOpenEdit}
          onSubmit={handleSubmit}
          onDeleteConfirm={handleDeleteConfirm}
        />
      </div>
    </div>
  );
};

export default BookPage;