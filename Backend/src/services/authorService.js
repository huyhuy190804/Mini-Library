import Author from '../models/authorModel.js';
import Book from '../models/bookModel.js';

// 1. Tạo Author
export const createAuthor = async (authorData) => {
  const newAuthor = await Author.create(authorData);
  return newAuthor;
};

// 2. Lấy tất cả
export const getAllAuthors = async () => {
  return await Author.find();
};

// 3. Lấy 1 theo ID
export const getAuthorById = async (authorId) => {
  return await Author.findById(authorId);
};

// 4. Cập nhật
export const updateAuthor = async (authorId, updateData) => {
  return await Author.findByIdAndUpdate(authorId, updateData, { new: true });
};

// 5. Xóa — Rule 4: không cho xóa Author nếu còn Book liên kết
export const deleteAuthor = async (authorId) => {
  const bookCount = await Book.countDocuments({ authorId });
  if (bookCount > 0) {
    throw new Error(`Không thể xóa tác giả này vì còn ${bookCount} quyển sách liên kết`);
  }
  return await Author.findByIdAndDelete(authorId);
};