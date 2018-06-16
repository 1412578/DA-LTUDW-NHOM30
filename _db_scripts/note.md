## Note về project
```plain
Cấu trúc project hầu như tương tự với demo của thầy, nhưng có vài điểm khác biệt:
- các file trong routes thay vì chia ra giờ được gộp lại thành một file routes/routes.js, file này export một object chứa các properties, mỗi property tương ứng với một express router. Giờ ở app.js thay vì import từng file trong routes giờ chỉ cần import một file routes.js.
- routes.js thay chứa cả logic về routes và controller giờ logic controller được tách ra và đặt trong thư mục controller/*.js
- file config-production.js là file chứa cấu hình db của ở server ngoài, nếu ai chưa cài mysql server ở local thì có thể dùng (đổi tên config-production -> config), nếu cài ở local rồi thì nhớ edit lại username, password, dbname trong trường hợp không giống
- nếu tạo mới một action cho controller thì nhớ:
  + export action trong controller đó qua module.exports, 
  + trong routes.js cần import controller (nếu chưa import)
  + trong app.js cần mount router qua app.use("/newcontroller/", routes.NewController);
- Các file html cũ của đồ án giữa kì giờ lưu trong /public/views_OLD
- Mọi thừ còn lại (db, middle-wares, handlebars partial, layout) thì đều dựa trên cái của thầy
```
## url tương ứng với action controller, chỉ với get method
```plain
/            
  trang chủ                    
  controller/index.js      
  index(req,res,next)

/admin            
  trang quản lý                    
  controller/admin.js      
  index(req,res,next)

/product/1
  Xem sản phẩm có id=1 
  controller/products.js
  show(req,res,next)

/category/1
  Xem sản phẩm của loại sản phẩm có id=1    
  controller/categories.js   
  show(req,res,next)

/vendor/1
  Xem sản phẩm của nhà sản xuất có id=1
  controller/vendors.js
  show(req,res,next)

/user/new
  Đăng ký
  controller/users.js
  new(req,res,next)

/user/info, /user/cart, /user/history
  Xem thông tin người dùng, giở hàng, lịch sử mua hàng
  controller/users.js
  info(req,res,next) cart(req,res,next) history(req,res,next)  
```
