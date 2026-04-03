import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true // Bắt buộc phải có
  },
  bio: { 
    type: String, 
    required: false ,// Không bắt buộc
  },
  birthDate: { 
    type: Date, 
    required: false // Không bắt buộc
  }
}, {
  timestamps: true // Tự động thêm createdAt và updatedAt
});

const Author = mongoose.model('Author', authorSchema);

export default Author;
