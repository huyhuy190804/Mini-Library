import * as borrowingService from '../services/borrowingService.js'; // Import tất cả hàm từ service

// [POST] Create User
export const create = async (req, res) => {
  try {
    // req.body: Dữ liệu JSON React gửi lên (giống payload trong axios.post)
    const borrowing = await borrowingService.createBorrowing(req.body);
    
    // Trả về HTTP 201 (Created) và data
    res.status(201).json({ 
      message: 'Tạo borrowing thành công', 
      data: borrowing 
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// [GET] Get All Users
export const getAll = async (req, res) => {
  try {
    const borrowings = await borrowingService.getAllBorrowings();
    res.status(200).json(borrowings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// [GET] Get User Detail
export const getDetail = async (req, res) => {
  try {
    // req.params.id: Lấy ID trên URL (ví dụ: /users/123)
    const borrowing = await borrowingService.getBorrowingById(req.params.id);
    
    if (!borrowing) return res.status(404).json({ message: 'Không tìm thấy borrowing' });
    
    res.status(200).json(borrowing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// [PUT] Update User
export const update = async (req, res) => {
  try {
    const borrowing = await borrowingService.updateBorrowing(req.params.id, req.body);
    res.status(200).json({ message: 'Update borrowing thành công', data: borrowing });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// [DELETE] Delete User
export const remove = async (req, res) => {
  try {
    await borrowingService.deleteBorrowing(req.params.id);
    res.status(200).json({ message: 'Xóa borrowing thành công' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const returnBook = async (req, res) => {
  try {
    const borrowing = await borrowingService.returnBorrowing(req.params.id);
    res.status(200).json({ message: 'Trả sách thành công', data: borrowing });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

