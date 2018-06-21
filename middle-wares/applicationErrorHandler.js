module.exports = function(err, req, res,next){
	if(err.isApplicationError){
		if (err.applicationErrorId == "CART_EMPTY"){
			res.redirect("/user/cart?msg=Không có sản phẩm trong giỏ hàng");
		}
		else if(err.applicationErrorId == "INVALID_USERNAME_OR_PASSWORD"){
			res.redirect("/user/new?msg=Tên đăng nhập hoặc mật khẩu không hợp lệ");
		}
	}
	else
		next(err);
}