
module.exports = function(err, req, res,next){
	if(err.isApplicationError){
		let handlers = [];

		handlers["CART_EMPTY"] = 
			()=> res.redirect("/user/cart?msg=Không có sản phẩm trong giỏ hàng");

		handlers["INVALID_USERNAME_OR_PASSWORD"] = 
			()=> res.redirect("/user/new?msg=Tên đăng nhập hoặc mật khẩu không hợp lệ");

		handlers["PRODUCT_QUANTITY_NEGATIVE"] = 
			()=> res.redirect(`/user/cart?msg=Sản phẩm ${err.applicationOptions.product_name} không đủ số lượng cung cấp`);

		handlers["DENY_VIEW_ORDER"]	=
			()=> res.redirect('/');

		handlers["PRODUCT_NOT_EXIST"]	=
			()=> res.redirect('/');
		
		if (handlers[err.applicationErrorId])
			handlers[err.applicationErrorId]();
	}
	else
		next(err);
}