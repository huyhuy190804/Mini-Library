# API Checklist - Fullstack Mini Library Manager

## 📚 Sách (Books) — `/api/books`
- [ ] `GET    /api/books`         — Lấy danh sách tất cả sách
- [ ] `GET    /api/books/:id`     — Lấy chi tiết một quyển sách
- [ ] `POST   /api/books`         — Thêm mới sách
- [ ] `PUT    /api/books/:id`     — Cập nhật thông tin sách
- [ ] `DELETE /api/books/:id`     — Xóa sách _(từ chối nếu còn phiếu mượn chưa trả)_

## ✍️ Tác giả (Authors) — `/api/authors`
- [ ] `GET    /api/authors`       — Lấy danh sách tất cả tác giả
- [ ] `GET    /api/authors/:id`   — Lấy chi tiết một tác giả
- [ ] `POST   /api/authors`       — Thêm mới tác giả
- [ ] `PUT    /api/authors/:id`   — Cập nhật thông tin tác giả
- [ ] `DELETE /api/authors/:id`   — Xóa tác giả _(từ chối nếu còn sách liên kết)_

## 🔄 Mượn/Trả sách (Borrowings) — `/api/borrowings`
- [ ] `GET    /api/borrowings`           — Lấy danh sách tất cả phiếu mượn
- [ ] `GET    /api/borrowings/:id`       — Lấy chi tiết một phiếu mượn
- [ ] `POST   /api/borrowings`           — Tạo phiếu mượn sách _(từ chối nếu hết sách)_
- [ ] `PUT    /api/borrowings/:id`       — Cập nhật thông tin phiếu mượn
- [ ] `PUT    /api/borrowings/:id/return`— Trả sách _(tự động cập nhật tồn kho)_
- [ ] `DELETE /api/borrowings/:id`       — Xóa phiếu mượn

## 📊 Thống kê (Stats) — `/api/stats`
- [ ] `GET /api/stats/overview`      — Tổng số sách, tác giả, lượt mượn
- [ ] `GET /api/stats/top-books`     — Top sách được mượn nhiều nhất
- [ ] `GET /api/stats/borrow-status` — Số lượng đang mượn vs đã trả
