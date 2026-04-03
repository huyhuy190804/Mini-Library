import * as bookService from '../services/bookService.js'; // Import tất cả hàm từ service

// [POST] Create User
export const create = async (req, res) => {
  try {
    // req.body: Dữ liệu JSON React gửi lên (giống payload trong axios.post)
    const book = await bookService.createBook(req.body);
    
    // Trả về HTTP 201 (Created) và data
    res.status(201).json({ 
      message: 'Tạo book thành công', 
      data: book 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// [GET] Get All Users
export const getAll = async (req, res) => {
  try {
    const books = await bookService.getAllBooks();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// [GET] Get User Detail
export const getDetail = async (req, res) => {
  try {
    // req.params.id: Lấy ID trên URL (ví dụ: /users/123)
    const book = await bookService.getBookById(req.params.id);
    
    if (!book) return res.status(404).json({ message: 'Không tìm thấy book' });
    
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// [PUT] Update User
export const update = async (req, res) => {
  try {
    const book = await bookService.updateBook(req.params.id, req.body);
    res.status(200).json({ message: 'Update book thành công', data: book });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// [DELETE] Delete User
export const remove = async (req, res) => {
  try {
    await bookService.deleteBook(req.params.id);
    res.status(200).json({ message: 'Xóa book thành công' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};