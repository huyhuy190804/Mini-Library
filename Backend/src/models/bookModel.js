import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true // Bắt buộc phải có
  },
  authorId: { 
    type: mongoose.Types.ObjectId, 
    ref: 'Author',
    required: true ,// Không bắt buộc
  },
  totalStock: { 
    type: Number, 
    required: true // B bắt buộc phải có
  },
  availableStock: { 
    type: Number, 
    required: true // Bắt buộc phải có
  },
  publishedYear: { 
    type: Number, 
    required: false // Không bắt buộc
  },
}, {
  timestamps: true // Tự động thêm createdAt và updatedAt
});

const Book = mongoose.model('Book', bookSchema);

export default Book;
