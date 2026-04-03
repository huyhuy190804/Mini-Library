import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import StatsData from '../../components/StatsData';

const API_URL = import.meta.env.VITE_API_URL;

const StatsPage = () => {
  const [overview, setOverview] = useState({ totalBooks: 0, totalAuthors: 0, totalBorrowings: 0, currentlyBorrowed: 0 });
  const [topBooks, setTopBooks] = useState([]);
  const [borrowStatus, setBorrowStatus] = useState({ returned: 0, borrowed: 0 });
  const [recentBorrowings, setRecentBorrowings] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchOverview();
    fetchTopBooks();
    fetchBorrowStatus();
    fetchRecentBorrowings();
    fetchBooks();
  }, []);

  const fetchOverview = async () => {
    try {
      const res = await fetch(`${API_URL}/api/stats/overview`);
      const data = await res.json();
      setOverview({
        totalBooks: data.totalBooks ?? 0,
        totalAuthors: data.totalAuthors ?? 0,
        totalBorrowings: data.totalBorrowings ?? 0,
        currentlyBorrowed: data.currentlyBorrowed ?? 0,
      });
    } catch (err) { console.error('Failed to fetch overview:', err); }
  };

  const fetchTopBooks = async () => {
    try {
      const res = await fetch(`${API_URL}/api/stats/top-books`);
      const data = await res.json();
      setTopBooks(Array.isArray(data) ? data : data.data || []);
    } catch (err) { console.error('Failed to fetch top books:', err); }
  };

  const fetchBorrowStatus = async () => {
    try {
      const res = await fetch(`${API_URL}/api/stats/borrow-status`);
      const data = await res.json();
      if (Array.isArray(data)) {
        const ret = data.find(d => d._id === 'RETURNED');
        const bor = data.find(d => d._id === 'BORROWED');
        setBorrowStatus({ returned: ret?.count ?? 0, borrowed: bor?.count ?? 0 });
      } else {
        setBorrowStatus({ returned: data.returned ?? 0, borrowed: data.borrowed ?? 0 });
      }
    } catch (err) { console.error('Failed to fetch borrow status:', err); }
  };

  const fetchRecentBorrowings = async () => {
    try {
      const res = await fetch(`${API_URL}/api/borrowings`);
      const data = await res.json();
      const list = Array.isArray(data) ? data : data.data || [];
      const sorted = [...list].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);
      setRecentBorrowings(sorted);
    } catch (err) { console.error('Failed to fetch recent borrowings:', err); }
  };

  const fetchBooks = async () => {
    try {
      const res = await fetch(`${API_URL}/api/books`);
      const data = await res.json();
      setBooks(Array.isArray(data) ? data : data.data || []);
    } catch (err) { console.error('Failed to fetch books:', err); }
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <StatsData
          overview={overview}
          topBooks={topBooks}
          borrowStatus={borrowStatus}
          recentBorrowings={recentBorrowings}
          books={books}
        />
      </div>
    </div>
  );
};

export default StatsPage;