# Kiểm tra xem đã khởi tạo git chưa, nếu chưa thì khởi tạo
if (-not (Test-Path .git)) {
    git init
}

# Xóa remote origin cũ nếu tồn tại (để tránh lỗi nếu bạn đã lỡ add link sai trước đó)
git remote remove origin 2>$null

# Thêm remote origin mới
git remote add origin https://github.com/ajhuynhtu/doaniotweb.git

# Thêm tất cả file vào staging
git add .

# Commit (nếu chưa có commit nào)
git commit -m "Initial commit of doaniot web application" 2>$null

# Đổi tên branch thành main
git branch -M main

# Push code lên GitHub
git push -u origin main