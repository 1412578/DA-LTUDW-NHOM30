const purifycss = require("purifycss-extended");
var content = [	'./views/_layouts/*.hbs',
				'./views/order/*.hbs',
				'./views/partials/*.hbs',
				'./views/product/*.hbs',
				'./views/user/*.hbs',
				'./views/*.hbs',
				'./views/**/*.handlebars',
				'./public/javascripts/bootstrap.bundle.min.js',
				'./public/javascripts/search-box.js'
				];
var css = ['./public/stylesheets/font-awesome/web-fonts-with-css/css/fontawesome-all.css',
			'./public/stylesheets/bootstrap.css',
			'./public/stylesheets/layout.css',
			'./public/stylesheets/user/style.css'];
 
var options = {
  output: './public/stylesheets/dist.css',
  minify: true
};
 
purifycss(content, css, options);