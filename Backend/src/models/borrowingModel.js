import mongoose from 'mongoose';

const borrowingSchema = new mongoose.Schema({
  bookId: { 
    type: mongoose.Types.ObjectId, 
    ref: 'Book',
    required: true // Bắt buộc phải có
  },
  borrowerName: { 
    type: String, 
    required: true // Bắt buộc phải có
  },
  borrowDate: { 
    type: Date, 
    required: true,// B bắt buộc phải có
  },
  returnDate   : { 
    type: Date, 
    required: false,// Không bắt buộc
  },
  status: { 
    type: String,
    enum: ['BORROWED', 'RETURNED'],
    required: true // Bắt buộc phải có
  },
}, {
  timestamps: true // Tự động thêm createdAt và updatedAt
});

const BorrowingBook = mongoose.model('BorrowingBook', borrowingSchema);

export default BorrowingBook;
