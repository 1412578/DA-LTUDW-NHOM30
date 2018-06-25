# Đồ án Lập Trình Ứng Dụng Web 
Đồ án môn Lập Trình Ứng Dụng Web nhóm 30 (29/06/2018 10:00 PM)
Thành viên
* **1512667**	Trần Cao Việt
* **1412578**	Trần Quang Trí
* **1512445**	Hoàng Thế Quyền
* **1512681** Hứa Văn Vũ
## Hướng dẫn chạy đồ án
* Cài module http-server: npm i http-server -g
* Start server: http-server
* Đường dẫn phân hệ admin: localhost:8080/admin/index.html
* Đường dẫn phân hệ user: localhost:8080/user/profile.html
* Đường dẫn phân hệ guest: localhost:8080/index.html
## Cơ sở dữ liệu
* connection: 35.229.203.138
* port: 3306
* username: user
* password: user
* Vd: 
```bash
mysql -u user -p 35.229.203.138
```
* Db scripts nằm ở thư mục db_scripts

## Yêu cầu đồ án
https://drive.google.com/file/d/11C3-q0k7mwwhds0Ghcfis92iE3iJ4Ux_/view

### 1 Phân hệ khách
* [x] **1.1 Trang chủ**
  * [x] Hiển thị 10 sản phẩm mới nhất (giảm dần theo ngày tiếp nhận)
  * [x] Hiển thị 10 sản phẩm bán chạy nhất (giảm dần theo số lượng bán)
  * [x] Hiển thị 10 sản phẩm được xem nhiều nhất (giảm dần theo số lượt xem)
* [x] **1.2 Hệ thống Menu**
  * [x] Hiển thị danh sách các loại sản phẩm
  * [x] Hiển thị danh sách nhà sản xuất
* [x] **1.3 Xem danh sách sản phẩm**
  * [x] Xem theo loại
  * [x] Xem theo nhà sản xuất
  * [x] Hỗ trợ phân trang
* [x] **1.4 Xem chi tiết sản phẩm** [1512667]
  * [x] Hiển thị các thông tin sau
    * [x] Hình ảnh
    * [x] Giá bán
    * [x] Số lượt xem
    * [x] Số lượng bán
    * [x] Mô tả
    * [x] Xuất xử
    * [x] Loại
    * [x] Nhà sản xuất
    * [x] 5 sản phẩm cùng loại
    * [x] 5 sản phẩẩm cùng nhà sản xuất
* [ ] **1.5 Tìm kiếm sản phẩm** [1512667]
  * [ ] Cho phép tìm kiếm theo nhiều tiêu chí: tên, giá, loại, nhà sản xuất
  * [ ] Hỗ trợ phân trang
* [x] **1.6 Đăng nhập**
* [x] **1.7 Đăng ký**
  * [ ] Có sử dụng captcha
### 2 Phân hệ người dùng đã đăng nhập
* [x] **2.1 Có đầy đủ chức năng của phân hệ khách**
* [x] **2.2 Cập nhật thông tin cá nhân**
* [x] **2.3 Chọn mua sản phẩm**
  * [x] Cho phép chọn mua sản phẩm khi xem chi tiết hoặc khi xem danh sách sản phẩm
* [x] **2.4 Điều chỉnh thông tin sản phẩm đang chọn mua (quản lý giỏ hàng)**
* [x] **2.5 Thanh toán**
  * [x] Lưu thông tin sản phẩm khách hàng chọn mua và cập nhật lại số lượng bán, số lượng tồn tương ứng cho từng sản phẩm
* [x] **2.6 Xem lịch sử mua hàng**
  * [x] Xem danh sách các đơn hàng đã từng đặt theo thứ tự từ mới đến cũ
  * [ x Xem chi tiết từng đơn hàng và trạng thái của các đơn hàng này
### 3 Phân hệ quản trị (Admin)
* [x] **3.1 Dashboard**
  * [x] Hiển thị danh sách các chức năng mà admin có thể sử dụng
* [x] **3.2 Quản lý sản phẩm, loại sản phẩm, nhà sản xuất**
* [x] **3.3 Quản lý đơn hàng**
  * [x] Thể hiện danh sách đơn hàng theo thứ tự giảm dần của ngày lập
  * [x] Cho phép admin thực hiện việc cập nhật trạng thái đơn hàng(chưa giao, đang giao, đã giao). Đơn hàng đã giao sẽ có thể hiện khác với đơn hàng chưa giao (VD: text màu khác, background màu khác,...)
### 4 Lưu ý
* Cần có ít nhất 40 mặt hàng thuộc 4-5 hãng sản xuất và 4-5 loại mặt hàng.
* Chỉ hoàn thành đúng các chức năng được yêu cầu
