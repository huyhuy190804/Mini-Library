import * as authorService from '../services/authorService.js'; // Import tất cả hàm từ service

// [POST] Create User
export const create = async (req, res) => {
  try {
    // req.body: Dữ liệu JSON React gửi lên (giống payload trong axios.post)
    const author = await authorService.createAuthor(req.body);
    
    // Trả về HTTP 201 (Created) và data
    res.status(201).json({ 
      message: 'Tạo author thành công', 
      data: author 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// [GET] Get All Users
export const getAll = async (req, res) => {
  try {
    const authors = await authorService.getAllAuthors();
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// [GET] Get User Detail
export const getDetail = async (req, res) => {
  try {
    // req.params.id: Lấy ID trên URL (ví dụ: /users/123)
    const author = await authorService.getAuthorById(req.params.id);
    
    if (!author) return res.status(404).json({ message: 'Không tìm thấy author' });
    
    res.status(200).json(author);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// [PUT] Update User
export const update = async (req, res) => {
  try {
    const author = await authorService.updateAuthor(req.params.id, req.body);
    res.status(200).json({ message: 'Update author thành công', data: author });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// [DELETE] Delete User
export const remove = async (req, res) => {
  try {
    await authorService.deleteAuthor(req.params.id);
    res.status(200).json({ message: 'Xóa author thành công' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};