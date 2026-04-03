import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import AuthorPage from './pages/AuthorPage'
import BookPage from './pages/BookPage'
import BorrowingPage from './pages/BorrowingPage'
import StatsPage from './pages/StatsPage' 

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            fontFamily: 'Inter, sans-serif',
            fontWeight: '600',
            fontSize: '13px',
            borderRadius: '12px',
            padding: '12px 16px',
            boxShadow: '0 4px 20px -4px rgba(0,0,0,0.12)',
          },
          success: {
            iconTheme: { primary: '#2563eb', secondary: '#fff' },
            style: { background: '#fff', color: '#0f172a', border: '1px solid #e2e8f0' },
          },
          error: {
            iconTheme: { primary: '#ef4444', secondary: '#fff' },
            style: { background: '#fff', color: '#0f172a', border: '1px solid #fecaca' },
          },
        }}
      />
      <Router>
        <Routes>
          <Route path="/authors" element={<AuthorPage />} />
          <Route path="/books" element={<BookPage />} />
          <Route path="/borrowings" element={<BorrowingPage />} />
          <Route path="/stats" element={<StatsPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
