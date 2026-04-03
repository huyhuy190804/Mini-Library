import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import AuthorData from '../../components/AuthorData';

const API_URL = import.meta.env.VITE_API_URL;

const AuthorPage = () => {
  const [authors, setAuthors] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentEditingId, setCurrentEditingId] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [formData, setFormData] = useState({ name: '', bio: '', birthDate: '' });

  useEffect(() => { fetchAuthors(); }, []);

  const fetchAuthors = async () => {
    try {
      const res = await fetch(`${API_URL}/api/authors`);
      const data = await res.json();
      setAuthors(Array.isArray(data) ? data : data.data || data.authors || []);
    } catch {
      toast.error('Failed to load authors.');
    }
  };

  const handleOpenAdd = () => {
    setCurrentEditingId(null);
    setFormData({ name: '', bio: '', birthDate: '' });
    setIsDialogOpen(true);
  };

  const handleOpenEdit = (author) => {
    setCurrentEditingId(author._id);
    setFormData({
      name: author.name || '',
      bio: author.bio || '',
      birthDate: author.birthDate ? new Date(author.birthDate).toISOString().split('T')[0] : '',
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const isEdit = !!currentEditingId;
    const promise = fetch(
      isEdit ? `${API_URL}/api/authors/${currentEditingId}` : `${API_URL}/api/authors`,
      { method: isEdit ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) }
    ).then(async res => {
      if (!res.ok) { const err = await res.json(); throw new Error(err.message || 'Request failed'); }
      return res.json();
    });

    toast.promise(promise, {
      loading: isEdit ? 'Saving changes…' : 'Adding author…',
      success: isEdit ? 'Author updated!' : 'Author added!',
      error: (err) => err.message || 'Something went wrong.',
    });

    try { await promise; setIsDialogOpen(false); fetchAuthors(); }
    catch { /* handled by toast */ }
    finally { setIsSaving(false); }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`${API_URL}/api/authors/${deleteTarget.id}`, { method: 'DELETE' });
      if (!res.ok) { const err = await res.json(); throw new Error(err.message || 'Delete failed'); }
      toast.success('Author deleted successfully.');
      setDeleteTarget(null);
      fetchAuthors();
    } catch (err) {
      toast.error(err.message || 'Failed to delete author.');
    } finally { setIsDeleting(false); }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <AuthorData
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

export default AuthorPage;