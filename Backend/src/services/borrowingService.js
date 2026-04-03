import Borrowing from '../models/borrowingModel.js';
import Book from '../models/bookModel.js';

// 1. Tạo borrowing — Rule 1 & 2: check availableStock, giảm stock
export const createBorrowing = async (borrowingData) => {
  // Rule 1: Không cho mượn khi hết sách
  const book = await Book.findById(borrowingData.bookId);
  if (!book) throw new Error('Không tìm thấy sách');
  if (book.availableStock === 0) throw new Error('Sách đã hết, không thể mượn');

  // Tạo record mượn sách
  const newBorrowing = await Borrowing.create({
    ...borrowingData,
    status: 'BORROWED',
  });

  // Rule 2: Giảm availableStock đi 1
  await Book.findByIdAndUpdate(borrowingData.bookId, {
    $inc: { availableStock: -1 },
  });

  return newBorrowing;
};

// 2. Lấy tất cả
export const getAllBorrowings = async () => {
  return await Borrowing.find();
};

// 3. Lấy 1 theo ID
export const getBorrowingById = async (borrowingId) => {
  return await Borrowing.findById(borrowingId);
};

// 4. Cập nhật thông tin chung
export const updateBorrowing = async (borrowingId, updateData) => {
  return await Borrowing.findByIdAndUpdate(borrowingId, updateData, { new: true });
};

// 5. Xóa
export const deleteBorrowing = async (borrowingId) => {
  return await Borrowing.findByIdAndDelete(borrowingId);
};

// 6. Trả sách — Rule 3: set RETURNED, tăng availableStock
export const returnBorrowing = async (borrowingId) => {
  const borrowing = await Borrowing.findById(borrowingId);
  if (!borrowing) throw new Error('Không tìm thấy record mượn sách');
  if (borrowing.status === 'RETURNED') throw new Error('Sách này đã được trả rồi');

  // Cập nhật trạng thái
  const updated = await Borrowing.findByIdAndUpdate(
    borrowingId,
    { status: 'RETURNED', returnDate: new Date() },
    { new: true }
  );

  // Rule 3: Tăng availableStock lên 1
  await Book.findByIdAndUpdate(borrowing.bookId, {
    $inc: { availableStock: 1 },
  });

  return updated;
};