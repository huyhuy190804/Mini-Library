import Book from '../models/bookModel.js';
import Borrowing from '../models/borrowingModel.js';

// 1. Tạo Book
export const createBook = async (bookData) => {
  const newBook = await Book.create(bookData);
  return newBook;
};

// 2. Lấy tất cả
export const getAllBooks = async () => {
  return await Book.find();
};

// 3. Lấy 1 theo ID
export const getBookById = async (bookId) => {
  return await Book.findById(bookId);
};

// 4. Cập nhật
export const updateBook = async (bookId, updateData) => {
  return await Book.findByIdAndUpdate(bookId, updateData, { new: true });
};

// 5. Xóa — Rule 5: không cho xóa Book nếu có Borrowing chưa trả
export const deleteBook = async (bookId) => {
  const activeBorrowings = await Borrowing.countDocuments({
    bookId,
    status: 'BORROWED',
  });
  if (activeBorrowings > 0) {
    throw new Error(`Không thể xóa sách này vì có ${activeBorrowings} phiếu mượn chưa trả`);
  }
  return await Book.findByIdAndDelete(bookId);
};