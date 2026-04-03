import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import BorrowingData from '../../components/BorrowingData';

const API_URL = import.meta.env.VITE_API_URL ;

const BorrowingPage = () => {
  const [borrowings, setBorrowings] = useState([]);
  const [books, setBooks] = useState([]);
  const [stats, setStats] = useState({ totalLoans: 0, currentlyBorrowed: 0 });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formData, setFormData] = useState({
    bookId: '', borrowerName: '',
    borrowDate: new Date().toISOString().split('T')[0],
    returnDate: '',
  });

  useEffect(() => { fetchAll(); }, []);

  const fetchAll = () => Promise.all([fetchBorrowings(), fetchBooks(), fetchStats()]);

  const fetchBorrowings = async () => {
    try {
      const res = await fetch(`${API_URL}/api/borrowings`);
      const data = await res.json();
      setBorrowings(Array.isArray(data) ? data : data.data || []);
    } catch { toast.error('Failed to load borrowings.'); }
  };

  const fetchBooks = async () => {
    try {
      const res = await fetch(`${API_URL}/api/books`);
      const data = await res.json();
      setBooks(Array.isArray(data) ? data : data.data || []);
    } catch { toast.error('Failed to load books.'); }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch(`${API_URL}/api/stats/overview`);
      const data = await res.json();
      setStats({ totalLoans: data.totalBorrowings ?? 0, currentlyBorrowed: data.currentlyBorrowed ?? 0 });
    } catch { /* stats non-critical */ }
  };

  const handleOpenAdd = () => {
    setFormData({ bookId: '', borrowerName: '', borrowDate: new Date().toISOString().split('T')[0], returnDate: '' });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const promise = fetch(`${API_URL}/api/borrowings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    }).then(async res => {
      if (!res.ok) { const err = await res.json(); throw new Error(err.message || 'Request failed'); }
      return res.json();
    });

    toast.promise(promise, {
      loading: 'Creating borrowing record…',
      success: 'Borrowing record created!',
      error: (err) => err.message || 'Failed to create record.',
    });

    try { await promise; setIsDialogOpen(false); fetchAll(); }
    catch { /* handled */ }
    finally { setIsSaving(false); }
  };

  const handleReturn = async (id, bookTitle) => {
    const promise = fetch(`${API_URL}/api/borrowings/${id}/return`, { method: 'PUT' })
      .then(async res => {
        if (!res.ok) { const err = await res.json(); throw new Error(err.message || 'Return failed'); }
        return res.json();
      });

    toast.promise(promise, {
      loading: 'Processing return…',
      success: `"${bookTitle}" has been returned!`,
      error: (err) => err.message || 'Failed to process return.',
    });

    try { await promise; fetchAll(); }
    catch { /* handled */ }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`${API_URL}/api/borrowings/${deleteTarget.id}`, { method: 'DELETE' });
      if (!res.ok) { const err = await res.json(); throw new Error(err.message || 'Delete failed'); }
      toast.success('Borrowing record deleted.');
      setDeleteTarget(null);
      fetchAll();
    } catch (err) {
      toast.error(err.message || 'Failed to delete record.');
    } finally { setIsDeleting(false); }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <BorrowingData
          borrowings={borrowings}
          books={books}
          stats={stats}
          isDialogOpen={isDialogOpen}
          setIsDialogOpen={setIsDialogOpen}
          isSaving={isSaving}
          formData={formData}
          setFormData={setFormData}
          deleteTarget={deleteTarget}
          setDeleteTarget={setDeleteTarget}
          isDeleting={isDeleting}
          onOpenAdd={handleOpenAdd}
          onSubmit={handleSubmit}
          onReturn={handleReturn}
          onDeleteConfirm={handleDeleteConfirm}
        />
      </div>
    </div>
  );
};

export default BorrowingPage;