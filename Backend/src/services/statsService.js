import Author from '../models/authorModel.js';
import Book from '../models/bookModel.js';
import Borrowing from '../models/borrowingModel.js';

// GET /api/stats/overview - Tổng số sách, authors, borrowings
export const getOverview = async () => {
  const [totalAuthors, totalBooks, totalBorrowings, currentlyBorrowed] = await Promise.all([
    Author.countDocuments(),
    Book.countDocuments(),
    Borrowing.countDocuments(),
    Borrowing.countDocuments({ status: 'BORROWED' }),
  ]);
  return { totalAuthors, totalBooks, totalBorrowings, currentlyBorrowed };
};

// GET /api/stats/top-books - Top sách được mượn nhiều nhất
export const getTopBooks = async () => {
  const topBooks = await Borrowing.aggregate([
    { $group: { _id: '$bookId', borrowCount: { $sum: 1 } } },
    { $sort: { borrowCount: -1 } },
    { $limit: 10 },
    {
      $lookup: {
        from: 'books',
        localField: '_id',
        foreignField: '_id',
        as: 'bookInfo',
      },
    },
    { $unwind: '$bookInfo' },
    {
      $project: {
        _id: 0,
        bookId: '$_id',
        title: '$bookInfo.title',
        count: '$borrowCount',
      },
    },
  ]);
  return topBooks;
};

// GET /api/stats/borrow-status - Số lượng đang mượn vs đã trả
export const getBorrowStatus = async () => {
  const [borrowed, returned] = await Promise.all([
    Borrowing.countDocuments({ status: 'BORROWED' }),
    Borrowing.countDocuments({ status: 'RETURNED' }),
  ]);
  return { borrowed, returned };
};